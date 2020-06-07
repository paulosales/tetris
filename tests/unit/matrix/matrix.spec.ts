/* eslint-disable @typescript-eslint/ban-ts-comment */
import Matrix from "../../../src/matrix/matrix";
import Dimension from "../../../src/common/dimension";
import RotateDirection from "../../../src/common/rotate-direction";

describe("Matrix", () => {
  describe("when setting a 3 x 3 dimension", () => {
    it("should create a data array of 3 x 3 dimension and filled with 0.", () => {
      const m = new Matrix<number>();
      m.setDimension(new Dimension(3, 3));
      //@ts-ignore
      expect(m.data).toHaveLength(3);
      //@ts-ignore
      m.data.forEach((row) => {
        expect(row).toHaveLength(3);
        row.forEach((value) => {
          expect(value).toBe(0);
        });
      });
    });
  });

  describe("when iterates using forEach in a 2 x 2 identity matrix", () => {
    it("should run over rows first and the runs against the columns.", () => {
      const m = new Matrix<number>();
      m.setDimension(new Dimension(2, 2));
      m.set(0, 0, 1);
      m.set(1, 1, 1);

      const values = new Array<string>();
      m.forEach((value: number, row: number, col: number) => {
        values.push(`${row},${col},${value}`);
      });

      expect(values.join(" ")).toBe("0,0,1 0,1,0 1,0,0 1,1,1");
    });
  });

  describe("when rotating a 3 x 3 matrix in the clockwise direction.", () => {
    it("should rotate the matrix data in the clockwise direction.", () => {
      // 0 1 0
      // 0 1 0
      // 1 1 0
      const m = new Matrix<number>();
      m.setDimension(new Dimension(3, 3));
      m.set(0, 1, 1);
      m.set(1, 1, 1);
      m.set(2, 1, 1);
      m.set(2, 0, 1);

      m.rotate(RotateDirection.CLOCKWISE);

      // 1 0 0
      // 1 1 1
      // 0 0 0
      expect(m.toString()).toBe("1 0 0\n1 1 1\n0 0 0");
    });
  });

  describe("when rotating a 3 x 3 matrix in the counterclockwise direction.", () => {
    it("should rotate the matrix data in the counterclockwise direction.", () => {
      // 0 1 0
      // 0 1 0
      // 1 1 0
      const m = new Matrix<number>();
      m.setDimension(new Dimension(3, 3));
      m.set(0, 1, 1);
      m.set(1, 1, 1);
      m.set(2, 1, 1);
      m.set(2, 0, 1);

      m.rotate(RotateDirection.COUNTERCLOCKWISE);

      // 0 0 0
      // 1 1 1
      // 0 0 1
      expect(m.toString()).toBe("0 0 0\n1 1 1\n0 0 1");
    });
  });

  describe("when splices 2 rows in a 5 x 3 matrix starting at the second line", () => {
    it("should generate a 3 x 3 matrix with the rows 1 4 5 from the original matrix", () => {
      // 0 1 0
      // 0 2 0
      // 0 3 0
      // 0 4 0
      // 0 5 0
      const m = new Matrix<number>();
      m.setDimension(new Dimension(3, 5));
      m.set(0, 1, 1);
      m.set(1, 1, 2);
      m.set(2, 1, 3);
      m.set(3, 1, 4);
      m.set(4, 1, 5);

      m.spliceRows(1, 2);

      // 0 1 0
      // 0 4 0
      // 0 5 0
      expect(m.toString()).toBe("0 1 0\n0 4 0\n0 5 0");
    });
  });

  describe("when adding one rows at the beginning of a 3 x 3 matrix", () => {
    it("should generate a 4 x 3 matrix the new row inserted at the beginning of the original matrix", () => {
      // 0 2 0
      // 0 3 0
      // 0 4 0
      const m = new Matrix<number>();
      m.setDimension(new Dimension(3, 3));
      m.set(0, 1, 2);
      m.set(1, 1, 3);
      m.set(2, 1, 4);

      m.unshiftRow([0, 1, 0]);

      // 0 1 0
      // 0 2 0
      // 0 3 0
      // 0 4 0
      expect(m.toString()).toBe("0 1 0\n0 2 0\n0 3 0\n0 4 0");
    });
  });

  describe("when filling a 3 x 3 matrix with 1", () => {
    it("should fill all matrix cells with 1", () => {
      // 0 0 0
      // 0 0 0
      // 0 0 0
      const m = new Matrix<number>();
      m.setDimension(new Dimension(3, 3));

      m.fill(1);

      // 1 1 1
      // 1 1 1
      // 1 1 1
      expect(m.toString()).toBe("1 1 1\n1 1 1\n1 1 1");
    });
  });

  describe("when getting the dimension of a 3 x 2 matrix", () => {
    it("should return a 3 x 2 dimension", () => {
      const m = new Matrix<number>();
      m.setDimension(new Dimension(2, 3));

      expect(m.getDimension().width).toBe(2);
      expect(m.getDimension().height).toBe(3);
    });
  });

  describe("when get the data stored in (0,0) and (1,1) from 2 x 2 identity matrix", () => {
    it("should return 1", () => {
      const m = new Matrix<number>();
      m.setDimension(new Dimension(2, 2));
      m.set(0, 0, 1);
      m.set(1, 1, 1);

      expect(m.get(0, 0)).toBe(1);
      expect(m.get(1, 1)).toBe(1);
    });
  });
});
