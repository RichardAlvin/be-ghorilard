const Hist_kolam = require('../model/hist_kolam');
const bcrypt = require('bcryptjs');

const io = require('../app');

const {inputHistValidation} = require('../validation');
const User = require('../model/user');

module.exports ={

    HistPerKolam: (async (req,res) => {

        let user = await User.findOne({_id: req.user._id});
        let e;
        let temp = 0;
        user = user.data_kolam;
        user.forEach(element =>{
            e = element.kode_device;
            if(e === req.headers.kode_device){
                temp = 1;
            }
        });

        if(temp){
            const hist = await Hist_kolam.findOne({id_kolam: req.headers.kode_device});
            if(hist === null){
                res.json("No Data for Graphic");
            }else{
                res.json(hist);
            }  
        }else{
            res.json({message: "Access Denied"});
        }
    }),

    InputHist: (async (req,res) => {
        const {error} = inputHistValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const Hist_kolam1 = await Hist_kolam.findOne({id_kolam: req.params._id}); 
        
        if(Hist_kolam1 == null){
            const salt = await bcrypt.genSalt(10);
            const hashToken = await bcrypt.hash(req.body.token, salt);

            const hist = new Hist_kolam({
                id_kolam: req.params._id,
                relay:false,
                token: hashToken,
                data_hist:{
                    water_temp: req.body.water_temp,
                    ph_meter: req.body.ph_meter,
                    timestamp: new Date()
                }
            });
            const savedHist_kolam = await hist.save();
            res.json(savedHist_kolam);
        }else{
            const validPass = await bcrypt.compare(req.body.token, Hist_kolam1.token);
            if(validPass){
                Hist_kolam1.data_hist.push({
                    water_temp: req.body.water_temp,
                    ph_meter: req.body.ph_meter,
                    timestamp: new Date()
                });
                const savedHist_kolam = await Hist_kolam1.save();
                res.json(savedHist_kolam);
            }else{
                res.status(401)
            }
        }

        io.io.on('connection', (socket) => {
            const data = req.body;
            socket.on('dataDevices', (data)=>{
                socket.emit('water_temp',data.water_temp);
                socket.emit('ph_meter',data.ph_meter);
            })
            
            // socket.on('text', (msg) => {
            //     socket.emit('tests', msg);
            // });

            socket.on('disconnect', ()=>{
                console.log('Device Disconnected');
            })
        });
    }),

    editRelay: (async(req,res)=>{

        const Hist_kolam1 = await Hist_kolam.findOne({id_kolam: req.headers._id});
        if(Hist_kolam1.relay === true ){
            const updateRelay = await Hist_kolam.updateOne({id_kolam: req.params._id},{$set:{relay:false}});
            res.json(updateRelay); 
        }else{
            const updateRelay = await Hist_kolam.updateOne({id_kolam: req.params._id},{$set:{relay:true}});
            res.json(updateRelay);
        }
    

    })

}