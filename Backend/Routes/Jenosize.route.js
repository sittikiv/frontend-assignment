const express = require('express')
const router = express.Router()
const JenosizeController = require('../Controllers/Jenosize.Controller')

router.get('/search-place', JenosizeController.searchPlace)

module.exports = router