import KeyboardKey from "./keyboard-key";

interface KeyboardListener {
  onKeyDown(key: KeyboardKey): void;
}

export default KeyboardListener;
