const express = require('express');
const commentController = require('../controller/commentController.js');
const verify = require('./verifyToken');

const router = express.Router();


// /comment

router.get('/',verify,commentController.CommentperUser);
router.post('/',verify,commentController.AddComment);

module.exports = router;