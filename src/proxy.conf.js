const PROXY_CONFIG = [
    {
        context: [
            '/ap1/v1',
        ],
        target: "http://127.0.0.1:5000/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/":""
        }
    }
]
module.exports = PROXY_CONFIG;