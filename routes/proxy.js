const { Router } = require('express');
const proxy = require('express-http-proxy')
const router = Router()

router.get('/proxy/:url', (req, res, next) => {
    const url = decodeURIComponent(req.params.url)

    if (!url) {
        return res.status(400).send('URL no proporcionada')
    }

    try {
        new URL(url)
    } catch (error) {
        return res.status(400).send('URL no válida')
    }

    return proxy(url, {
        proxyReqPathResolver: () => '/',
    })(req, res, next);
})

module.exports = router;
