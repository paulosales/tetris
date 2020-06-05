import Runtime from "./runtime";

const canvas = <HTMLCanvasElement>document.getElementById("tetris");

const runtime = new Runtime(canvas);

runtime.run();
