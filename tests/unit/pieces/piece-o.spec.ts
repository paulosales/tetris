/* eslint-disable @typescript-eslint/ban-ts-comment */
import PieceO from "../../../src/pieces/piece-o";

describe("PieceI", () => {
  describe("when generating the piece O shape", () => {
    it("should create a 2x2 matrix that represents the piece O shape", () => {
      const piece = new PieceO();

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(2);
      expect(matrix.getDimension().height).toBe(2);
      expect(matrix.toString()).toBe("2 2\n2 2");
    });
  });
});
