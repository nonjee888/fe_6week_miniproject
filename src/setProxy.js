const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "http://43.200.4.142:8080",
      changeOrigin: true,
    })
  );
};