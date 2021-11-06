const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const db = require ('/PLACEHOLDER FOR DATABASE DIR');
const bcrypt = require ('bcryptjs');

const authController = {};

authController.createUser = (req, res, next) => {
    try{
        const { username, password, email} = req.body;

        bcrypt.hash(password, 10, (err, hash) => {
            // do I need to add user_id, fave_id and repo_id? would I auto generate a number for those?
            // how do I pass in JS variables? will need to pass in username, hash, and email at a minimum
            db.query('INSERT INTO user(username, password, email) VALUES (I CANNOT FIGURE OUT HOW TO PASS IN JS VARIABLES)') 
        })
    } catch(err) {
        return next(err)
    }
}
;

authController.verifyUser = (req, res, next) => {
    try{
        const {username, password} = req.body;
        // not sure if this is right. I'm hashing the user input
        password = bcrypt.hash(password, 10, (err, hash) => {
            if (err) return next(err);
            else return hash;
        })
        User.findOne({username: username, password: password})
        .then(user => {
            if (!user || !user.password || user.password !== password) {
                res.redirect('/PLACEHOLDER');
                return;
              }
              console.log('user verified')
              return next();
        })
    } catch(err) {
        return next(err)
    }

};

authController.setCookie = () => {

};

authController.setSSIDCookie = () => {

};



module.exports = authController;