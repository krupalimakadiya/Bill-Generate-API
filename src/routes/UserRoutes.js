'use strict';

const express = require('express');
const router  = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create-bill', async (req, res, next) => {
 await UserController.createBill(req, res, next)
});

module.exports = router;
