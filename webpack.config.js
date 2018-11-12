const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'client/boot.tsx')
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].chunk.js',
        filename:"[name].js",
        publicPath: "/"
    },
    mode:'development',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
      module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: "ts-loader" },
          { test: /\.css$/, use: 'css-loader' },
        ]
    },
  };