var express = require('express')
var router = express.Router();
var twitController = require('../controllers/twitController')
var jwtAuth = require('../helpers/jwtAuth')

router.get('/', twitController.getAll)
router.post('/',jwtAuth.verifyToken, twitController.create)
router.delete('/:id', jwtAuth.verifyToken, twitController.delete)

module.exports = router
