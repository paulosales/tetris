/* eslint-disable @typescript-eslint/ban-ts-comment */
import Arena from "../../../src/arena/arena";
import PieceJ from "../../../src/pieces/piece-j";

describe("PieceI", () => {
  describe("when generating the piece J shape", () => {
    it("should create a 3x3 matrix that represents the piece J shape", () => {
      const arena = new Arena();
      const piece = new PieceJ(arena);

      //@ts-ignore
      const matrix = piece.matrix;
      expect(matrix.getDimension().width).toBe(3);
      expect(matrix.getDimension().height).toBe(3);
      expect(matrix.toString()).toBe("0 4 0\n0 4 0\n4 4 0");
    });
  });
});
