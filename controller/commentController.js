const Comment = require('../model/comment.js');

const {inputCommentValidation} = require('../validation');

module.exports ={
    
    CommentperUser: (async (req,res) =>{
        const comment = await Comment.findOne({id_comment:req.headers._id});
        res.json(comment);
    }),

    AddComment: (async (req,res) =>{
        const {error} = inputCommentValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const date = new Date();
        const comment1 = await Comment.findOne({id_user: req.headers._id}); 
        
        if(comment1 == null){
            const comment = new Comment({
                id_user: req.headers._id,
                data_comment:{
                    desc_comment:req.body.desc_comment,
                    tgl_comment:date,
                    auth:req.user.auth,
                }
            });
            const savedComment = await comment.save();
            res.json({message: "Comment Added"});
        }else{
            comment1.data_comment.push({
                desc_comment:req.body.desc_comment,
                tgl_comment:date,
                auth:req.user.auth,
            });
            const savedComment = await comment1.save();
            res.json({message: "Comment Added"});
        }
    }),
}

