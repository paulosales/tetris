let aninationFrameCallback: FrameRequestCallback;

global.requestAnimationFrame = function (callback: FrameRequestCallback): any {
  aninationFrameCallback = callback;
};

import clock from "../../../src/clock/clock";
import ClockListener from "../../../src/clock/clock-listener";

class ClockListenerImpl implements ClockListener {
  ticks: Array<number>;

  constructor() {
    this.ticks = new Array<number>();
  }

  onTick(time: number) {
    this.ticks.push(time);
  }
}

describe("Clock", () => {
  describe("when attach a clock listener and throw 2 ticks in the clock", () => {
    it("should raise the onTick event 2 times", () => {
      const clockListener = new ClockListenerImpl();
      clock.addClockListener(clockListener);
      aninationFrameCallback(200);
      aninationFrameCallback(300);

      expect(clockListener.ticks).toHaveLength(2);
      clock.removeClockListener(clockListener);
      aninationFrameCallback(400);
      expect(clockListener.ticks).toHaveLength(2);
      expect(clockListener.ticks[0]).toBe(200);
      expect(clockListener.ticks[1]).toBe(300);
    });
  });
});
