module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./tests/unit/helpers/jsdom-jest-setup.ts"],
  collectCoverageFrom: ["src/**/*.{ts,js}"],
};
