import Piece from "./piece";
import Matrix from "../matrix/matrix";
import Dimension from "../common/dimension";

class PieceZ extends Piece {
  /**
   * Creates a 3 x 3 matrix that represets the Z piece shape, i.e.:
   * 7 7 0
   * 0 7 7
   * 0 0 0
   * @param matrix The matrix the will be filled with the piece Z shape representation.
   */
  createShape(matrix: Matrix<number>): void {
    matrix.setDimension(new Dimension(3, 3));
    matrix.set(0, 0, 7);
    matrix.set(0, 1, 7);
    matrix.set(1, 1, 7);
    matrix.set(1, 2, 7);
  }
}

export default PieceZ;
