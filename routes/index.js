const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/pages/index/index.html')
})

module.exports = router