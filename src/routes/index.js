'use strict';

var express = require('express');

var userRoutes = require('./UserRoutes');
var router = express.Router();

//test Route
router.use('/user', userRoutes);

module.exports = router;