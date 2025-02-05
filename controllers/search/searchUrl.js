const proxy = require('express-http-proxy')

module.exports = function searchUrl(req, res, next) {
    const url = req.params.url

    if (!url) {
        return res.status(400).send('No se ha proporcionado ninguna URL.')
    }

    const proxyMiddleware = proxy(url, {
        proxyReqPathResolver: (req) => req.originalUrl,
    })

    proxyMiddleware(req, res, next)
}