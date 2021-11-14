const express = require('express');
const authController = require('./controllers/authController');
const authRouter = express.Router();

//all endpoints are placeholders 
authRouter.post('/signup', 
authController.createUser,
    (req, res) => res.status(200).send('/PLACEHOLDER ENDPOINT'));

authRouter.get('/login',
authController.verifyUser,
    (req, res) => res.status(200).send('/PLACEHOLDER ENDPOINT')); 

module.exports = authRouter;
