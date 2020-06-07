/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceT from "../../../src/pieces/piece-t";
import Arena from "../../../src/arena/arena";
import Dimension from "../../../src/common/dimension";
import Matrix from "../../../src/matrix/matrix";
import KeyboardEventImpl from "../keyboard/keyboard-event-impl";
import KeyboardKey from "../../../src/keyboard/keyboard-key";
import keyboard from "../../../src/keyboard/keyboard";
import {
  animationFrameCallback,
  keyboardEventCallback,
} from "../helpers/jsdom-jest-setup";
import RotateDirection from "../../../src/common/rotate-direction";
import clock from "../../../src/clock/clock";
import HorizontalDirection from "../../../src/common/horizontal-direction";

describe("Piece", () => {
  const mockArenaGetMatrix = jest.fn();
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  beforeAll(() => {
    canvas = <HTMLCanvasElement>window.document.getElementById("display");
    context = canvas.getContext("2d");
  });

  beforeEach(() => {
    jest.mock("../../../src/arena/arena", () => {
      return jest.fn().mockImplementation(() => {
        return { getMatrix: mockArenaGetMatrix };
      });
    });

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

      animationFrameCallback(0);
      animationFrameCallback(100);
      animationFrameCallback(1000);

      expect(dropSpy).toBeCalledTimes(1);
    });
  });

  describe("when the clock counts 20seg", () => {
    it("should drop until collide to the ground and merged into arena", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const dropSpy = jest.spyOn(piece, "drop");
      //@ts-ignore
      const isCollidedSpy = jest.spyOn(piece, "isCollided");

      const mergeSpy = jest.spyOn(arena, "merge");

      animationFrameCallback(0);
      for (let i = 1; i <= 18; i++) {
        animationFrameCallback(1000 * i);
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

      keyboardEventCallback(new KeyboardEventImpl(KeyboardKey.W));

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

      keyboardEventCallback(new KeyboardEventImpl(KeyboardKey.Q));

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

      animationFrameCallback(100);
      //@ts-ignore
      expect(piece.timeCounter).toBe(100);

      keyboardEventCallback(new KeyboardEventImpl(KeyboardKey.DOWN));

      expect(spyDrop).toBeCalledTimes(1);
      //@ts-ignore
      expect(piece.timeCounter).toBe(0);
    });
  });

  describe("when key LEFT is pressed", () => {
    it("should move to left", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      keyboardEventCallback(new KeyboardEventImpl(KeyboardKey.LEFT));

      expect(spyMove).toBeCalledTimes(1);
      expect(spyMove).toBeCalledWith(HorizontalDirection.LEFT);
    });
  });

  describe("when key RIGHT is pressed", () => {
    it("should move to right", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      keyboardEventCallback(new KeyboardEventImpl(KeyboardKey.RIGHT));

      expect(spyMove).toBeCalledTimes(1);
      expect(spyMove).toBeCalledWith(HorizontalDirection.RIGHT);
    });
  });

  describe("when try to move the T piece to the RIGHT direction 5 times", () => {
    it("should collide to the right wall and move only 4 times", () => {
      const arena = new Arena();
      const piece = new PieceT(arena);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      //@ts-ignore
      const spyIsCollided = jest.spyOn(piece, "isCollided");

      for (let i = 0; i < 5; i++) {
        keyboardEventCallback(new KeyboardEventImpl(KeyboardKey.RIGHT));
      }

      expect(spyMove).toBeCalledTimes(5);
      expect(spyMove).toBeCalledWith(HorizontalDirection.RIGHT);
      expect(spyIsCollided).lastReturnedWith(true);
    });
  });

  describe("when draw the piece T", () => {
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

  describe("when create a new piece in a full arena", () => {
    it("should clear the arena.", () => {
      const arena = new Arena();
      arena.getMatrix().fill(1);

      const clearArenaSpy = jest.spyOn(arena, "clear");
      new PieceT(arena);
      expect(clearArenaSpy).toHaveBeenCalledTimes(1);
    });
  });
});
