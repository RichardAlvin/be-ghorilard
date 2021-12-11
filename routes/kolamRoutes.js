const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const verify = require('./verifyToken');

// /kolam
router.post('/',verify,userController.addKolam); //tambah kolam per user (id_user,nama_kolam,kode_device)
router.patch('/',verify,userController.editKolam); //edit kolam per user (id_user,id_kolam,nama_kolam,kode_device)
router.delete('/',verify,userController.hapusKolam); //hapus kolam per user (id_user,id_kolam)

module.exports = router;