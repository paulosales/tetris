import PieceListener from "../../../src/pieces/piece-listener";
import Piece from "../../../src/pieces/piece";
import HorizontalDirection from "../../../src/common/horizontal-direction";
import RotateDirection from "../../../src/common/rotate-direction";

class PieceListenerImpl implements PieceListener {
  droppedPieces: Array<Piece>;
  resetedPieces: Array<Piece>;
  movedPieces: Array<Piece>;
  rotatedPieces: Array<Piece>;

  constructor() {
    this.droppedPieces = new Array<Piece>();
    this.resetedPieces = new Array<Piece>();
    this.movedPieces = new Array<Piece>();
    this.rotatedPieces = new Array<Piece>();
  }

  onDrop(p: Piece): void {
    this.droppedPieces.push(p);
  }

  onReset(p: Piece): void {
    this.resetedPieces.push(p);
  }

  onMove(p: Piece, d: HorizontalDirection): void {
    this.movedPieces.push(p);
  }

  onRotate(p: Piece, d: RotateDirection): void {
    this.rotatedPieces.push(p);
  }
}

export default PieceListenerImpl;
