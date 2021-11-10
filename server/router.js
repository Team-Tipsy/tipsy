const express = require('express');

const dranksController = require('./controllers/dranksController');

const authController = require('./controllers/authController');

const router = express.Router();

// ALL API GET REQUESTS

/*_______ROUTES TO /signup AND /login WERE COMMENTED OUT BECAUSE AUTHCONTROLLER FUNCTIONALITY IS NOT FINALIZED _______*/
router.post('/signup', 
authController.createUser,
    (req, res) => res.status(200).send("nothing"));

router.post('/login',
authController.verifyUser,
    (req, res) => res.status(200).json(res.locals.userId)); 

// router for main user submit function
router.get('/handleSubmit',
  dranksController.handleSubmit2,
  (req, res) => res.status(200).send(res.locals.drinks)
);

// routers for stretch goals (popular and I'm feeling lucky)
router.get('/placeholderforPopular',
dranksController.getPopular,
  (req, res) => res.status(200).json(res.locals.popular)
);

router.get('/placeholderforRandom',
dranksController.getRandom,
  (req, res) => res.status(200).json(res.locals.randomDrink)
);

// unused routers for other API functions in case we 
// end up wanting to use them
router.get('/placeholderforByName',
dranksController.getByName,
  (req, res) => res.status(200).json(res.locals.drinks)
);

router.get('/placeholderforByIngredients',
dranksController.getByIngredients,
  (req, res) => res.status(200).json(res.locals.drinks)
);

router.get('/placeholderforCategory',
dranksController.getByCategory,
  (req, res) => res.status(200).json(res.locals.drinks)
);

router.get('/placeholderforGlass',
dranksController.getByGlass,
  (req, res) => res.status(200).json(res.locals.drinks)
);
// END API GET REQUESTS

module.exports = router;
