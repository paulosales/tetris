import Runtime from "../../src/runtime";

describe("Runtime", () => {
  describe("when creates a runtime", () => {
    it("should instances the runtime object", () => {
      const canvas = <HTMLCanvasElement>(
        window.document.getElementById("display")
      );
      const runtime = new Runtime(canvas);
      expect(runtime).not.toBeNull();
    });
  });
});
