import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceI extends Piece {
  /**
   * Creates a 4 x 4 matrix that represets the I piece shape, i.e.:
   * 0 5 0 0
   * 0 5 0 0
   * 0 5 0 0
   * 0 5 0 0
   * @param matrix The matrix the will be filled with the piece I shape representation.
   */
  shape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(4, 4));
    matrix.set(0, 1, 5);
    matrix.set(1, 1, 5);
    matrix.set(2, 1, 5);
    matrix.set(3, 1, 5);
  }
}

export default PieceI;
