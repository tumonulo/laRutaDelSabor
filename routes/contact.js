const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('pages/contact')
})

module.exports = router