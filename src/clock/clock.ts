import ClockListener from "./clock-listener";

class Clock {
  private listeners: Set<ClockListener>;

  constructor() {
    this.listeners = new Set<ClockListener>();
    this.tick = this.tick.bind(this);
    this.tick();
  }

  addClockListener(listener: ClockListener) {
    this.listeners.add(listener);
  }

  removeClockListener(listener: ClockListener) {
    this.listeners.delete(listener);
  }

  private tick(time = 0) {
    this.doTick(time);
    requestAnimationFrame(this.tick);
  }

  private doTick(time: number) {
    this.listeners.forEach((listener) => {
      listener.onTick(time);
    });
  }
}

const clock = new Clock();

export default clock;
