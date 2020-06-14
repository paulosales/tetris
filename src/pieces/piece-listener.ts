import Piece from "./piece";
import HorizontalDirection from "../common/horizontal-direction";
import RotateDirection from "../common/rotate-direction";

interface PieceListener {
  onDrop(p: Piece): void;

  onReset(p: Piece): void;

  onMove(p: Piece, d: HorizontalDirection): void;

  onRotate(p: Piece, d: RotateDirection): void;
}

export default PieceListener;
