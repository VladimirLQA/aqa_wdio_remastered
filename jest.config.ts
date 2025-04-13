import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "node",
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  testMatch: ['**/api/tests/**/smoke.test.ts'],
  extensionsToTreatAsEsm: ['.ts']
};

export default config;