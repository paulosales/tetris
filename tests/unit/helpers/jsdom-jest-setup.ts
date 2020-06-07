import { JSDOM } from "jsdom";

const dom = new JSDOM("<div id='score'></div><canvas id='tetris'></canvas>");
global.document = dom.window.document;
global.window = dom.window;

export let animationFrameCallback: FrameRequestCallback;

global.requestAnimationFrame = function (
  callback: FrameRequestCallback
): number {
  animationFrameCallback = callback;
  return 0;
};

export let keyboardEventCallback: (event: KeyboardEvent) => any;

document.addEventListener = (
  event: string,
  callback: (event: KeyboardEvent) => any
) => {
  keyboardEventCallback = callback;
};
