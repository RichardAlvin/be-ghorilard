const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');


// /login
router.get('/', userController.viewLogin);
router.post('/',userController.loginUser); //login

module.exports = router;