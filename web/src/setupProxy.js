const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.API_PROXY || 'http://127.0.0.1:3000/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    }),
  );
};
