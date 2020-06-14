import Point from "../common/point";
import Matrix from "../matrix/matrix";
import COLORS from "../common/colors";
import KeyboardListener from "../keyboard/keyboard-listener";
import KeyboardKey from "../keyboard/keyboard-key";
import HorizontalDirection from "../common/horizontal-direction";
import keyboard from "../keyboard/keyboard";
import ClockListener from "../clock/clock-listener";
import clock from "../clock/clock";
import RotateDirection from "../common/rotate-direction";
import PieceListener from "./piece-listener";

/**
 * Represents the tetris piece.
 */
abstract class Piece implements KeyboardListener, ClockListener {
  //The piece position
  private pos: Point;

  //The shape of the piece is represented by a matrix of numbers.
  //The 0 means empty and other number means the piece color.
  private matrix: Matrix<number>;

  //Time counter for drop the piece.
  private timeCounter = 0;

  //Last time received from the clock.
  private lastTime = 0;

  //Time limit to drop the piece.
  private static DROP_INTERVAL = 1000;

  //Piece listeners sets.
  private listeners: Set<PieceListener>;

  constructor() {
    this.pos = new Point(1, 1);
    this.matrix = new Matrix<number>();
    this.listeners = new Set<PieceListener>();
    this.createShape(this.matrix);
    keyboard.addKeyboardListener(this);
    clock.addClockListener(this);
  }

  /**
   * Get the piece position.
   * @returns the piece position.
   */
  public getPos(): Point {
    return this.pos;
  }

  /**
   * Get the piece shape.
   * @returns the piece shape
   */
  public getShape(): Matrix<number> {
    return this.matrix;
  }

  /**
   * Stops the piece movement(dropping, rotating and left/right moving)
   */
  public stop(): void {
    keyboard.removeKeyboardListener(this);
    clock.removeClockListener(this);
  }

  /**
   * Drops the piece
   */
  private drop(): void {
    this.pos.y++;
    this.timeCounter = 0;
    this.doDrop();
  }

  /**
   * Notifies the drop event to listeners.
   */
  private doDrop() {
    this.listeners.forEach((listener) => {
      listener.onDrop(this);
    });
  }

  /**
   * Resets the piece position.
   */
  public reset(): void {
    this.pos.y = 0;
    this.pos.x = 0;
    this.doReset();
  }

  /**
   * Notifies the reset event to the piece listeners.
   */
  private doReset() {
    this.listeners.forEach((listener) => {
      listener.onReset(this);
    });
  }

  /**
   * Moves the piece to left/right direction.
   * @param direction The direction of the horizontal movement.
   */
  private move(direction: HorizontalDirection): void {
    this.pos.x += direction;
    this.doMove(direction);
  }

  /**
   * Notifies the move event to listeners.
   * @param direction Direction of the horizontal movement.
   */
  private doMove(direction: HorizontalDirection) {
    this.listeners.forEach((listener) => {
      listener.onMove(this, direction);
    });
  }

  /**
   * Rotates the pice in clockwise/counterclockwise direction.
   * @param direction The rotate direction.
   */
  private rotate(direction: RotateDirection): void {
    this.matrix.rotate(direction);
    this.doRotate(direction);
  }

  /**
   * Notifies the rotate event to listeners.
   * @param direction
   */
  private doRotate(direction: RotateDirection) {
    this.listeners.forEach((listener) => {
      listener.onRotate(this, direction);
    });
  }

  /**
   * Draws the piece.
   * @param context The 2d canvas context where the piece will be draw.
   */
  public draw(context: CanvasRenderingContext2D): void {
    this.matrix.forEach((value: number, row: number, col: number) => {
      if (value !== 0) {
        context.fillStyle = COLORS[value];
        context.fillRect(this.pos.x + col, this.pos.y + row, 1, 1);
      }
    });
  }

  /**
   * Detects the piece collision in to a matrix.
   * The 0(zero) inside the matrix means empty. Any number greater than 0 means no empty.
   * @param matrix The check collision matrix.
   * @returns true, is the collision was detects, false otherwise.
   */
  public isCollided(matrix: Matrix<number>): boolean {
    const [pDim, aDim, aMatrix] = [
      this.matrix.getDimension(),
      matrix.getDimension(),
      matrix,
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

  /**
   * Add a piece listener.
   * @param listener The listener to add.
   */
  public addPieceListener(listener: PieceListener): void {
    this.listeners.add(listener);
  }

  /**
   * Removes a pice listener.
   * @param listener the listener to remove.
   */
  public removePieceListener(listener: PieceListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Keyboard key down event handler.
   * @param key The pressed keyboard key.
   */
  public onKeyDown(key: KeyboardKey): void {
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

  /**
   * Clock tick handler.
   * @param time The current time of clock.
   */
  public onTick(time: number): void {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.timeCounter += deltaTime;

    if (this.timeCounter >= Piece.DROP_INTERVAL) {
      this.timeCounter = 0;
      this.drop();
    }
  }

  /**
   * Creates a matrix the represents the piece shape.
   * @param matrix The matrix that represents the piece shape.
   */
  public abstract createShape(matrix: Matrix<number>): void;
}

export default Piece;
