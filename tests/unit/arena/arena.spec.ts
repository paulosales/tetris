/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import Piece from "../../../src/pieces/piece";
import HorizontalDirection from "../../../src/common/horizontal-direction";
import RotateDirection from "../../../src/common/rotate-direction";

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
    canvas = <HTMLCanvasElement>window.document.getElementById("tetris");
    context = canvas.getContext("2d");
  });

  beforeEach(() => {
    context.fillRect = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe("when creating an arena", () => {
    it("should instances successfully the object", () => {
      const arena = new Arena();
      expect(arena).not.toBeUndefined();
    });
  });

  describe("when drawing at time 0", () => {
    it("should render a empty arena.", () => {
      const arena = new Arena();

      arena.draw(context);
      expect(context.fillRect).toBeCalledTimes(0);
    });
  });

  describe("when drawing with a merged piece", () => {
    it("should draw the merged piece in the arena", () => {
      const arena = new Arena();
      expect(arena).not.toBeNull();
      const matrix = new Matrix<number>();
      matrix.setDimension(new Dimension(3, 3));
      matrix.set(0, 0, 1);
      matrix.set(0, 1, 1);
      matrix.set(0, 2, 1);
      matrix.set(1, 1, 1);
      //@ts-ignore
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

      //@ts-ignore
      arena.generateRandomPiece();
      //@ts-ignore
      arena.generateRandomPiece();
      //@ts-ignore
      arena.generateRandomPiece();
      //@ts-ignore
      arena.generateRandomPiece();
      //@ts-ignore
      arena.generateRandomPiece();
      //@ts-ignore
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

  describe("when getting the arena matrix", () => {
    it("should return a 12 x 20 matrix", () => {
      const arena = new Arena();
      expect(arena).not.toBeUndefined();

      //@ts-ignore
      expect(arena.matrix).not.toBeUndefined();
      //@ts-ignore
      expect(arena.matrix.getDimension()).not.toBeUndefined();
      //@ts-ignore
      expect(arena.matrix.getDimension().width).toBe(12);
      //@ts-ignore
      expect(arena.matrix.getDimension().height).toBe(20);
    });
  });

  describe("when row 19 is filled and sweep is invoked", () => {
    it("should remove row 19, unshift a new row at the beginning, and call the onSweep event.", () => {
      const arena = new Arena();
      const arenaListener = new ArenaListenerImpl();
      arena.addListener(arenaListener);
      expect(arena).not.toBeUndefined();
      for (let i = 0; i < 12; i++) {
        //@ts-ignore
        arena.matrix.set(19, i, 1);
      }

      //@ts-ignore
      const spliceRowsSpy = jest.spyOn(arena.matrix, "spliceRows");
      //@ts-ignore
      const unshiftRowSpy = jest.spyOn(arena.matrix, "unshiftRow");

      //@ts-ignore
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
    it("should set zero to all arena matrix elements and call clear event.", () => {
      const arena = new Arena();
      const arenaListener = new ArenaListenerImpl();
      arena.addListener(arenaListener);

      //@ts-ignore
      arena.matrix.set(1, 1, 3);
      //@ts-ignore
      arena.clear();

      //@ts-ignore
      arena.matrix.forEach((value) => {
        expect(value).toBe(0);
      });

      expect(arenaListener.clearCount).toBe(1);
    });
  });

  describe("when piece onDrop handler is invoked without collision", () => {
    it("should not merge the piece in the arena", () => {
      const arena = new Arena();

      //@ts-ignore
      const mergeSpy = jest.spyOn(arena, "merge");

      const piece = new PieceT();
      piece.reset();

      arena.onDrop(piece);

      expect(mergeSpy).toBeCalledTimes(0);
    });
  });

  describe("when piece onDrop handler is invoked with collision", () => {
    it("should merge the piece in the arena, rollaback the drop, sweep the arena and generate anoter piece.", () => {
      const arena = new Arena();
      //@ts-ignore
      arena.matrix.set(2, 0, 1);
      //@ts-ignore
      const arenaMergeSpy = jest.spyOn(arena, "merge");

      const arenaGenerateRandomPieceSpy = jest.spyOn(
        arena,
        //@ts-ignore
        "generateRandomPiece"
      );
      //@ts-ignore
      const arenaSweepSpy = jest.spyOn(arena, "sweep");

      const piece = new PieceT();
      const piecePos = new Point(0, 1);

      const pieceShape = new Matrix();
      pieceShape.setDimension(new Dimension(3, 3));

      //@ts-ignore
      piece.isCollided.mockReturnValue(true);
      //@ts-ignore
      piece.getPos.mockReturnValue(piecePos);
      //@ts-ignore
      piece.getShape.mockReturnValue(pieceShape);

      arena.onDrop(piece);

      expect(piecePos.y).toBe(0);
      expect(piece.stop).toBeCalledTimes(1);
      expect(arenaMergeSpy).toBeCalledTimes(1);
      expect(arenaGenerateRandomPieceSpy).toBeCalledTimes(1);
      expect(arenaSweepSpy).toBeCalledTimes(1);
    });
  });

  describe("when piece onReset handler is invoked with collision", () => {
    it("should game over", () => {
      const arena = new Arena();

      //@ts-ignore
      const arenaClearSpy = jest.spyOn(arena, "clear");

      const piece = new PieceI();

      //@ts-ignore
      piece.getPos.mockReturnValue(new Point(0, 0));

      const pieceShape = new Matrix();
      pieceShape.setDimension(new Dimension(3, 3));

      //@ts-ignore
      piece.getShape.mockReturnValue(pieceShape);

      //@ts-ignore
      piece.isCollided.mockReturnValue(true);

      arena.onReset(piece);

      expect(arenaClearSpy).toBeCalledTimes(1);
    });
  });

  describe("when piece onMove handler is invoked with collision when moving to LEFT", () => {
    it("should rollback the movement", () => {
      const arena = new Arena();

      const piece = new PieceI();

      const piecePos = new Point(-1, 0);

      //@ts-ignore
      piece.getPos.mockReturnValue(piecePos);

      const pieceShape = new Matrix();
      pieceShape.setDimension(new Dimension(3, 3));

      //@ts-ignore
      piece.getShape.mockReturnValue(pieceShape);

      //@ts-ignore
      piece.isCollided.mockReturnValue(true);

      arena.onMove(piece, HorizontalDirection.LEFT);

      expect(piecePos.x).toBe(0);
    });
  });

  describe("when piece onMove handler is invoked with collision when moving to RIGHT", () => {
    it("should rollback the movement", () => {
      const arena = new Arena();

      const piece = new PieceI();

      const piecePos = new Point(13, 0);

      //@ts-ignore
      piece.getPos.mockReturnValue(piecePos);

      const pieceShape = new Matrix();
      pieceShape.setDimension(new Dimension(3, 3));

      //@ts-ignore
      piece.getShape.mockReturnValue(pieceShape);

      //@ts-ignore
      piece.isCollided.mockReturnValue(true);

      arena.onMove(piece, HorizontalDirection.RIGHT);

      expect(piecePos.x).toBe(12);
    });
  });

  describe("when piece onRotate handler is invoked with collision on the left side", () => {
    it("should move to right until theres no more collision.", () => {
      const arena = new Arena();

      const piece = new PieceI();

      const piecePos = new Point(0, 0);

      //@ts-ignore
      piece.getPos.mockReturnValue(piecePos);

      const pieceShape = new Matrix();
      pieceShape.setDimension(new Dimension(3, 3));

      //@ts-ignore
      piece.getShape.mockReturnValue(pieceShape);

      (<jest.Mock<any, any>>piece.isCollided)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      arena.onRotate(piece, RotateDirection.CLOCKWISE);

      expect(piecePos.x).toBe(2);
    });
  });

  describe("when piece onRotate handler is invoked with no horizontal movement to avoid the collision", () => {
    it("should rollback the rotation.", () => {
      const arena = new Arena();

      const piece = new PieceI();

      const piecePos = new Point(0, 0);

      //@ts-ignore
      piece.getPos.mockReturnValue(piecePos);

      const pieceShape = new Matrix();
      pieceShape.setDimension(new Dimension(3, 3));

      const pieceShapeRotateSpy = jest.spyOn(pieceShape, "rotate");

      //@ts-ignore
      piece.getShape.mockReturnValue(pieceShape);

      //@ts-ignore
      (<jest.Mock<any, any>>piece.isCollided)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      arena.onRotate(piece, RotateDirection.CLOCKWISE);

      expect(pieceShapeRotateSpy).toBeCalledWith(
        RotateDirection.COUNTERCLOCKWISE
      );
      expect(piecePos.x).toBe(0);
    });
  });
});
