const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

// /register
router.get('/', userController.viewRegis)
router.post('/',userController.regisUser); // registration

module.exports = router;