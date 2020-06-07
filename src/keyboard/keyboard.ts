import KeyboardListener from "./keyboard-listener";
import KeyboardKey from "./keyboard-key";

class Keyboard {
  private listeners: Set<KeyboardListener>;

  constructor() {
    this.listeners = new Set<KeyboardListener>();

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.doKeyDown(event.keyCode);
    });

    document
      .getElementById("rotate-counterclockwise")
      .addEventListener("mousedown", () => {
        this.doKeyDown(KeyboardKey.Q);
      });
    document
      .getElementById("rotate-clockwise")
      .addEventListener("mousedown", () => {
        this.doKeyDown(KeyboardKey.W);
      });
    document.getElementById("move-left").addEventListener("mousedown", () => {
      this.doKeyDown(KeyboardKey.LEFT);
    });
    document.getElementById("move-down").addEventListener("mousedown", () => {
      this.doKeyDown(KeyboardKey.DOWN);
    });
    document.getElementById("move-right").addEventListener("mousedown", () => {
      this.doKeyDown(KeyboardKey.RIGHT);
    });
  }

  addKeyboardListener(listener: KeyboardListener): void {
    this.listeners.add(listener);
  }

  removeKeyboardListener(listener: KeyboardListener): void {
    this.listeners.delete(listener);
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }

  private doKeyDown(key: KeyboardKey): void {
    this.listeners.forEach((listener) => {
      listener.onKeyDown(key);
    });
  }
}

const keyboard = new Keyboard();
export default keyboard;
