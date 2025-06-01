// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  // Enable verbose output
  verbose: true,
  
  // Set the test environment
  testEnvironment: 'node', // or 'jsdom' if testing React components
  
  // Handle TypeScript files
  preset: 'ts-jest',
  
  // Enable ES modules support
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  // Configure module name mapping if needed
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust path aliases as needed
  },
  
  // Transform configuration
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  
  // Setup files (if needed)
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;