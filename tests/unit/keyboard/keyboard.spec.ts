import keyboard from "../../../src/keyboard/keyboard";
import KeyboardListenerImpl from "../helpers/keyboard-listener-impl";
import KeyboardEventImpl from "./keyboard-event-impl";
import { keyboardEventCallback } from "../helpers/jsdom-jest-setup";

describe("Keyboard", () => {
  describe("when the arrow left key is pressed", () => {
    it("should call the event onKeyDown", () => {
      const keyboardListener = new KeyboardListenerImpl();
      keyboard.addKeyboardListener(keyboardListener);
      const keyboardEvent = new KeyboardEventImpl(37);
      keyboardEventCallback(keyboardEvent);

      expect(keyboardListener.keys).toHaveLength(1);
      expect(keyboardListener.keys[0]).toBe(37);

      keyboard.removeKeyboardListener(keyboardListener);
    });
  });
});
