import Dimension from "../common/dimension";
import RotateDirection from "../common/rotate-direction";

class Matrix<T> {
  private dimension: Dimension;
  private data: T[][];

  getDimension(): Dimension {
    return this.dimension;
  }

  setDimension(dimension: Dimension): void {
    this.dimension = dimension;
    this.data = [];
    let h = dimension.height;
    while (h--) {
      this.data.push(new Array(dimension.width).fill(0));
    }
  }

  forEach(handler: (value: T, row: number, col: number) => void): void {
    this.data.forEach((rowData: T[], row: number) => {
      rowData.forEach((value: T, col: number) => {
        handler(value, row, col);
      });
    });
  }

  rotate(direction: RotateDirection): void {
    //transpose the matrix: Exchange the matrix columns by matrix lines.
    for (let y = 0; y < this.dimension.height; ++y) {
      for (let x = 0; x < y; ++x) {
        //swaping
        [this.data[x][y], this.data[y][x]] = [this.data[y][x], this.data[x][y]];
      }
    }

    if (direction === RotateDirection.CLOCKWISE) {
      //reverse the matrix rows
      this.data.forEach((row: Array<T>) => {
        row.reverse();
      });
    } else {
      //reverse the matrix columns
      this.data.reverse();
    }
  }

  spliceRows(start: number, deleteCount: number): Array<Array<T>> {
    return this.data.splice(start, deleteCount);
  }

  unshiftRow(row: Array<T>): void {
    this.data.unshift(row);
  }

  fill(value: T): void {
    this.data.forEach((row) => {
      row.fill(value);
    });
  }

  toString(): string {
    const strRows = new Array<string>();
    this.data.forEach((row) => {
      const strCols = new Array<string>();
      row.forEach((value) => {
        strCols.push(value.toString());
      });
      strRows.push(strCols.join(" "));
    });
    return strRows.join("\n");
  }

  get(row: number, col: number): T {
    return this.data[row][col];
  }

  set(row: number, col: number, value: T): void {
    this.data[row][col] = value;
  }
}

export default Matrix;
