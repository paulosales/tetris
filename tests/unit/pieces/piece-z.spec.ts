/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceZ from "../../../src/pieces/piece-z";

describe("PieceZ", () => {
  describe("when generating the piece Z shape", () => {
    it("should create a 3x3 matrix that represents the piece Z shape", () => {
      const piece = new PieceZ();

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(3);
      expect(matrix.getDimension().height).toBe(3);
      expect(matrix.toString()).toBe("7 7 0\n0 7 7\n0 0 0");
    });
  });
});
