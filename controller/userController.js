//import model
const User = require('../model/user');

//import module
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import validation
const {registerValidation, loginValidation, kolamRegisValidation, kolamEditValidation} = require('../validation');

//controller
module.exports ={
    allUser:(req, res) => {
        if(req.user.auth === 2){
            res.status(401).send('Access Denied');
        }else{
            User.find(function(err,user){
                if(err){
                    res.json(err);
                }else{
                    res.json(user);
                }
            });
        }
    },
    UserById: (async (req,res) =>{
        const spcUser = await User.findById(req.headers._id);
        res.json(spcUser);
    }),
    viewLogin: (async (req,res)=>{
        res.json({message: "LoginPage"});
    }),
    loginUser: (async (req,res)=>{
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //check if the doesn't email exist
        const user = await User.findOne({email_user: req.body.email_user});
        if(user== null){
            return res.status(400).send('email not found');
        }
        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        //create and assign a token
        if(user.auth === 1){
            token = jwt.sign({_id: user._id, auth: 1, exp: Math.floor(Date.now()/1000)+(60*60)}, process.env.TOKEN_SECRET);
            res.header('auth-token',token);
            if(user && validPass){
                res.json({
                    _id: user._id,
                    auth: user.auth,
                    // nama_user: user.nama_user,
                    username: user.email_user,
                    // password: user.password,
                    // auth: user.auth,
                    access_token: token,
                })
            }else{
                res.status(401).send('Email or Password is wrong');
            }
        }else if(user.auth === 2){
            token = jwt.sign({_id: user._id, auth: 2, exp: Math.floor(Date.now()/1000)+(60*60)}, process.env.TOKEN_SECRET);
            res.header('auth-token',token);
            if(user && validPass){
                res.json({
                    _id: user._id,
                    // nama_user: user.nama_user,
                    username: user.email_user,
                    // password: user.password,
                    auth: user.auth,
                    access_token: token,
                })
            }else{
                res.status(401).send('Email or Password is wrong');
            }
        }
    }),
    viewRegis: (req,res)=>{
        res.render('./register');
    },
    regisUser: (async (req,res) =>{
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).json({message: error.details[0].message});

        const emailExist = await User.findOne({email_user: req.body.email_user});
        if(emailExist) return res.status(400).json({message:'Email already exist'});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const date = new Date();
        // const link_comment = "https://ghorilard.herokuapp.com/comment/"+req.body.id_comment;

        //create user
        const user = new User({
            nama_user : req.body.nama_user,
            email_user : req.body.email_user,
            password : hashPassword,
            auth: 2,
            tgl_buatakun: date
        })
    
        const savedUser = await user.save();
        res.json({message: "Register Berhasil"});
    }),
    delUser:  (async (req,res)=>{
        if(req.user.auth === 2){
            res.status(401).send('Access Denied');
        }else{
            const rmvUser = await User.deleteOne({_id: req.headers._id});
            res.json({message: "Delete User Berhasil"});
        }
    }),
    editUser: (async (req,res)=>{
        if(req.user.auth === 2){
            res.status(401).send('Access Denied');
        }else{
            const updUser = await User.updateOne({_id:req.headers._id},{$set: {nama_user: req.body.nama_user}});
            res.json({message: "Edit User Berhasil"});
        }
    }),
    addKolam: (async (req,res)=>{
        const {error} = kolamRegisValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const specUser = await User.findById(req.headers._id); 

        const date = new Date();
        const link_history = "https://ghorilard.herokuapp.com/hist/"+req.body.kode_device;
        
        specUser.data_kolam.push({
            nama_kolam: req.body.nama_kolam,
            kode_device: req.body.kode_device,
            link_history: link_history,
            timestamp: date
        });

        const savedKolam = await specUser.save();
        res.json({message: "Tambah Kolam Berhasil"});
    }),

    editKolam: (async (req,res)=>{
        const {error} = kolamEditValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const specUser = await User.findOneAndUpdate({"_id": req.headers._id, "data_kolam.kode_device":req.body.kode_device},{
            $set:{"data_kolam.$.nama_kolam": req.body.nama_kolam}
        });

        res.json({message: "Edit Kolam Berhasil"});
    }),

    hapusKolam: (async (req,res)=>{
        const specUser = await User.findById(req.headers._id);

        specUser.data_kolam.id(req.body.id_kolam).remove();

        const DelUser = await specUser.save();
        res.json({message: "Hapus Kolam Berhasil!"});
        
    })
}

