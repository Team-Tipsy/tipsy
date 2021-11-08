const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const db = require ('./models/userModels.js');
const bcrypt = require ('bcryptjs');

const authController = {};

authController.createUser = (req, res, next) => {
    try{
        // user will enter the following info into fields on the front end signup page. 
        // destructure user inputs from req.body
        //______________
        console.log(`entered createUser middleware`);
        //______________
        const { username, password, firstName, lastName, email} = req.body;
        let hashedPassword;
        // if this doesn't work, check out https://node-postgres.com/features/queries for another option using parameterized queries
        const userQuery = `INSERT INTO user(first_name, last_name, email) VALUES (${firstName}, ${lastName}, ${email})`;
        // if lastval() doesn't work, look into doing a query to find our newly created user and saving its _id to a variable
        // lastval() notes are here https://www.postgresql.org/docs/current/functions-sequence.html
        const userLoginInfoQuery = `INSERT INTO user_login(user_id username, password) VALUES (${lastval()}, ${username}, ${hashedPassword})`;
        // hash the user inputted password using salt length 10
        bcrypt.hash(password, 10, (err, hash) => {
            //______________
            console.log(`attempting to hash and salt password in createUser middleware`);
            //______________
            if (err) return next(err);
            hashedPassword = hash;
            db.query(userQuery)
            .then(() => {
                //______________
                console.log(`entered userLoginInfoQuery request`);
                //______________
                db.query(userLoginInfoQuery);
            })
            .then(() => {
                return next();
            })
            .catch((err) => {
                //______________
                console.log('caught an error in one of the database queries');
                //______________
                return next(err);
            });
        });
    } catch(err) {
        //______________
        console.log(`entered big "catch block" of createUser middleware`);
        //______________
        return next(err);
    };
};

authController.verifyUser = (req, res, next) => {
    try{
        //______________
        console.log(`entered verifyUser middleware`);
        //______________
        const {username, password} = req.body;
        let hashedPassword;
        const query = `SELECT user_login(${username}, ${hashedPassword})`;
        bcrypt.hash(password, 10, (err, hash) => {
            //______________
            console.log(`attempting to hash and salt password in verifyUser middleware`);
            //______________
            if (err) return next(err);
            hashedPassword = hash;
            db.query(query)
            .then(data => {
                //______________
                console.log(`received data from database query in verifyUser middleware`);
                //______________
                if (!data) {
                    // perhaps instead of returning next(err), assign res.locals.userId to null and send it back to front end
                    return next(err);
                }
                // need to send userID back to frontend
                // res.locals.userId = 
                return next();
            })
            .catch((err) => {
                //______________
                console.log(`caught an error in database query in verifyUser middleware`);
                //______________
                return next(err);
            });
        });
    } catch(err) {
        //______________
        console.log(`entered big "catch block" of verifyUser middleware`);
        //______________
        return next(err);
    };
};

// // check with jennifer re: setLocalStorage

// authController.setSSIDCookie = (req, res, next) => {
//     try {
//         const { username } = req.body;
//         const query = `SELECT userLoginInfo(${username})`;
//         db.query(query)
//         .then((data) => {
//             // not sure that there will be a user_id property in data. my thinking is that data should be the full document that holds the input username
//             const { user_id } = data; 
//             res.cookie('ssid', user_id, { httpOnly: true });
//             return next();
//         })
//         .catch((err) => {
//             return next(err);
//         });
//     } catch(err) {
//         return next(err);
//     };
//   }

//   authController.isLoggedIn = (req, res, next) => {
//       try{

//       } catch(err) {
//         return next(err)
//       }
//   }

module.exports = authController;
