module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/**/*.d.ts',
    '!**/index.js',
    '!**/index.ts'
  ],
  coveragePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  testMatch: [
    '<rootDir>/src/**/test/**/*.{js,ts}',
    '<rootDir>/src/**/*.{spec,test}.{js,ts}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  errorOnDeprecated: true,
  modulePaths: ['<rootDir>/src']
};
