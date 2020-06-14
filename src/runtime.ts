import Arena from "./arena/arena";
import ClockListener from "./clock/clock-listener";
import clock from "./clock/clock";
import ArenaListener from "./arena/arena-listener";

/**
 * The game runtime.
 */
class Runtime implements ClockListener, ArenaListener {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private arena: Arena;
  private score = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.scale(20, 20);
  }

  /**
   * Draws the game arena.
   */
  private draw(): void {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.arena.draw(this.context);
  }

  /**
   * Displays the update game score.
   */
  private updateScore(): void {
    document.getElementById("score").innerText = this.score.toString();
  }

  /**
   * Initializes the game.
   */
  public run(): void {
    this.arena = new Arena();
    this.arena.addListener(this);
    clock.addClockListener(this);
    this.updateScore();
  }

  /**
   * Handles the game clock tick to update the game screen.
   */
  public onTick(): void {
    this.draw();
  }

  /**
   * Handles the arena row sweep to update the game score.
   */
  public onSweep(): void {
    this.score += 10;
    this.updateScore();
  }

  /**
   * Handles the arena clear to update the game score to zero.
   */
  public onClear(): void {
    this.score = 0;
    this.updateScore();
  }
}

export default Runtime;
