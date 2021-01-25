// IMPORT CONFIG AN DEPENDENCIES
const express = require('express');
const isAuth = require('../../middleware/is-auth');

const authController = require('../../controller/auth/auth');

const router = express.Router();

router.post('/test', authController.testMetodAuth);
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);


// router.post('./addMarque', isAuth, )



module.exports = router;
