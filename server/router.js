const express = require('express');

const dranksController = require('./dranksController');

const router = express.Router();

router.get('/placeholderforByName',
dranksController.getByName,
  (req, res) => res.status(200).json(res.locals.drinks)
);

router.get('/placeholderforByIngredients',
dranksController.getByIngredients,
  (req, res) => res.status(200).json(res.locals.drinks)
);

router.get('/placeholderforRandom',
dranksController.getRandom,
  (req, res) => res.status(200).json(res.locals.randomDrink)
);

router.get('/placeholderforPopular',
dranksController.getPopular,
  (req, res) => res.status(200).json(res.locals.popular)
);

router.get('/placeholderforCategory',
dranksController.getByCategory,
  (req, res) => res.status(200).json(res.locals.drinks)
);

router.get('/placeholderforGlass',
dranksController.getByGlass,
  (req, res) => res.status(200).json(res.locals.drinks)
);

module.exports = router;
