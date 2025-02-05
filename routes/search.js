const { Router } = require('express')
const router = Router()

const searchUrl = require('../controllers/search/searchUrl.js')

router.get('/:url', searchUrl)

module.exports = router