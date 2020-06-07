/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceT from "../../../src/pieces/piece-t";
import PieceI from "../../../src/pieces/piece-i";
import PieceZ from "../../../src/pieces/piece-z";
import Arena from "../../../src/arena/arena";
import Dimension from "../../../src/common/dimension";
import Matrix from "../../../src/matrix/matrix";
import KeyboardEventImpl from "../keyboard/keyboard-event-impl";
import KeyboardKey from "../../../src/keyboard/keyboard-key";
import keyboard from "../../../src/keyboard/keyboard";
import RotateDirection from "../../../src/common/rotate-direction";
import clock from "../../../src/clock/clock";
import HorizontalDirection from "../../../src/common/horizontal-direction";

jest.mock("../../../src/arena/arena");

describe("Piece", () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  beforeAll(() => {
    canvas = <HTMLCanvasElement>window.document.getElementById("tetris");
    context = canvas.getContext("2d");
  });

  beforeEach(() => {
    const mockArenaGetMatrix = jest.fn();

    Arena.prototype.getMatrix = mockArenaGetMatrix;

    const arenaMatrix = new Matrix<number>();
    arenaMatrix.setDimension(new Dimension(12, 20));
    mockArenaGetMatrix.mockReturnValue(arenaMatrix);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    keyboard.removeAllListeners();
    clock.removeAllListeners();
  });

  describe("when the clock counts 1seg", () => {
    it("should drop one tile", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const dropSpy = jest.spyOn(piece, "drop");

      piece.onTick(0);
      piece.onTick(100);
      piece.onTick(1000);

      expect(dropSpy).toBeCalledTimes(1);
    });
  });

  describe("when the clock counts 20seg", () => {
    it("should drop until it collides to the ground and merged into the arena", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const dropSpy = jest.spyOn(piece, "drop");
      //@ts-ignore
      const isCollidedSpy = jest.spyOn(piece, "isCollided");

      const mergeSpy = jest.spyOn(arena, "merge");

      piece.onTick(0);
      for (let i = 1; i <= 18; i++) {
        piece.onTick(1000 * i);
      }

      expect(dropSpy).toBeCalledTimes(18);
      expect(isCollidedSpy).lastReturnedWith(true);
      expect(mergeSpy).toBeCalledTimes(1);
    });
  });

  describe("when key W is pressed", () => {
    it("should rotate in the clockwise direction", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyRotate = jest.spyOn(piece, "rotate");

      piece.onKeyDown(KeyboardKey.W);

      expect(spyRotate).toBeCalledTimes(1);
      expect(spyRotate).toBeCalledWith(RotateDirection.CLOCKWISE);
    });
  });

  describe("when key Q is pressed", () => {
    it("should rotate in the counterclockwise direction", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyRotate = jest.spyOn(piece, "rotate");

      piece.onKeyDown(KeyboardKey.Q);

      expect(spyRotate).toBeCalledTimes(1);
      expect(spyRotate).toBeCalledWith(RotateDirection.COUNTERCLOCKWISE);
    });
  });

  describe("when key DOWN is pressed", () => {
    it("should drop and reset the drop time counter", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyDrop = jest.spyOn(piece, "drop");

      piece.onTick(100);
      //@ts-ignore
      expect(piece.timeCounter).toBe(100);

      piece.onKeyDown(KeyboardKey.DOWN);

      expect(spyDrop).toBeCalledTimes(1);
      //@ts-ignore
      expect(piece.timeCounter).toBe(0);
    });
  });

  describe("when key LEFT is pressed", () => {
    it("should move to the left direction", () => {
      const arena = new Arena();
      const piece = new PieceZ(arena);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      piece.onKeyDown(KeyboardKey.LEFT);

      expect(spyMove).toBeCalledTimes(1);
      expect(spyMove).toBeCalledWith(HorizontalDirection.LEFT);
    });
  });

  describe("when key RIGHT is pressed", () => {
    it("should move to the right direction", () => {
      const arena = new Arena();
      const piece = new PieceI(arena);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      piece.onKeyDown(KeyboardKey.RIGHT);

      expect(spyMove).toBeCalledTimes(1);
      expect(spyMove).toBeCalledWith(HorizontalDirection.RIGHT);
    });
  });

  describe("when the user tries to move the T piece to the RIGHT direction 5 times", () => {
    it("should collide to the right wall and move only 4 times", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      //@ts-ignore
      const spyIsCollided = jest.spyOn(piece, "isCollided");

      for (let i = 0; i < 5; i++) {
        piece.onKeyDown(KeyboardKey.RIGHT);
      }

      expect(spyMove).toBeCalledTimes(5);
      expect(spyMove).toBeCalledWith(HorizontalDirection.RIGHT);
      expect(spyIsCollided).lastReturnedWith(true);
    });
  });

  describe("when drawing the piece T", () => {
    it("should collide to the right wall and move only 4 times", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      piece.draw(context);

      expect(context.getImageData(5, 1, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
      expect(context.getImageData(6, 1, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
      expect(context.getImageData(7, 1, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
      expect(context.getImageData(6, 2, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
    });
  });

  describe("when creating a new piece in a full arena", () => {
    it("should clear the arena.", () => {
      const arena = new Arena();
      arena.getMatrix().fill(1);

      const clearArenaSpy = jest.spyOn(arena, "clear");
      new PieceT(arena);
      expect(clearArenaSpy).toHaveBeenCalledTimes(1);
    });
  });
});
