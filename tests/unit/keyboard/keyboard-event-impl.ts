class KeyboardEventImpl implements KeyboardEvent {
  altKey: boolean;
  char: string;
  charCode: number;
  code: string;
  ctrlKey: boolean;
  isComposing: boolean;
  key: string;
  keyCode: number;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  getModifierState(keyArg: string): boolean {
    throw new Error("Method not implemented.");
  }
  DOM_KEY_LOCATION_LEFT: number;
  DOM_KEY_LOCATION_NUMPAD: number;
  DOM_KEY_LOCATION_RIGHT: number;
  DOM_KEY_LOCATION_STANDARD: number;
  detail: number;
  view: Window;
  which: number;
  bubbles: boolean;
  cancelBubble: boolean;
  cancelable: boolean;
  composed: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  returnValue: boolean;
  srcElement: EventTarget;
  target: EventTarget;
  timeStamp: number;
  type: string;

  constructor(keyCode: number) {
    this.keyCode = keyCode;
  }

  composedPath(): EventTarget[] {
    throw new Error("Method not implemented.");
  }
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {
    throw new Error("Method not implemented.");
  }
  preventDefault(): void {
    throw new Error("Method not implemented.");
  }
  stopImmediatePropagation(): void {
    throw new Error("Method not implemented.");
  }
  stopPropagation(): void {
    throw new Error("Method not implemented.");
  }
  AT_TARGET: number;
  BUBBLING_PHASE: number;
  CAPTURING_PHASE: number;
  NONE: number;
}

export default KeyboardEventImpl;
