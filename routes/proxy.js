const { Router } = require('express');
const router = Router();
const proxy = require('express-http-proxy');

router.use('/proxy/:url', (req, res, next) => {
    const url = req.params.url;
    if (!url) {
        return res.status(400).send('URL no proporcionada');
    }
    return proxy(url)(req, res, next);
});

module.exports = router;