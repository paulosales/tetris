import KeyboardListener from "./keyboard-listener";
import KeyboardKey from "./keyboard-key";

/**
 * The game keyboard handler.
 * This classes handles events from physical and virtual keyboard.
 */
class Keyboard {
  private listeners: Set<KeyboardListener>;

  constructor() {
    this.listeners = new Set<KeyboardListener>();
    this.bindEvents();
  }

  /**
   * Binds the DOM keyboard events.
   */
  private bindEvents() {
    //Binds the physical keyboard.
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.doKeyDown(event.keyCode);
    });

    //Binds the virtual keyboard rotate counterclockwise key.
    document
      .getElementById("rotate-counterclockwise")
      .addEventListener("mousedown", () => {
        this.doKeyDown(KeyboardKey.Q);
      });

    //Binds the virtual keyboard rotate clockwise key.
    document
      .getElementById("rotate-clockwise")
      .addEventListener("mousedown", () => {
        this.doKeyDown(KeyboardKey.W);
      });

    //Binds the virtual keyboard LEFT key.
    document.getElementById("move-left").addEventListener("mousedown", () => {
      this.doKeyDown(KeyboardKey.LEFT);
    });

    //Binds the virtual keyboard DOWN key.
    document.getElementById("move-down").addEventListener("mousedown", () => {
      this.doKeyDown(KeyboardKey.DOWN);
    });

    //Binds the virtual keyboard RIGHT key.
    document.getElementById("move-right").addEventListener("mousedown", () => {
      this.doKeyDown(KeyboardKey.RIGHT);
    });
  }

  /**
   * Add one keyboar listener.
   * @param listener The listener to add.
   */
  public addKeyboardListener(listener: KeyboardListener): void {
    this.listeners.add(listener);
  }

  /**
   * Removes a keyboard listener.
   * @param listener The listener to remove.
   */
  public removeKeyboardListener(listener: KeyboardListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Remove all listeners.
   */
  public removeAllListeners(): void {
    this.listeners.clear();
  }

  /**
   * Notifies the key down event to listeners.
   * @param key The pressed key.
   */
  private doKeyDown(key: KeyboardKey): void {
    this.listeners.forEach((listener) => {
      listener.onKeyDown(key);
    });
  }
}

const keyboard = new Keyboard();
export default keyboard;
