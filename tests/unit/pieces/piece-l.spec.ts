/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceL from "../../../src/pieces/piece-l";

describe("PieceI", () => {
  describe("when generating the piece L shape", () => {
    it("should create a 3x3 matrix that represents the piece L shape", () => {
      const piece = new PieceL();

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(3);
      expect(matrix.getDimension().height).toBe(3);
      expect(matrix.toString()).toBe("0 3 0\n0 3 0\n0 3 3");
    });
  });
});
