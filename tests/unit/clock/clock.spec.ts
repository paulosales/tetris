import clock from "../../../src/clock/clock";
import ClockListenerImpl from "../helpers/clock-listener-impl";
import { animationFrameCallback } from "../helpers/jsdom-jest-setup";

describe("Clock", () => {
  describe("when attaching a clock listener and throw 2 ticks in the clock", () => {
    it("should raise the onTick event 2 times", () => {
      const clockListener = new ClockListenerImpl();
      clock.addClockListener(clockListener);
      animationFrameCallback(200);
      animationFrameCallback(300);

      expect(clockListener.ticks).toHaveLength(2);
      clock.removeClockListener(clockListener);
      animationFrameCallback(400);
      expect(clockListener.ticks).toHaveLength(2);
      expect(clockListener.ticks[0]).toBe(200);
      expect(clockListener.ticks[1]).toBe(300);
    });
  });
});
