import KeyboardListener from "../../../src/keyboard/keyboard-listener";
import KeyboardKey from "../../../src/keyboard/keyboard-key";

class KeyboardListenerImpl implements KeyboardListener {
  keys: KeyboardKey[];

  constructor() {
    this.keys = new Array<KeyboardKey>();
  }

  onKeyDown(key: KeyboardKey): void {
    this.keys.push(key);
  }
}

export default KeyboardListenerImpl;
