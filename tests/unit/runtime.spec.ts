/* eslint-disable @typescript-eslint/ban-ts-comment */
import Runtime from "../../src/runtime";
import keyboard from "../../src/keyboard/keyboard";
import clock from "../../src/clock/clock";

import { animationFrameCallback } from "./helpers/jsdom-jest-setup";
import Arena from "../../src/arena/arena";

jest.mock("../../src/arena/arena");

describe("Runtime", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    keyboard.removeAllListeners();
    clock.removeAllListeners();
  });

  describe("when creates a runtime", () => {
    it("should instance the runtime object", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("tetris")
      );
      const runtime = Runtime.getInstance(canvas);
      expect(runtime).not.toBeNull();
    });
  });

  describe("when the runtime starts running", () => {
    it("should create an arena and update the score to zero", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("tetris")
      );
      const runtime = Runtime.getInstance(canvas);
      runtime.run();

      expect(Arena).toBeCalledTimes(1);
      expect(document.getElementById("score").innerText).toBe("0");
    });
  });

  describe("when the clock ticks", () => {
    it("should draw the arena", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("tetris")
      );
      const runtime = Runtime.getInstance(canvas);
      runtime.run();

      animationFrameCallback(100);

      expect(Arena.prototype.draw).toBeCalledTimes(1);
    });
  });

  describe("when the arena sweeps the first row", () => {
    it("should increment the score to 10", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("tetris")
      );

      const runtime = Runtime.getInstance(canvas);
      //@ts-ignore
      runtime.score = 0;
      runtime.run();

      runtime.onSweep();

      expect(document.getElementById("score").innerText).toBe("10");
    });
  });

  describe("when the arena sweeps the second row", () => {
    it("should increment the score to 20", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("tetris")
      );
      const runtime = Runtime.getInstance(canvas);
      //@ts-ignore
      runtime.score = 0;
      runtime.run();

      runtime.onSweep();
      runtime.onSweep();

      expect(document.getElementById("score").innerText).toBe("20");
    });
  });

  describe("when the arena becomes cleared", () => {
    it("should reset the score to 0", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("tetris")
      );
      const runtime = Runtime.getInstance(canvas);
      runtime.run();

      runtime.onSweep();
      runtime.onClear();

      expect(document.getElementById("score").innerText).toBe("0");
    });
  });
});
