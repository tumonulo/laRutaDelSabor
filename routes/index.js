const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + 'pages/home/home')
})

module.exports = router