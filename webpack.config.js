const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  performance: {
    hints: false,
  },
};

// Configuration for UMD module (for Node.js and bundlers)
const umdConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clean-ai-text.lib.js',
    library: {
      name: 'cleanAIText',
      type: 'var',
    },
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: true,
          mangle: true,
        },
        extractComments: false,
      }),
    ],
  },
};

// Configuration for browser standalone version (minified)
const browserConfigMin = {
  ...baseConfig,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clean-ai-text.min.js',
    library: 'cleanAIText',
    libraryTarget: 'window',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
            ecma: 5,
            keep_infinity: true,
            reduce_vars: true,
          },
          mangle: true,
          format: {
            comments: false,
            ecma: 5
          },
        },
        extractComments: false,
      }),
    ],
  },
};

// Configuration for browser standalone version (development)
const browserConfigDev = {
  ...baseConfig,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clean-ai-text.dev.js',
    library: 'cleanAIText',
    libraryTarget: 'window',
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
};

// Export all configurations
module.exports = [umdConfig, browserConfigMin, browserConfigDev];
