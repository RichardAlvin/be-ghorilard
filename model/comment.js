const mongoose = require('mongoose');

const Comment = mongoose.model('comment',{
    id_user:String,
    data_comment:[{desc_comment:String,tgl_comment:Date,auth:Number}]
});

module.exports = Comment;