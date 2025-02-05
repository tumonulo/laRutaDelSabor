// const proxy = require('express-http-proxy');

// module.exports = function searchUrl(req, res, next) {
//     const url = req.params.url

//     if (!url) {
//         return res.status(400).send('No se ha proporcionado ninguna URL.')
//     }

//     const targetUrl = decodeURIComponent(url)

//     const proxyMiddleware = proxy(targetUrl, {
//         proxyReqPathResolver: (req) => req.originalUrl,
//         xfwd: true,
//     })

//     proxyMiddleware(req, res, next)
// };

const proxy = require('express-http-proxy');

module.exports = function searchUrl(req, res, next) {
    const url = req.params.url;

    if (!url) {
        return res.status(400).send('No se ha proporcionado ninguna URL.');
    }

    // Asegúrate de que la URL sea válida
    const targetUrl = decodeURIComponent(url); // Decodifica la URL

    const proxyMiddleware = proxy(targetUrl, {
        proxyReqPathResolver: (req) => req.originalUrl, // Mantiene la ruta original
        // Puedes habilitar el encabezado x-forwarded para mantener la IP original
        xfwd: true,
    });

    proxyMiddleware(req, res, next);
};