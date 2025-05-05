const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('pages/contacto')
})

module.exports = router