/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceT from "../../../src/pieces/piece-t";

describe("PieceT", () => {
  describe("when generating the piece T shape", () => {
    it("should create a 3x3 matrix that represents the piece T shape", () => {
      const piece = new PieceT();

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(3);
      expect(matrix.getDimension().height).toBe(3);
      expect(matrix.toString()).toBe("0 0 0\n1 1 1\n0 1 0");
    });
  });
});
