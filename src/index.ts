import Runtime from "./runtime";

const canvas = <HTMLCanvasElement>document.getElementById("tetris");

const runtime = Runtime.getInstance(canvas);

runtime.run();
