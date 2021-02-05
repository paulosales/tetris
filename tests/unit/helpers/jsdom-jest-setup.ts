import { JSDOM } from "jsdom";

const dom = new JSDOM(`<div id='score'></div>
<canvas id='tetris'></canvas>
<div id="joystick">
  <div id="rotate-counterclockwise" class="fa fa-undo"></div>
  <div id="rotate-clockwise" class="fa fa-repeat"></div>
  <div id="move-left" class="fa fa-chevron-left"></div>
  <div id="move-down" class="fa fa-chevron-down"></div>
  <div id="move-right" class="fa fa-chevron-right"></div>
</div>
`);
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

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

export let clickRotateCounterClockwiseCallback: (event?: MouseEvent) => any;
document.getElementById("rotate-counterclockwise").addEventListener = (
  event: string,
  callback: (event: MouseEvent) => any
) => {
  clickRotateCounterClockwiseCallback = callback;
};

export let clickRotateClockwiseCallback: (event?: MouseEvent) => any;
document.getElementById("rotate-clockwise").addEventListener = (
  event: string,
  callback: (event: MouseEvent) => any
) => {
  clickRotateClockwiseCallback = callback;
};

export let clickLeftCallback: (event?: MouseEvent) => any;
document.getElementById("move-left").addEventListener = (
  event: string,
  callback: (event: MouseEvent) => any
) => {
  clickLeftCallback = callback;
};

export let clickRightCallback: (event?: MouseEvent) => any;
document.getElementById("move-right").addEventListener = (
  event: string,
  callback: (event: MouseEvent) => any
) => {
  clickRightCallback = callback;
};

export let clickDownCallback: (event?: MouseEvent) => any;
document.getElementById("move-down").addEventListener = (
  event: string,
  callback: (event: MouseEvent) => any
) => {
  clickDownCallback = callback;
};
