import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceO extends Piece {
  /**
   * Creates a 2 x 2 matrix that represets the O piece shape, i.e.:
   * 2 2
   * 2 2
   * @param matrix The matrix the will be filled with the piece O shape representation.
   */
  createShape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(2, 2));
    matrix.set(0, 0, 2);
    matrix.set(0, 1, 2);
    matrix.set(1, 0, 2);
    matrix.set(1, 1, 2);
  }
}

export default PieceO;
