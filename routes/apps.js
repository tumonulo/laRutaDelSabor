const { Router } = require('express')
const router = Router()

const appsList = require('../controllers/games/appsList.js')
const appsApp = require('../controllers/games/appsApp.js')

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/apps.html')
})

router.get('/list', appsList)

router.get('/:app', appsApp)

module.exports = router