export { };
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts',
        '!**/vendor/**'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        ".(ts|tsx)": "ts-jest"
    },

    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "/coverage",
        "package.json",
        "package-lock.json",
        "reportWebVitals.ts",
        "setupTests.ts",
        "index.tsx"
    ],
    setupFilesAfterEnv: ['jest.setup.ts'],

    moduleDirectories: ["node_modules", "src", "<rootDir>"],

    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },

};