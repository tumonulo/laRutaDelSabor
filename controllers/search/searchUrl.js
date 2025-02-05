const proxy = require('express-http-proxy');

module.exports = function searchUrl(req, res, next) {
    const url = req.params.url

    if (!url) {
        return res.status(400).send('No se ha proporcionado ninguna URL.')
    }

    const targetUrl = decodeURIComponent(url)

    const proxyMiddleware = proxy(targetUrl, {
        proxyReqPathResolver: (req) => req.originalUrl,
        xfwd: true,
    })

    proxyMiddleware(req, res, next)
};