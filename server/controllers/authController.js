const db = require ('../models/userModels');
const bcrypt = require ('bcryptjs');

const authController = {};

/*_______THIS WAS NOT FULLY IMPLEMENTED, for some reason second query request isn't working.. Good luck!_______*/
authController.createUser = (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    const queryStr = `INSERT INTO users (first_name, last_name, email) VALUES ('${firstName}', '${lastName}', '${email}') RETURNING user_id`;
    const hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    db.query(queryStr)
      .then((data) => {
        console.log(data.rows[0].user_id);
        res.locals.userId = data.rows[0].user_id;
        return next();
      }).then(() => {
        db.query(`INSERT INTO user_login(user_id username, password) VALUES (${res.locals.userId}, '${username}', ${hash})`);
      })
      .catch((err) => {
        return next({
          message: err.message,
          log: 'error in hhhh middleware',
        });
      });
};

/*_______THIS WAS NOT FULLY IMPLEMENTED, it seems like db.query is running before bcrypt.hash finishes running, 
but async or promise chaining is not working _______*/
authController.verifyUser = (req, res, next) => {
    try{
        const {username, password} = req.body;
        const hash = bcrypt.hash(password, 10);
        db.query(`SELECT username, password FROM user_login WHERE username = '${username}' AND password = '${hash}'`)
        .then(data => {
            console.log(`data.userId ===`, data.userId);
            if (!data) res.locals.userId = null;
            else res.locals.userId = data.userId;
            console.log(`res.locals.userId === `, res.locals.userId)
            return next();
        })
        .catch((err) => {
            //______________
            console.log(`caught an error in database query in verifyUser middleware`);
            //______________
            return next(err);
        });
    } catch(err) {
        //______________
        console.log(`entered big "catch block" of verifyUser middleware`);
        //______________
        return next(err);
    };
};


//_______THIS WAS NOT IMPLEMENTED, BUT MAY BE USEFUL AS A STARTING POINT FOR SSID COOKIES _______
// authController.setSSIDCookie = (req, res, next) => {
//     try {
//         const { username } = req.body;
//         const query = `SELECT userLoginInfo(${username})`;
//         db.query(query)
//         .then((data) => {
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
