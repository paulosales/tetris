import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceL extends Piece {
  /**
   * Creates a 3 x 3 matrix that represets the L piece shape, i.e.:
   * 0 3 0
   * 0 3 0
   * 0 3 3
   * @param matrix The matrix the will be filled with the piece L shape representation.
   */
  shape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(3, 3));
    matrix.set(0, 1, 3);
    matrix.set(1, 1, 3);
    matrix.set(2, 1, 3);
    matrix.set(2, 2, 3);
  }
}

export default PieceL;
