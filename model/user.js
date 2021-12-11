const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/pervaProject');

const User = mongoose.model('user',{
    nama_user:String,
    email_user:String,
    password:String,
    auth:Number,
    data_kolam:[{nama_kolam: String, kode_device: String, link_history: String, timestamp:Date}],
    tgl_buatakun: Date,
});

module.exports = User;