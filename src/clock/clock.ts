import ClockListener from "./clock-listener";

/**
 * The game clock handler.
 */
class Clock {
  private listeners: Set<ClockListener>;

  constructor() {
    this.listeners = new Set<ClockListener>();
    this.tick = this.tick.bind(this);
    this.tick();
  }

  /**
   * Add one clock listener.
   * @param listener The listener to add.
   */
  addClockListener(listener: ClockListener) {
    this.listeners.add(listener);
  }

  /**
   * Removes one clock listerner.
   * @param listener The listener to remove.
   */
  removeClockListener(listener: ClockListener) {
    this.listeners.delete(listener);
  }

  /**
   * Remove all clock listeners.
   */
  removeAllListeners(): void {
    this.listeners.clear();
  }

  /**
   * Represents the clock tick.
   * It's called everytime the web browser refreshes the screen.
   * @param time The current clock time.
   */
  private tick(time = 0) {
    this.doTick(time);
    requestAnimationFrame(this.tick);
  }

  /**
   * Notifies clock tick event to clock listeners.
   * @param time the current clock time.
   */
  private doTick(time: number) {
    this.listeners.forEach((listener) => {
      listener.onTick(time);
    });
  }
}

const clock = new Clock();

export default clock;
