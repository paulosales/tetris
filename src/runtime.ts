import Arena from "./arena/arena";
import ClockListener from "./clock/clock-listener";
import clock from "./clock/clock";

class Runtime implements ClockListener, ArenaListener {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private arena: Arena;
  private scoreFactor = 1;
  private score = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.scale(20, 20);

    clock.addClockListener(this);
  }

  private draw(): void {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.arena.draw(this.context);
  }

  onTick(): void {
    this.draw();
  }

  onSweep(): void {
    this.score += 10 * this.scoreFactor;
    this.scoreFactor *= 2;
    this.updateScore();
  }

  onClear(): void {
    this.score = 0;
    this.updateScore();
  }

  updateScore(): void {
    document.getElementById("score").innerText = this.score.toString();
  }

  run(): void {
    this.arena = new Arena();
    this.arena.addListener(this);
    this.updateScore();
  }
}

export default Runtime;
