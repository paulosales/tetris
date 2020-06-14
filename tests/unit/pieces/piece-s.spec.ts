/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceS from "../../../src/pieces/piece-s";

describe("PieceS", () => {
  describe("when generating the piece S shape", () => {
    it("should create a 3x3 matrix that represents the piece S shape", () => {
      const piece = new PieceS();

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(3);
      expect(matrix.getDimension().height).toBe(3);
      expect(matrix.toString()).toBe("0 6 6\n6 6 0\n0 0 0");
    });
  });
});
