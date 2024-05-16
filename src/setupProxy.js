const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/nginxApi',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000',
            changeOrigin: true, //控制服务器接收到的请求头中host字段的值
            pathRewrite: {'^/nginxApi': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
        })
    );
    // app.use(
    //     '/napi2',
    //     createProxyMiddleware({
    //         target: 'http://192.168.0.108:8002',    // 192.168.0.108:8002
    //         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
    //         pathRewrite: {'^/napi2': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    //     })
    // );
};