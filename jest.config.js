module.exports = {
    coveragePathIgnorePatterns: [
        "/node_modules/",
    ],
    moduleFileExtensions: ["js", "json", "vue"],
    testEnvironment: "node",
    testMatch: [
        "<rootDir>/tests/**/*.test.js"
    ],
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.vue$": "vue-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/"
    ],
    verbose: true,
};