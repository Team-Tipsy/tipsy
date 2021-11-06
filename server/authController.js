const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const db = require ('/PLACEHOLDER FOR DATABASE DIR');
const bcrypt = require ('bcryptjs');

const authController = {};

authController.createUser = (req, res, next) => {
    try{
        // user will enter the following info into fields on the front end signup page. 
        // destructure user inputs from req.body
        const { username, password, firstName, lastName, email} = req.body;
        let hashedPassword;
        // if this doesn't work, check out https://node-postgres.com/features/queries for another option using parameterized queries
        const userQuery = `INSERT INTO user(firstName, lastName, email) VALUES (${firstName}, ${lastName}, ${email})`;
        // if lastval() doesn't work, look into doing a query to find our newly created user and saving its _id to a variable
        const userLoginInfoQuery = `INSERT INTO userLoginInfo(user_id username, password) VALUES (${lastval()}, ${username}, ${hashedPassword})`;
        // hash the user inputted password using salt length 10
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return next(err);
            hashedPassword = hash;
            db.query(userQuery)
            .then(() => {
                db.query(userLoginInfoQuery)
            })
            .then(() => {
                return next()
            })
            .catch((err) => {
                return next(err);
            });
        });
    } catch(err) {
        return next(err)
    };
};

authController.verifyUser = (req, res, next) => {
    try{
        const {username, password} = req.body;
        let hashedPassword;
        const query = `SELECT user(${username}, ${hashedPassword})`
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return next(err);
            hashedPassword = hash;
            db.query(query)
            .then(() => {
                return next();
            })
            .catch((err) => {
                return next(err);
            });
        });
    } catch(err) {
        return next(err)
    };
};

authController.setCookie = () => {

};

authController.setSSIDCookie = () => {

};





module.exports = authController;