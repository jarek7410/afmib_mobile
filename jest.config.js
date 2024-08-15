module.exports = {
  preset: 'react-native',
  "setupFiles": ["./setup.jest.js"],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
    "!./.eslintrc.js",
    "!./.prettierrc.js",
    "!./jest.config.js",
    "!./metro.config.js",
  ]
};

