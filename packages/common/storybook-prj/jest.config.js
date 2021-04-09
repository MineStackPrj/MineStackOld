module.exports = {
  roots              : ['<rootDir>/src'],
  coverageReporters  : ['text', ['lcov', { 'projectRoot': '/' }], 'json'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory  : '<rootDir>/../../../coverage/common/storybook-prj',
  setupFiles         : ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv : ['<rootDir>/setupTests.ts'],
  testMatch          : ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testEnvironment    : 'jsdom',
  testRunner         : '<rootDir>/../../../node_modules/jest-circus/runner.js',
  transform          : {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$'             : 'babel-jest',
    '^.+\\.css$'                                 : '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  modulePaths     : [],
  moduleNameMapper: {
    '^react-native$'                 : 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@src/(.*)$'                    : '<rootDir>/src/$1',
    '@stores/store/(.*)$'            : '<rootDir>/../client-store-prj/src/common/store/$1',
    '@stores/common/(.*)$'           : '<rootDir>/../client-store-prj/src/common/$1',
    '^@type-def-prj/(.*)$'           : '<rootDir>/../type-def-prj/src/$1'
  },
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
  watchPlugins        : ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks          : true
};
