import Dimension from "../common/dimension";
import RotateDirection from "../common/rotate-direction";

/**
 * A bidimensional matrix.
 */
class Matrix<T> {
  //The matrix dimension.
  private dimension: Dimension;
  //The matrix data.
  private data: T[][];

  /**
   * Retrieves the matrix dimension.
   */
  public getDimension(): Dimension {
    return this.dimension;
  }

  /**
   * Sets the matrix dimension.
   * @param dimension The new dimension.
   */
  public setDimension(dimension: Dimension): void {
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

  /**
   * Rotates the matrix content.
   * @param direction The rotation direction.
   */
  public rotate(direction: RotateDirection): void {
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

  /**
   * Removes rows from the matrix.
   * @param start initial index of the removed rows.
   * @param deleteCount Quantity os rows to be deleted.
   * @returns The deleted rows.
   */
  public spliceRows(start: number, deleteCount: number): Array<Array<T>> {
    return this.data.splice(start, deleteCount);
  }

  /**
   * Add one row at the begging of the matrix.
   * @param row The row to add at the matrix begin.
   */
  public unshiftRow(row: Array<T>): void {
    this.data.unshift(row);
  }

  /**
   * Fill up the matrix content.
   * @param value The value to fill the matrix content.
   */
  public fill(value: T): void {
    this.data.forEach((row) => {
      row.fill(value);
    });
  }

  /**
   * The string representation of the matrix.
   */
  public toString(): string {
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

  /**
   * Get the data from matrix cell.
   * @param row The row index of the data.
   * @param col The column index of the data.
   */
  public get(row: number, col: number): T {
    return this.data[row][col];
  }

  /**
   * Set data to matrix cell.
   * @param row The row index of the data cell.
   * @param col The column index of the data cell.
   * @param value The value to be setted.
   */
  public set(row: number, col: number, value: T): void {
    this.data[row][col] = value;
  }
}

export default Matrix;
