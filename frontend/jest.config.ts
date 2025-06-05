export { };
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.tsx',
        '!src/index.ts',
        '!src/reportWebVitals.ts',
        '!src/App.tsx',
        '!**/vendor/**'
    ],
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
        "index.tsx",
        "App.tsx"
    ],
    setupFilesAfterEnv: ['jest.setup.js'],

    moduleDirectories: ["node_modules", "src", "<rootDir>"],

    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};