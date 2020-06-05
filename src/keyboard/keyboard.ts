import KeyboardListener from "./keyboard-listener";
import KeyboardKey from "./keyboard-key";

class Keyboard {
  private listeners: Set<KeyboardListener>;

  constructor() {
    this.listeners = new Set<KeyboardListener>();

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.doKeyDown(event.keyCode);
    });
  }

  addKeyboardListener(listener: KeyboardListener): void {
    this.listeners.add(listener);
  }

  removeKeyboardListener(listener: KeyboardListener): void {
    this.listeners.delete(listener);
  }

  private doKeyDown(key: KeyboardKey): void {
    this.listeners.forEach((listener) => {
      listener.onKeyDown(key);
    });
  }
}

const keyboard = new Keyboard();
export default keyboard;
