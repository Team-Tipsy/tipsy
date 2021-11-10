const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const apiKey = 9973533;

// import drink utils to get drinks from local file
const drinkUtils = require('../../utils/drink.js');
const { resourceLimits } = require('worker_threads');

const dranks = {};

// API GET REQUESTS

dranks.handleSubmit2 = (req, res, next) => {
  try{
    console.log('handleSubmit2 reached in server');

    // CASE 1: No category, no ingredients --> return random drink 
    if (req.query.ingredients === '' && req.query.category === ''){
      console.log('case 1');
      // get random drink
      let drink = drinkUtils.getRandomDrink(); 
      res.locals.drinks = [drink]; 
      return next(); 
    }

    // CASE 2: Only category 
    if (req.query.ingredients === '' && req.query.category.length > 0){
      console.log('case 2'); 
      let drinks = drinkUtils.getDrinksByCategory(req.query.category);
      // grab random drink, return it inside array because that's what the 
      // frontend is expecting 
      res.locals.drinks = [drinkUtils.pickRandomDrink(drinks)];
      return next();
    }

    // CASE 3: Only ingredients 
    if (req.query.ingredients.length > 0 && req.query.category === '') {
      console.log('case 3');
      let drinks = drinkUtils.getDrinksByIngredients(req.query.ingredients);
      // grab random drink, return it inside array becayse that's what the 
      // frontend is expecting 
      res.locals.drinks = [drinkUtils.pickRandomDrink(drinks)];
      return next();
    }

    // CASE 4: Both ingredients + category
    if (req.query.ingredients.length > 0 && req.query.category.length > 0) {
      let drinks = drinkUtils.getDrinksByCategoryAndIngredients(req.query.category, req.query.ingredients);
      console.log(drinks); 
      console.log('case 4');
      res.locals.drinks = [drinkUtils.pickRandomDrink(drinks)];
      return next(); 
    }

    return next(); 

  } catch(error){
    return next(error);
  }
}


dranks.handleSubmit = (req, res, next) => {
  console.log('handleSubmit reached in server');
  const ids = [];
  const queryMet = [];
  const catCache = {};
  // query the API with the ingredients our user entered on the homepage.
  fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/filter.php?i=${req.query.ingredients}`)
      .then(data => data.json())
      .then(async (data) => {
        // the api returns an array if any drinks are found
        // for every drink the query returns
        if (data.drinks !== 'None Found') {
          for (drink of data.drinks) {
            // grab the drink's id and push to an array
            //ids.push(data.drinks[drink].idDrink);
            ids.push(drink.idDrink);
          }
        }
        // once ids has been fully populated
        for (let i = 0; i < ids.length; i++) {
          // check the api entry of each drink returned by the ingredients query
          await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ids[i]}`)
          .then(data => data.json())
          .then(data => {
            // if the current drink's category matches the category corresponding to the user's input mood
            //console.log(data);
            if (data.drinks[0].strCategory === req.query.category) {
              // push that drink object into an array
              queryMet.push(data.drinks[0]);
              //  { res.locals.drink = data.drinks[0];
              // return next(); } <-- & ^ code we might still need
            } else {
              // otherwise, store the category in a cache and log that category's appearance frequency
              catCache[data.drinks[0].strCategory] ? catCache[data.drinks[0].strCategory] += 1 : catCache[data.drinks[0].strCategory] = 1;
            }
          })
        }
        // if the query returned no strict results
        if (queryMet.length === 0) {
          // check the cache, were any drinks found using the user's ingredients at all?
          console.log('Reached queryMet.length = 0')
          const catKeys = Object.keys(catCache);
          let max = 0;
          let response;
          for (key in catKeys) {
            if (catCache[key] > max) {
              max = catCache[key];
              response = key;
            }
          }
          // if so, suggest the user switch their mood to the most frequent category appearance returned by the ingredients query.
          if (response) {
            res.locals.drinks = {suggestion: `Sorry, no drinks with those ingredients fit your mood.\n But if you were feeling ${response} then we found some recipes for you!`};
            return next();
          } else {
            // if no drinks were found using their ingredients
            // assign a null object to res.locals for the front end to interpet
            res.locals.drinks = {suggestion: "We're sorry, no drinks using all of those ingredients were found. Try modifying your search."};
            // and continue the middleware chain
            next();
          }
        } else {
          // if the query DID return results, assign them to res.locals
          res.locals.drinks = queryMet;
          console.log(res.locals.drinks);
          // and continue the middleware chain
          next();
        }
      })
      // catch any errors that may occur and send to the universal error handler
      .catch((err) => next({
        log: 'Express error handler caught error in handleSubmit',
        status: 500,
        message: { err: `${err}` },
      }));
}

dranks.getRandom = (req, res, next) => {
  // returns one drink at random...she's so easy. Love her.
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php') 
      .then(data => data.json())
      .then(data => {
        res.locals.randomDrink = data;
        next();
      })
      .catch((err) => next({
        log: 'Express error handler caught error in getRandom',
        status: 500,
        message: { err: `${err}` },
      }));
}

dranks.getPopular = (req, res, next) => {
  // returns the 20 most popular drinks in the databse
    fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/popular.php`)
      .then(data => data.json())
      .then(data => {
        res.locals.popular = data;
        next();
      })
      .catch((err) => next({
        log: 'Express error handler caught error in getPopular',
        status: 500,
        message: { err: `${err}` },
      }));
}




// =============================CURRENTLY UNUSED MIDDLEWARE=============================

dranks.getByIngredients = (req, res, next) => {
  // if searching by multiple ingredients, they are seperated by a commma with no spaces or underscoring.
  // ingredients that have multiple words seperate the words by underscore (i.e. Dry_Vermouth)
    fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/filter.php?i=${req.params.ingredients}`)
      .then(data => data.json())
      .then(data => {
        res.locals.drinks = data;
        next();
      })
      .catch((err) => next({
        log: 'Express error handler caught error in getByIngredients',
        status: 500,
        message: { err: `${err}` },
      }));
}

dranks.getByName = (req, res, next) => {
  // will reurn all drinks with the search query in the name
  // i.e. searching 'margarita' returns all cocktails with the word margarita in them
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`)
      .then(data => data.json())
      .then(data => {
        res.locals.drinks = data;
        next();
      })
      .catch((err) => next({
        log: 'Express error handler caught error in getByName',
        status: 500,
        message: { err: `${err}` },
      }));
}

dranks.getByCategory = (req, res, next) => {
  // returns all drinks in a certain category
  // view list of possible categories here: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.cat}`)
      .then(data => data.json())
      .then(data => {
        res.locals.drinks = data;
        next();
      })
      .catch((err) => next({
        log: 'Express error handler caught error in getByCategory',
        status: 500,
        message: { err: `${err}` },
      }));
}

dranks.getByGlass = (req, res, next) => {
  // returns all drinks traditionally served in the searched glass
  // view list of possible glasses here: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list'
  // this is a stretch goal but it's readily available for if/when we want it
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${req.params.glass}`)
      .then(data => data.json())
      .then(data => {
        res.locals.drinks = data;
        next();
      })
      .catch((err) => next({
        log: 'Express error handler caught error in getByGlass',
        status: 500,
        message: { err: `${err}` },
      }));
}
// END API GET REQUESTS

module.exports = dranks;
