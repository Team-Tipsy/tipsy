const db = require ('../models/userModels');
const bcrypt = require ('bcryptjs');

const authController = {};

/*_______THIS WAS NOT FULLY IMPLEMENTED, for some reason second query request isn't working.. Good luck!_______*/
/*_______Moved the return next() to the second query_______*/

authController.createUser = async (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    const encrypted = await bcrypt.hash(password, 10);
    const queryAddUser = `INSERT INTO user_login (username, password) VALUES ($1, $2) RETURNING *`;
    const addUserValues = [username, encrypted];

    try {
      const response = await db.query(queryAddUser,addUserValues)
      res.locals.userId = response.rows[0].user_id
      const queryStr = `INSERT INTO users (user_id, first_name, last_name, email) VALUES ('${res.locals.userId}', '${firstName}', '${lastName}', '${email}')`
      db.query(queryStr)
      return next();
    } catch (err){
      console.log(`entered big "catch block" of createUser middleware`);
      return next(err);
    }
    
 
};

/*_______THIS WAS NOT FULLY IMPLEMENTED, it seems like db.query is running before bcrypt.hash finishes running, 
but async or promise chaining is not working _______*/
/*_______Instead of hashing the password, I use bcrypt.compare the stored pw vs the enter pw_______*/

authController.verifyUser = async (req, res, next) => {
    try{
      const {username, password} = req.body;
      const query = `SELECT * FROM user_login WHERE username = '${username}'`
      const resFromDB = await db.query(query)
      if (!resFromDB.rows.length){
        res.status(404)
        return next();
      }
      const user = resFromDB.rows[0]
      const valid = await bcrypt.compare(password,user.password)
      if(!valid){
        res.status(401)
        return next();
      } else {
        res.status(200)
        res.locals.userId = user.userId
        return next();
      }
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
