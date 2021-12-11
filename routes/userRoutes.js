const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const verify = require('./verifyToken');

// /user
router.get('/',verify,userController.UserById);
router.delete('/',verify,userController.delUser);
router.patch('/',verify,userController.editUser);

module.exports = router;