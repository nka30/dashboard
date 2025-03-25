import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",  // Transform .ts and .tsx files using ts-jest
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
