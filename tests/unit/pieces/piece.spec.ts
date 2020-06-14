/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceT from "../../../src/pieces/piece-t";
import PieceI from "../../../src/pieces/piece-i";
import PieceZ from "../../../src/pieces/piece-z";
import Arena from "../../../src/arena/arena";
import Dimension from "../../../src/common/dimension";
import Matrix from "../../../src/matrix/matrix";
import KeyboardKey from "../../../src/keyboard/keyboard-key";
import keyboard from "../../../src/keyboard/keyboard";
import RotateDirection from "../../../src/common/rotate-direction";
import clock from "../../../src/clock/clock";
import HorizontalDirection from "../../../src/common/horizontal-direction";
import PieceListenerImpl from "../helpers/piece-listener-impl";
import Piece from "../../../src/pieces/piece";

jest.mock("../../../src/arena/arena");

describe("Piece", () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  beforeAll(() => {
    canvas = <HTMLCanvasElement>window.document.getElementById("tetris");
    context = canvas.getContext("2d");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    keyboard.removeAllListeners();
    clock.removeAllListeners();
  });

  describe("when the clock counts 1seg", () => {
    it("should drop one tile", () => {
      const piece = new PieceT();

      //@ts-ignore
      const dropSpy = jest.spyOn(piece, "drop");

      piece.onTick(0);
      piece.onTick(100);
      piece.onTick(1000);

      expect(dropSpy).toBeCalledTimes(1);
    });
  });

  describe("when the clock counts 20seg", () => {
    it("should drops 18 times", () => {
      const piece = new PieceT();

      //@ts-ignore
      const dropSpy = jest.spyOn(piece, "drop");

      piece.onTick(0);
      for (let i = 1; i <= 18; i++) {
        piece.onTick(1000 * i);
      }

      expect(dropSpy).toBeCalledTimes(18);
    });
  });

  describe("when key W is pressed", () => {
    it("should rotate in the clockwise direction", () => {
      const piece = new PieceT();
      const listener = new PieceListenerImpl();
      piece.addPieceListener(listener);

      //@ts-ignore
      const spyRotate = jest.spyOn(piece, "rotate");

      piece.onKeyDown(KeyboardKey.W);

      expect(spyRotate).toBeCalledTimes(1);
      expect(spyRotate).toBeCalledWith(RotateDirection.CLOCKWISE);
      expect(listener.rotatedPieces).toHaveLength(1);
    });
  });

  describe("when key Q is pressed", () => {
    it("should rotate in the counterclockwise direction", () => {
      const piece = new PieceT();

      //@ts-ignore
      const spyRotate = jest.spyOn(piece, "rotate");

      piece.onKeyDown(KeyboardKey.Q);

      expect(spyRotate).toBeCalledTimes(1);
      expect(spyRotate).toBeCalledWith(RotateDirection.COUNTERCLOCKWISE);
    });
  });

  describe("when key DOWN is pressed", () => {
    it("should drop and reset the drop time counter", () => {
      const piece = new PieceT();
      const listener = new PieceListenerImpl();
      piece.addPieceListener(listener);

      //@ts-ignore
      const spyDrop = jest.spyOn(piece, "drop");

      piece.onTick(100);
      //@ts-ignore
      expect(piece.timeCounter).toBe(100);

      piece.onKeyDown(KeyboardKey.DOWN);

      expect(spyDrop).toBeCalledTimes(1);
      expect(listener.droppedPieces).toHaveLength(1);
      expect(listener.droppedPieces[0]).toBe(piece);
      //@ts-ignore
      expect(piece.timeCounter).toBe(0);
    });
  });

  describe("when key LEFT is pressed", () => {
    it("should move to the left direction", () => {
      const piece = new PieceZ();
      const listener = new PieceListenerImpl();
      piece.addPieceListener(listener);

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      piece.onKeyDown(KeyboardKey.LEFT);

      piece.removePieceListener(listener);

      piece.onKeyDown(KeyboardKey.LEFT);

      expect(spyMove).toBeCalledTimes(2);
      expect(spyMove).toBeCalledWith(HorizontalDirection.LEFT);
      expect(listener.movedPieces).toHaveLength(1);
    });
  });

  describe("when key RIGHT is pressed", () => {
    it("should move to the right direction", () => {
      const piece = new PieceI();

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      piece.onKeyDown(KeyboardKey.RIGHT);

      expect(spyMove).toBeCalledTimes(1);
      expect(spyMove).toBeCalledWith(HorizontalDirection.RIGHT);
    });
  });

  describe("when the user tries to move the T piece to the RIGHT direction 5 times", () => {
    it("should collide to the right wall and move only 4 times", () => {
      const piece = new PieceT();

      //@ts-ignore
      const spyMove = jest.spyOn(piece, "move");

      for (let i = 0; i < 5; i++) {
        piece.onKeyDown(KeyboardKey.RIGHT);
      }

      expect(spyMove).toBeCalledTimes(5);
      expect(spyMove).toBeCalledWith(HorizontalDirection.RIGHT);
    });
  });

  describe("when drawing the piece T", () => {
    it("should collide to the right wall and move only 4 times", () => {
      const piece = new PieceT();
      piece.reset();

      piece.draw(context);

      expect(context.getImageData(0, 1, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
      expect(context.getImageData(1, 1, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
      expect(context.getImageData(2, 1, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
      expect(context.getImageData(1, 2, 1, 1).data.toString()).toBe(
        "255,13,114,255"
      );
    });
  });

  describe("when rotate the I piece in the rightest position and the piece drops down", () => {
    it("should move to the left to avoid to collide and merge into the arena.", () => {
      const piece = new PieceI();

      for (let i = 0; i < 6; i++) {
        piece.onKeyDown(KeyboardKey.RIGHT);
      }

      piece.onKeyDown(KeyboardKey.SPACE);

      piece.onTick(1000);

      //@ts-ignore
      expect(Arena.prototype.merge).toBeCalledTimes(0);
    });
  });

  describe("when stops the piece", () => {
    it("should remove keyboard and clock listener", () => {
      const piece = new PieceT();
      const spyRemoveKeyboardListener = jest.spyOn(
        keyboard,
        "removeKeyboardListener"
      );
      const spyRemoveClockListerner = jest.spyOn(clock, "removeClockListener");
      piece.stop();
      expect(spyRemoveKeyboardListener).toBeCalledTimes(1);
      expect(spyRemoveClockListerner).toBeCalledTimes(1);
    });
  });

  describe("when the piece hit a matrix content", () => {
    it("should detects the collision", () => {
      const piece = new PieceT();
      piece.reset();

      const matrix = new Matrix<number>();
      matrix.setDimension(new Dimension(12, 20));
      matrix.set(1, 0, 1);

      const collided = piece.isCollided(matrix);

      expect(collided).toBeTruthy();
    });
  });
});
