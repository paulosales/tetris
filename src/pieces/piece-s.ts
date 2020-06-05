import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceS extends Piece {
  /**
   * Creates a 3 x 3 matrix that represets the S piece shape, i.e.:
   * 0 6 6
   * 6 6 0
   * 0 0 0
   * @param matrix The matrix the will be filled with the piece Z shape representation.
   */
  shape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(3, 3));
    matrix.set(0, 1, 6);
    matrix.set(0, 2, 6);
    matrix.set(1, 0, 6);
    matrix.set(1, 1, 6);
  }
}

export default PieceS;
