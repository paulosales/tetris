import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";
import COLORS from "../common/colors";
import Piece from "../pieces/piece";
import Point from "../common/point";
import ArenaListener from "./arena-listener";
import PieceT from "../pieces/piece-t";
import PieceL from "../pieces/piece-l";
import PieceJ from "../pieces/piece-j";
import PieceS from "../pieces/piece-s";
import PieceZ from "../pieces/piece-z";
import PieceO from "../pieces/piece-o";
import PieceI from "../pieces/piece-i";
import PieceListener from "../pieces/piece-listener";
import HorizontalDirection from "../common/horizontal-direction";
import RotateDirection from "../common/rotate-direction";

/**
 * Represents the tetris game arena.
 */
class Arena implements PieceListener {
  //Represents the arena content and dimension.
  private matrix: Matrix<number>;

  //The current piece in movement inside the arena.
  private piece: Piece;

  //The arena event listeners.
  private listeners: Set<ArenaListener>;

  constructor() {
    this.matrix = new Matrix<number>();
    this.matrix.setDimension(new Dimension(12, 20));
    this.generateRandomPiece();
    this.listeners = new Set<ArenaListener>();
  }

  /**
   * Sweeps the arena in order to get rid of full filled rows.
   */
  private sweep(): void {
    outer: for (let y = this.matrix.getDimension().height - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix.getDimension().width; ++x) {
        if (this.matrix.get(y, x) === 0) {
          continue outer;
        }
      }

      const row = this.matrix.spliceRows(y, 1)[0].fill(0);
      this.matrix.unshiftRow(row);
      this.doSweep(y);
      ++y;
    }
  }

  /**
   * Notifies the sweep event handlers.
   * @param row The sweeped row.
   */
  private doSweep(row: number): void {
    this.listeners.forEach((listener) => {
      listener.onSweep(row);
    });
  }

  /**
   * Clears the arena contect.
   */
  private clear(): void {
    this.matrix.fill(0);
    this.doClear();
  }

  /**
   * Notifies the clear event to arena listeners.
   */
  private doClear(): void {
    this.listeners.forEach((listener) => {
      listener.onClear();
    });
  }

  /**
   * Draws the arena and with the current piece in movement.
   * @param context The 2d canvas context.
   */
  public draw(context: CanvasRenderingContext2D): void {
    this.matrix.forEach((value: number, row: number, col: number) => {
      if (value !== 0) {
        context.fillStyle = COLORS[value];
        context.fillRect(col, row, 1, 1);
      }
    });

    this.piece.draw(context);
  }

  /**
   * Merges the piece shape into arena content.
   * @param matrix The piece shape.
   * @param pos The piece position.
   */
  private merge(matrix: Matrix<number>, pos: Point): void {
    matrix.forEach((value: number, row: number, col: number) => {
      if (value !== 0) {
        this.matrix.set(pos.y + row, pos.x + col, value);
      }
    });
  }

  /**
   * Generates randomly the current piece in movement inside the arena.
   */
  private generateRandomPiece(): void {
    const n = 7;
    let pieceNumber = (n * Math.random()) | 0;
    while (pieceNumber === n) {
      pieceNumber = (n * Math.random()) | 0;
    }
    switch (pieceNumber) {
      case 0:
        this.piece = new PieceT();
        break;
      case 1:
        this.piece = new PieceJ();
        break;
      case 2:
        this.piece = new PieceL();
        break;
      case 3:
        this.piece = new PieceS();
        break;
      case 4:
        this.piece = new PieceZ();
        break;
      case 5:
        this.piece = new PieceO();
        break;
      case 6:
        this.piece = new PieceI();
        break;
    }
    this.piece.addPieceListener(this);
    this.piece.reset();
  }

  /**
   * Add an arena listener
   * @param listener The arena listener to add.
   */
  public addListener(listener: ArenaListener): void {
    this.listeners.add(listener);
  }

  /**
   * Removes an arena listener.
   * @param listener The arena listerner to remove.
   */
  public removeListener(listener: ArenaListener): void {
    this.listeners.delete(listener);
  }

  /**
   * The piece drop event handler.
   * @param p The dropped piece.
   */
  public onDrop(p: Piece): void {
    if (p.isCollided(this.matrix)) {
      p.stop();
      p.getPos().y--;
      this.merge(p.getShape(), p.getPos());
      this.generateRandomPiece();
      this.sweep();
    }
  }

  /**
   * The piece reset event handler.
   * @param p The reseted piece.
   */
  public onReset(p: Piece): void {
    p.getPos().x =
      ((this.matrix.getDimension().width / 2) | 0) -
      ((p.getShape().getDimension().width / 2) | 0);

    if (p.isCollided(this.matrix)) {
      //GAMEOVER
      this.clear();
    }
  }

  /**
   * The piece horizontal movement event handler.
   * @param p The moved piece.
   * @param d The horizontal movement direction.
   */
  public onMove(p: Piece, d: HorizontalDirection): void {
    if (p.isCollided(this.matrix)) {
      p.getPos().x -= d;
    }
  }

  /**
   * The piece rotate event handler
   * @param p The rotated piece.
   * @param d The rotate direction.
   */
  public onRotate(p: Piece, d: RotateDirection): void {
    const originalPosX = p.getPos().x;
    let offset = 1;
    while (p.isCollided(this.matrix)) {
      p.getPos().x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > p.getShape().getDimension().width) {
        p.getShape().rotate(-d);
        p.getPos().x = originalPosX;
        return;
      }
    }
  }
}

export default Arena;
