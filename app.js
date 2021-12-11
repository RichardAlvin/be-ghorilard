//import
const userRoutes = require('./routes/userRoutes.js');
const hist_kolamRoutes = require('./routes/hist_kolamRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const regisRoutes = require('./routes/regisRoutes');
const kolamRoutes = require('./routes/kolamRoutes');
const allUserRoutes = require('./routes/allUserRoutes');

//express
const express = require('express')
const app = express()

//web socket
const Socket = require('socket.io');
// const websockets = require('./websockets');

//connect dotenv
require("dotenv").config();

//connect mongoose
require('./utils/db');

//connect ejs
app.set('view engine','ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cors
const cors=require("cors");
const { isValidObjectId } = require('mongoose');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use('/user', userRoutes);
app.use('/kolam', kolamRoutes);
app.use('/hist',hist_kolamRoutes);
app.use('/comment', commentRoutes);
app.use('/login', loginRoutes);
app.use('/register',regisRoutes);
app.use('/users',allUserRoutes);


//route
app.get('/', function (req, res) {
    res.render('dashboard');
})

app.get('/about', function(req,res){
    res.json({message : 'AboutPage'});
})

//middleware bagi yang akses route tidak sesuai
app.use('/', (req,res) => {
    res.status(404); 
    res.send('<h1>404</h1>');
});

const server = app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

const io = Socket(server);
let admin;

io.on('connect', function (socket){
    socket.on('login', (id_admin)=>{
        admin = id_admin;
        socket.emit("admin_id",admin);
    });

    socket.emit("admin_id",admin);

    socket.on("admin", () => {
        console.log('CHECK ADMIN :' + admin);
        socket.emit("admin", admin);
    });

    socket.on("helpdesk",(id,msg,id_user) => {
        console.log(msg);
        socket.to(id).emit("helpdesk_rep",id,msg,id_user);
    });
});
  


// const io = require('socket.io')(server);
            
    // socket.on('chat', (msg) => {
    //     const myVar = require('./controller/commentController');
    //     console.log(comment);
    //     console.log(dates);
    //     console.log(auth);
    //     console.log("test");
    //     socket.emit('comment', [myVar.comment,myVar.auth,myVar.dates]);
    // });

    // socket.on('disconnect', ()=>{
    //     console.log('User Disconnected');
    // })


// module.exports = app;