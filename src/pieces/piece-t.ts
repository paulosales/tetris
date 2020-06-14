import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceT extends Piece {
  /**
   * Creates a 3 x 3 matrix that represets the T piece shape, i.e.:
   * 0 0 0
   * 1 1 1
   * 0 1 0
   * @param matrix The matrix the will be filled with the piece T shape representation.
   */
  createShape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(3, 3));
    matrix.set(1, 0, 1);
    matrix.set(1, 1, 1);
    matrix.set(1, 2, 1);
    matrix.set(2, 1, 1);
  }
}

export default PieceT;
