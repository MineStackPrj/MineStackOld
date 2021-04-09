/**
 * @file setupProxy.js
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api/*', createProxyMiddleware({
    target     : 'http://localhost:4000',
    pathRewrite: {
      '^/api/': '/'
    }
  }));
};
