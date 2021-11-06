const express = require('express');
const authController = require('./authController');
const router = express.Router();

//all endpoints are placeholders 
router.post('/signup', 
authController.createUser, 
    (req, res) => res.status(200).redirect('/PLACEHOLDER ENDPOINT'));

router.get('/login',
authController.verifyUser,
    (req, req) => res.status(200).redirect('/PLACEHOLDER ENDPOINT'))

module.exports = authRouter;