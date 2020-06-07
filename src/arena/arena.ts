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

class Arena {
  private matrix: Matrix<number>;
  private piece: Piece;
  private listeners: Set<ArenaListener>;

  constructor() {
    this.matrix = new Matrix<number>();
    this.matrix.setDimension(new Dimension(12, 20));
    this.generateRandomPiece();
    this.listeners = new Set<ArenaListener>();
  }

  draw(context: CanvasRenderingContext2D): void {
    this.matrix.forEach((value: number, row: number, col: number) => {
      if (value !== 0) {
        context.fillStyle = COLORS[value];
        context.fillRect(col, row, 1, 1);
      }
    });

    this.piece.draw(context);
  }

  merge(matrix: Matrix<number>, pos: Point): void {
    matrix.forEach((value: number, row: number, col: number) => {
      if (value !== 0) {
        this.matrix.set(pos.y + row, pos.x + col, value);
      }
    });
  }

  generateRandomPiece(): void {
    const n = 7;
    let pieceNumber = (n * Math.random()) | 0;
    while (pieceNumber === n) {
      pieceNumber = (n * Math.random()) | 0;
    }
    switch (pieceNumber) {
      case 0:
        this.piece = new PieceT(this);
        break;
      case 1:
        this.piece = new PieceJ(this);
        break;
      case 2:
        this.piece = new PieceL(this);
        break;
      case 3:
        this.piece = new PieceS(this);
        break;
      case 4:
        this.piece = new PieceZ(this);
        break;
      case 5:
        this.piece = new PieceO(this);
        break;
      case 6:
        this.piece = new PieceI(this);
        break;
    }
  }

  getMatrix(): Matrix<number> {
    return this.matrix;
  }

  sweep(): void {
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

  addListener(listener: ArenaListener): void {
    this.listeners.add(listener);
  }

  removeListener(listener: ArenaListener): void {
    this.listeners.delete(listener);
  }

  doSweep(row: number): void {
    this.listeners.forEach((listener) => {
      listener.onSweep(row);
    });
  }

  doClear(): void {
    this.listeners.forEach((listener) => {
      listener.onClear();
    });
  }

  clear(): void {
    this.matrix.fill(0);
    this.doClear();
  }
}

export default Arena;
