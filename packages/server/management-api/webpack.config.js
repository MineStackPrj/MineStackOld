const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const BUILD_ROOT = path.join(__dirname, '../../../dist/server/management-api');
const SRC_ROOT = path.join(__dirname, './src');

const common = {
  target : 'node',
  context: SRC_ROOT,
  entry  : {
    index: path.resolve(SRC_ROOT, 'bin/www.ts')
  },
  externals: [nodeExternals({
    modulesDir: '../../../node_modules'
  })],
  output: {
    filename     : 'index.js',
    path         : BUILD_ROOT,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test   : /\.ts$/,
        exclude: /node_modules/,
        loader : 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias     : {
      '@type-def-prj': path.resolve(__dirname, './../../common/type-def-prj/src')
    }
  }
};

const prod = merge(common, {
  mode: 'production'
});

const dev = merge(common, {
  mode   : 'development',
  devtool: 'inline-source-map',
  output : {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  }
});

module.exports = `${process.env.WEBPACK_BUILD_OPTION}`.replace(' ', '') === 'prod' ? prod : dev;
