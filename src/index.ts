import Runtime from "./runtime";
import register from "./service-worker-register";

const canvas = <HTMLCanvasElement>document.getElementById("tetris");

const runtime = Runtime.getInstance(canvas);

runtime.run();

register();
