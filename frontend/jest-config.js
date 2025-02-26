module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(ts|tsx)$': ["ts-jest", { useESM: true }],
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
  };