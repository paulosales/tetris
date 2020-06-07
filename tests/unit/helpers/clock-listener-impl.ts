import ClockListener from "../../../src/clock/clock-listener";

class ClockListenerImpl implements ClockListener {
  ticks: Array<number>;

  constructor() {
    this.ticks = new Array<number>();
  }

  onTick(time: number): void {
    this.ticks.push(time);
  }
}

export default ClockListenerImpl;
