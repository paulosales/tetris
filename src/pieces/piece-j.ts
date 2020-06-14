import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceJ extends Piece {
  /**
   * Creates a 3 x 3 matrix that represets the J piece shape, i.e.:
   * 0 4 0
   * 0 4 0
   * 4 4 0
   * @param matrix The matrix the will be filled with the piece J shape representation.
   */
  createShape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(3, 3));
    matrix.set(0, 1, 4);
    matrix.set(1, 1, 4);
    matrix.set(2, 1, 4);
    matrix.set(2, 0, 4);
  }
}

export default PieceJ;
