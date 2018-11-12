const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js')
const compiler = webpack(config)
const express = require('express');
const path = require('path');
const server = express();
const expressOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

server.use(middleware(compiler));
server.use(express.static('.',expressOptions));

server.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname,'Index.html'));
  });

  server.listen(5000, '0.0.0.0' , function onStart(err) {
    if (err) { console.log(err); }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:3000/ in your browser.');
  });