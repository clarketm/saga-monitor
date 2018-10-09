module.exports = {
  globals: {
    window: true,
    navigator: true
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  testMatch: ["<rootDir>/test/**/?(*)(spec|test).{js,jsx,mjs}"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  },
  moduleFileExtensions: ["web.js", "mjs", "js", "json", "web.jsx", "jsx", "node"]
};
