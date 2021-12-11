const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/pervaProject');

const New_hist_kolam = mongoose.model('hist_kolam',{
    id_kolam:String,
    relay:Boolean,
    token:String,
    data_hist:[{water_temp:Number, ph_meter:Number, timestamp:Date}]
});

module.exports = New_hist_kolam;