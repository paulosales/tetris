import Arena from "../../../src/arena/arena";
import Matrix from "../../../src/matrix/matrix";
import Dimension from "../../../src/common/dimension";
import Point from "../../../src/common/point";
import PieceT from "../../../src/pieces/piece-t";
import PieceJ from "../../../src/pieces/piece-j";
import PieceL from "../../../src/pieces/piece-l";
import PieceS from "../../../src/pieces/piece-s";
import PieceZ from "../../../src/pieces/piece-z";
import PieceO from "../../../src/pieces/piece-o";
import PieceI from "../../../src/pieces/piece-i";
import ArenaListenerImpl from "../helpers/arena-listener-impl";

jest.mock("../../../src/pieces/piece");
jest.mock("../../../src/pieces/piece-t");
jest.mock("../../../src/pieces/piece-j");
jest.mock("../../../src/pieces/piece-l");
jest.mock("../../../src/pieces/piece-s");
jest.mock("../../../src/pieces/piece-z");
jest.mock("../../../src/pieces/piece-o");
jest.mock("../../../src/pieces/piece-i");

describe("Arena", () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  beforeAll(() => {
    canvas = <HTMLCanvasElement>window.document.getElementById("display");
    context = canvas.getContext("2d");
  });

  beforeEach(() => {
    context.fillRect = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe("when create a arena", () => {
    it("should instances successfuly the object", () => {
      const arena = new Arena();
      expect(arena).not.toBeUndefined();
    });
  });

  describe("when draw at time 0", () => {
    it("should render the arena with one no one merged piece.", () => {
      const arena = new Arena();
      expect(arena).not.toBeNull();

      arena.draw(context);
      expect(context.fillRect).toBeCalledTimes(0);
    });
  });

  describe("when draw with a merged piece", () => {
    it("should draw the merged piece in the arena", () => {
      const arena = new Arena();
      expect(arena).not.toBeNull();
      const matrix = new Matrix<number>();
      matrix.setDimension(new Dimension(3, 3));
      matrix.set(0, 0, 1);
      matrix.set(0, 1, 1);
      matrix.set(0, 2, 1);
      matrix.set(1, 1, 1);
      arena.merge(matrix, new Point(0, 0));

      arena.draw(context);
      expect(context.fillRect).toBeCalledTimes(4);
    });
  });

  describe("when generate a piece with random values 0, 0.15, 0.3, 0.45, 0.6, 0.75, and 0.9", () => {
    it("generate the pieces T, J, L, S, Z, O, and I", () => {
      const randomFunc = jest.fn();
      Math.random = randomFunc;
      randomFunc
        .mockReturnValueOnce(0.0)
        .mockReturnValueOnce(0.15)
        .mockReturnValueOnce(0.3)
        .mockReturnValueOnce(0.45)
        .mockReturnValueOnce(0.6)
        .mockReturnValueOnce(0.75)
        .mockReturnValueOnce(0.9);

      const arena = new Arena();
      expect(arena).not.toBeUndefined();

      arena.generateRandomPiece();
      arena.generateRandomPiece();
      arena.generateRandomPiece();
      arena.generateRandomPiece();
      arena.generateRandomPiece();
      arena.generateRandomPiece();
      expect(PieceT).toBeCalledTimes(1);
      expect(PieceJ).toBeCalledTimes(1);
      expect(PieceL).toBeCalledTimes(1);
      expect(PieceS).toBeCalledTimes(1);
      expect(PieceZ).toBeCalledTimes(1);
      expect(PieceO).toBeCalledTimes(1);
      expect(PieceI).toBeCalledTimes(1);
    });
  });

  describe("when the random piece number was 7", () => {
    it("should regenerate another piece", () => {
      const randomFunc = jest.fn();
      Math.random = randomFunc;
      randomFunc.mockReturnValueOnce(1.0).mockReturnValueOnce(0.0);

      const arena = new Arena();
      expect(arena).not.toBeUndefined();

      expect(PieceT).toBeCalledTimes(1);
    });
  });

  describe("when get the arena matrix", () => {
    it("should returns a 12 x 20 matrix", () => {
      const arena = new Arena();
      expect(arena).not.toBeUndefined();

      expect(arena.getMatrix()).not.toBeUndefined();
      expect(arena.getMatrix().getDimension()).not.toBeUndefined();
      expect(arena.getMatrix().getDimension().width).toBe(12);
      expect(arena.getMatrix().getDimension().height).toBe(20);
    });
  });

  describe("when the row 19 are filled and sweep is invoked", () => {
    it("should remove the row 19, unshift a new row at beginning, and call the onSweep event.", () => {
      const arena = new Arena();
      const arenaListener = new ArenaListenerImpl();
      arena.addListener(arenaListener);
      expect(arena).not.toBeUndefined();
      for (let i = 0; i < 12; i++) {
        arena.getMatrix().set(19, i, 1);
      }

      const spliceRowsSpy = jest.spyOn(arena.getMatrix(), "spliceRows");
      const unshiftRowSpy = jest.spyOn(arena.getMatrix(), "unshiftRow");

      arena.sweep();

      arena.removeListener(arenaListener);

      expect(spliceRowsSpy).toBeCalledTimes(1);
      expect(unshiftRowSpy).toBeCalledTimes(1);
      expect(spliceRowsSpy).toHaveBeenCalledWith(19, 1);
      expect(unshiftRowSpy).toHaveBeenCalledWith([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]);
      expect(arenaListener.sweepedRows).toHaveLength(1);
      expect(arenaListener.sweepedRows[0]).toBe(19);
    });
  });

  describe("when clear the area", () => {
    it("should set zero the the all arena matrix elements and call clean event.", () => {
      const arena = new Arena();
      const arenaListener = new ArenaListenerImpl();
      arena.addListener(arenaListener);

      arena.getMatrix().set(1, 1, 3);
      arena.clear();

      arena.getMatrix().forEach((value) => {
        expect(value).toBe(0);
      });

      expect(arenaListener.clearCount).toBe(1);
    });
  });
});
