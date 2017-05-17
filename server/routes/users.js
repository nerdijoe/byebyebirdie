var express = require('express')
var router = express.Router();
var userController = require('../controllers/userController')
var passport = require('passport')

router.post('/signup', userController.signUp);
router.post('/signin', passport.authenticate('local', {session: false}), userController.signIn)
router.get('/', userController.getAll);

module.exports = router
