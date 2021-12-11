const express = require('express');
const histController = require('../controller/histController.js');
const verify = require('./verifyToken');

const router = express.Router();

//  /hist

router.post('/:_id',histController.InputHist); // per kolam (id_kolam, water_temp, ph_meter, token) 

router.get('/',verify,histController.HistPerKolam); //for graph (id nya itu kode device)

router.patch('/:_id',verify,histController.editRelay); //for relay (relay) (id nya itu kode device);

module.exports = router;
