'use strict';

const express = require('express');
const router  = express.Router();
const UserController = require('../controllers/UserController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

const upload = multer({ storage: storage })

router.post('/create-bill',[
    UserController.createBill,
]);



module.exports = router;