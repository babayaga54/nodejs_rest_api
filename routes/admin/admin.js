// IMPORT CONFIG AN DEPENDENCIES
const express = require('express');
const isAuth = require('../../middleware/is-auth');

const adminController = require('../../controller/admin/admin');

const router = express.Router();

router.post('/test',adminController.testMetodAuth);
// router.post('./addMarque', isAuth, )



module.exports = router;
