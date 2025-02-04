const { Router } = require('express')
const router = Router()

const gamesList = require('../controllers/games/gameList.js')
const gamesGame = require('../controllers/games/gamesGame.js')

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/html/games.html')
})

router.get('/list', gamesList)

router.get('/:game', gamesGame)

module.exports = router