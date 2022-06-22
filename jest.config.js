module.exports = {
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/test'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/test/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/test/**',
    '^@test/(.*)$': '<rootDir>/test/*.spec.ts'
  },
  setupFiles: ['dotenv/config']
}
