const https = require('node:https')
const http = require('node:http')
const proxy = require('express-http-proxy');

module.exports = function searchUrl(req, res, next) {
    const targetUrl = decodeURIComponent(req.params.url);

    if (!targetUrl) {
        return res.status(400).send('No se ha proporcionado ninguna URL.');
    }

    // Configuración del proxy
    const proxyMiddleware = proxy(targetUrl, {
        https: true, // Fuerza el uso de HTTPS
        proxyReqPathResolver: (req) => {
            // Reescribe la ruta para que coincida con el destino
            return req.url.replace(`/proxy/${req.params.url}`, '');
        },
        userResHeaderDecorator(headers) {
            // Opcional: Modifica los encabezados de respuesta para ocultar información del proxy
            delete headers['x-powered-by'];
            return headers;
        },
        proxyErrorHandler(err, res, next) {
            console.error('Error en el proxy:', err);
            res.status(500).send('Error al procesar la solicitud.');
        },
    });

    proxyMiddleware(req, res, next);
}