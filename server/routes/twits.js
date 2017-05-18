var express = require('express')
var router = express.Router();
var twitController = require('../controllers/twitController')

router.get('/', twitController.getAll)
router.post('/', twitController.create)

module.exports = router
