import Point from "../common/point";
import Matrix from "../matrix/matrix";
import COLORS from "../common/colors";
import KeyboardListener from "../keyboard/keyboard-listener";
import KeyboardKey from "../keyboard/keyboard-key";
import HorizontalDirection from "../common/horizontal-direction";
import keyboard from "../keyboard/keyboard";
import ClockListener from "../clock/clock-listener";
import clock from "../clock/clock";
import Arena from "../arena/arena";
import RotateDirection from "../common/rotate-direction";

abstract class Piece implements KeyboardListener, ClockListener {
  private pos: Point;
  private matrix: Matrix<number>;
  private arena: Arena;
  private timeCounter = 0;
  private lastTime = 0;
  private static DROP_INTERVAL = 1000;

  constructor(arena: Arena) {
    this.pos = new Point(1, 1);
    this.matrix = new Matrix<number>();
    this.shape(this.matrix);
    this.arena = arena;
    this.reset();
    keyboard.addKeyboardListener(this);
    clock.addClockListener(this);
  }

  private drop(): void {
    this.pos.y++;
    this.timeCounter = 0;
    if (this.isCollided()) {
      this.pos.y--;
      this.arena.merge(this.matrix, this.pos);
      keyboard.removeKeyboardListener(this);
      clock.removeClockListener(this);
      this.arena.generateRandomPiece();
      this.arena.sweep();
    }
  }

  private isCollided(): boolean {
    const [pDim, aDim, aMatrix] = [
      this.matrix.getDimension(),
      this.arena.getMatrix().getDimension(),
      this.arena.getMatrix(),
    ];

    for (let y = 0; y < pDim.height; ++y) {
      for (let x = 0; x < pDim.width; ++x) {
        if (
          this.matrix.get(y, x) !== 0 &&
          (aDim.height > this.pos.y + y &&
            aMatrix.get(this.pos.y + y, this.pos.x + x)) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private reset(): void {
    this.pos.y = 0;
    this.pos.x =
      ((this.arena.getMatrix().getDimension().width / 2) | 0) -
      ((this.matrix.getDimension().width / 2) | 0);

    if (this.isCollided()) {
      // ** gameover **
      this.arena.clear();
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    this.matrix.forEach((value: number, row: number, col: number) => {
      if (value !== 0) {
        context.fillStyle = COLORS[value];
        context.fillRect(this.pos.x + col, this.pos.y + row, 1, 1);
      }
    });
  }

  private move(direction: HorizontalDirection): void {
    this.pos.x += direction;
    if (this.isCollided()) {
      this.pos.x -= direction;
    }
  }

  private rotate(direction: RotateDirection): void {
    this.matrix.rotate(direction);
  }

  onKeyDown(key: KeyboardKey): void {
    switch (key) {
      case KeyboardKey.LEFT:
        this.move(HorizontalDirection.LEFT);
        break;
      case KeyboardKey.RIGHT:
        this.move(HorizontalDirection.RIGHT);
        break;
      case KeyboardKey.DOWN:
        this.drop();
        break;
      case KeyboardKey.W:
        this.rotate(RotateDirection.CLOCKWISE);
        break;
      case KeyboardKey.Q:
        this.rotate(RotateDirection.COUNTERCLOCKWISE);
        break;
    }
  }

  onTick(time: number): void {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.timeCounter += deltaTime;

    if (this.timeCounter >= Piece.DROP_INTERVAL) {
      this.timeCounter = 0;
      this.drop();
    }
  }

  abstract shape(matrix: Matrix<number>): void;
}

export default Piece;
