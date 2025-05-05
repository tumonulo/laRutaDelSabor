const { Router } = require('express')
const router = Router()

router.get('/menus', (req, res) => {
    res.sendFile(process.cwd() + 'pages/menus/menus')
})

module.exports = router