const { createDefaultPreset, TS_TRANSFORM_PATTERN } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/jest-globals",
    "@testing-library/jest-dom",
    "./test/jestSetup.ts",
  ],
  transform: {
    ...tsJestTransformCfg,
    [TS_TRANSFORM_PATTERN]: [
      'ts-jest', {
        tsconfig: 'tsconfig.client.json'
      }
    ]
  },
};
