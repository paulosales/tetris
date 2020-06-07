/* eslint-disable @typescript-eslint/ban-ts-comment */
import Arena from "../../../src/arena/arena";
import PieceI from "../../../src/pieces/piece-i";

describe("PieceI", () => {
  describe("when generating the piece I shape", () => {
    it("should create a 4x4 matrix that represents the piece I shape", () => {
      const arena = new Arena();
      const piece = new PieceI(arena);

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(4);
      expect(matrix.getDimension().height).toBe(4);
      expect(matrix.toString()).toBe("0 5 0 0\n0 5 0 0\n0 5 0 0\n0 5 0 0");
    });
  });
});
