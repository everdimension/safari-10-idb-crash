const path = require('path');
const fs = require('fs');

module.exports = {
  entry: {
    app: ['./src/index'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'worker-loader' },
        ],
      },
      {
        test:   /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ],
  },
  plugins: [
    function copyPage() {
      // provide src/index.html as an asset
      this.plugin('emit', function (compilation, cb) {
        const srcPath = path.join(__dirname, 'src/index.html');
        const fileContents = fs.readFileSync(srcPath, 'utf8');

        compilation.assets['index.html'] = {
          source: function () {
            return fileContents;
          },
          size: function () {
            return fileContents.length;
          },
        };

        cb();
      });
    },
  ],
  devServer: {
    stats: 'errors-only',
    port: 3000,
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
};
