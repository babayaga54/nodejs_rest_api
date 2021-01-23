// IMPORT CONFIG AN DEPENDENCIES
const express = require('express');
const isAuth = require('../../middleware/is-auth');

const userController = require('../../controller/user/user');

const router = express.Router();

router.post('/test', userController.testMetodAuth);
// router.post('./addMarque', isAuth, )



module.exports = router;
