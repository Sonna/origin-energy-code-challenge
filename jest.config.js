const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/jest-globals",
    "@testing-library/jest-dom",
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};
