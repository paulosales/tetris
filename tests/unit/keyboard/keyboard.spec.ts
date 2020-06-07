/* eslint-disable @typescript-eslint/ban-ts-comment */
import keyboard from "../../../src/keyboard/keyboard";
import KeyboardListenerImpl from "../helpers/keyboard-listener-impl";
import KeyboardEventImpl from "./keyboard-event-impl";
import {
  keyboardEventCallback,
  clickRotateClockwiseCallback,
  clickRotateCounterClockwiseCallback,
  clickLeftCallback,
  clickRightCallback,
  clickDownCallback,
} from "../helpers/jsdom-jest-setup";
import KeyboardKey from "../../../src/keyboard/keyboard-key";

describe("Keyboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    keyboard.removeAllListeners();
  });

  describe("when the arrow left key is pressed", () => {
    it("should call the event onKeyDown with the left key", () => {
      const keyboardListener = new KeyboardListenerImpl();
      keyboard.addKeyboardListener(keyboardListener);
      const keyboardEvent = new KeyboardEventImpl(KeyboardKey.LEFT);

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      keyboardEventCallback(keyboardEvent);

      expect(keyboardListener.keys).toHaveLength(1);
      expect(keyboardListener.keys[0]).toBe(KeyboardKey.LEFT);
      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.LEFT);
    });
  });

  describe("when the arrow right key is pressed", () => {
    it("should call the event onKeyDown with the right key", () => {
      const keyboardListener = new KeyboardListenerImpl();
      keyboard.addKeyboardListener(keyboardListener);
      const keyboardEvent = new KeyboardEventImpl(KeyboardKey.RIGHT);

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      keyboardEventCallback(keyboardEvent);

      expect(keyboardListener.keys).toHaveLength(1);
      expect(keyboardListener.keys[0]).toBe(KeyboardKey.RIGHT);
      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.RIGHT);
    });
  });

  describe("when the counterclockwise rotate button has been pressed", () => {
    it("should call the event onKeyDown with Q key", () => {
      clickRotateCounterClockwiseCallback();

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.Q);
    });
  });

  describe("when the clockwise rotate button has been pressed", () => {
    it("should call the event onKeyDown with W key", () => {
      clickRotateClockwiseCallback();

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.W);
    });
  });

  describe("when the left button has been pressed", () => {
    it("should call the event onKeyDown with LEFT key", () => {
      clickLeftCallback();

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.LEFT);
    });
  });

  describe("when the right button has been pressed", () => {
    it("should call the event onKeyDown with RIGHT key", () => {
      clickRightCallback();

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.RIGHT);
    });
  });

  describe("when the down button has been pressed", () => {
    it("should call the event onKeyDown with DOWN key", () => {
      clickDownCallback();

      //@ts-ignore
      const doKeyDownSpy = jest.spyOn(keyboard, "doKeyDown");

      expect(doKeyDownSpy).toBeCalledTimes(1);
      expect(doKeyDownSpy).toBeCalledWith(KeyboardKey.DOWN);
    });
  });
});
