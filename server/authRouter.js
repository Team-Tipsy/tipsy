const express = require('express');
const { setSSIDCookie } = require('./authController');
const authController = require('./authController');
const router = express.Router();

//all endpoints are placeholders 
router.post('/signup', 
authController.createUser, setSSIDCookie,
    (req, res) => res.status(200).redirect('/PLACEHOLDER ENDPOINT')); // need to chat with front end team to find out what they want to happen when user is created

router.get('/login',
authController.verifyUser, setSSIDCookie,
    (req, req) => res.status(200).redirect('/PLACEHOLDER ENDPOINT')); // need to chat with front end team to find out what they want to happen when user logs in successfully

module.exports = authRouter;