import ArenaListener from "../../../src/arena/arena-listener";

class ArenaListenerImpl implements ArenaListener {
  sweepedRows: Array<number>;
  clearCount: number;

  constructor() {
    this.sweepedRows = new Array<number>();
    this.clearCount = 0;
  }

  onSweep(row: number): void {
    this.sweepedRows.push(row);
  }

  onClear(): void {
    this.clearCount++;
  }
}

export default ArenaListenerImpl;
