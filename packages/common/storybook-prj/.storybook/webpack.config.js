const path = require('path');

// Add a default custom config which is similar to what React Create App does.
module.exports = ({config}) => {

  config.resolve.alias = {
    // This is to support NPM2
    'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator'),
    '@src': path.resolve(__dirname, '../src'),
    '@stores/store': path.resolve(__dirname, '../../../common/client-store-prj/src/common/store'),
    '@stores/common': path.resolve(__dirname, '../../../common/client-store-prj/src/common'),
    '@type-def-prj': path.resolve(__dirname, '../../../common/type-def-prj/src')
  };

  // Return the altered config
  return config;
};
