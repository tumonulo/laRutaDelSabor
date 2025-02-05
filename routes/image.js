const { Router } = require('express')
const router = Router()

const imageGenerations = require('../controllers/image/imageGenerations.js')

router.get('/generations/:prompt', imageGenerations)

module.exports = router