const express = require('express')
const router = express.Router()
const JenosizeController = require('../Controllers/Jenosize.Controller')

router.get('/search-place', JenosizeController.searchPlace)
router.post('/game-24', JenosizeController.game24)

module.exports = router