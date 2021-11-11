const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const apiKey = 9973533;
const db = require('../models/tipsyModels');

const dranks = {};

// API GET REQUESTS

dranks.handleSubmit = async (req, res, next) => {
  console.log('handleSubmit reached in server');
  const matchedIds = [];
  const matchedDrinkNames = [];
  const matchedDrinks = [];
  const queryMet = [];
  const catCache = {};
  // query the database with the ingredients our user entered on the homepage.
  let myQuery = 'SELECT iddrink, strdrink, strCategory, strdrinkthumb, strinstructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15'
  myQuery += ' FROM cocktails'
  myQuery += ' WHERE (UPPER(strIngredient1)=UPPER($1) OR UPPER(strIngredient2)=UPPER($1) OR UPPER(strIngredient3)=UPPER($1) OR UPPER(strIngredient4)=UPPER($1) OR UPPER(strIngredient5)=UPPER($1) OR UPPER(strIngredient6)=UPPER($1) OR UPPER(strIngredient7)=UPPER($1) OR UPPER(strIngredient8)=UPPER($1) OR UPPER(strIngredient9)=UPPER($1) OR UPPER(strIngredient10)=UPPER($1) OR UPPER(strIngredient11)=UPPER($1) OR UPPER(strIngredient12)=UPPER($1) OR UPPER(strIngredient13)=UPPER($1) OR UPPER(strIngredient14)=UPPER($1) OR UPPER(strIngredient15)=UPPER($1))'
  myQuery += ' AND (UPPER(strCategory)=UPPER($2))'

  let userInput = [req.query.ingredients, req.query.category]
  console.log(userInput)

  // make one db query matching user input
  try {
    console.log('ENTERED QUERY');

    let data = await db.query(myQuery, userInput);
    // console.log('DATA: ', data.rows);
    // if corresponds to user inputted category/mood, fill in matchedIds Array with drinks
    for (let i = 0; i < data.rows.length; i++) {
      matchedIds.push(data.rows[i].iddrink);
      matchedDrinkNames.push(data.rows[i].strdrink);
      matchedDrinks.push(data.rows[i]);
    }
    // once matchedIds has been fully populated
    console.log(matchedDrinkNames);

  } catch (err) {
    return next({
      log: 'Express error handler caught error in handleSubmit, prob with db query',
      status: 500,
      message: { err: `${err}` }
    });
  }

  if (matchedIds.length !== 0) {
    // generate random drink from matchedDrinks and move to next middleware
    res.locals.drinks = matchedDrinks[Math.floor(Math.random() * matchedDrinks.length)];
    console.log('Selected drink: ', res.locals.drinks);
    return next();

  } else {
    // find count of all cocktails that match the users ingredients in each of the 3 other categories/moods
    // check the cache, were any drinks found using the user's ingredients at all?
    const categories = ["Ordinary Drink", "Cocktail", "Punch / Party Drink", "Shot"]
    const otherCategories = categories.splice(categories.indexOf(req.query.category), 1);
    for (let i = 0; i < otherCategories.length; i++) {
      userInput[1] = otherCategories[i];
  
      myQuery = 'SELECT COUNT(iddrink)'
      myQuery += ' FROM cocktails'
      myQuery += ' WHERE (UPPER(strIngredient1)=UPPER($1) OR UPPER(strIngredient2)=UPPER($1) OR UPPER(strIngredient3)=UPPER($1) OR UPPER(strIngredient4)=UPPER($1) OR UPPER(strIngredient5)=UPPER($1) OR UPPER(strIngredient6)=UPPER($1) OR UPPER(strIngredient7)=UPPER($1) OR UPPER(strIngredient8)=UPPER($1) OR UPPER(strIngredient9)=UPPER($1) OR UPPER(strIngredient10)=UPPER($1) OR UPPER(strIngredient11)=UPPER($1) OR UPPER(strIngredient12)=UPPER($1) OR UPPER(strIngredient13)=UPPER($1) OR UPPER(strIngredient14)=UPPER($1) OR UPPER(strIngredient15)=UPPER($1))'
      myQuery += ' AND (UPPER(strCategory)=UPPER($2))'
  
      try {
        console.log('ENTERED QUERY');
        let data = await db.query(myQuery, userInput);
        console.log('DATA: ', data.rows);
        // store the category in a cache and log that category's appearance frequency
        catCache[userInput[1]] = data.rows;
      } catch (err) {
        return next(err);
      }
    }
    console.log('Reached out of query for loop')

    // Find which of the 3 other categories have the most drinks with user ingredients
    const catKeys = Object.keys(catCache);
    let max = 0;
    let response;
    for (key in catKeys) {
      if (catCache[key] > max) {
        max = catCache[key];
        response = key;
      }
    }
    // suggest the user switch their mood to the most frequent category appearance returned by the ingredients query.
    if (response) {
      res.locals.drinks = {suggestion: `Sorry, no drinks with those ingredients fit your mood.\n But if you were feeling ${response} then we found some recipes for you!`};
      return next();
    } else {
      // if no drinks were found using their ingredients
      // assign a null object to res.locals for the front end to interpet
      res.locals.drinks = {suggestion: "We're sorry, no drinks using all of those ingredients were found. Try modifying your search."};
      // and continue the middleware chain
      return next();
    }
  }
 




  // if no cocktails match user inputted ingredients and cateogries

  // fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/filter.php?i=${req.query.ingredients}`)
  //     .then(data => data.json())
  //     .then(async (data) => {
  //       // the api returns an array if any drinks are found
  //       // for every drink the query returns
  //       if (data.drinks !== 'None Found') {
  //         for (drink of data.drinks) {
  //           // grab the drink's id and push to an array
  //           //matchedIds.push(data.drinks[drink].idDrink);
  //           matchedIds.push(drink.idDrink);
  //         }
  //       }
  //       // once matchedIds has been fully populated
  //       for (let i = 0; i < matchedIds.length; i++) {
  //         // check the api entry of each drink returned by the ingredients query
  //         await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${matchedIds[i]}`)
  //         .then(data => data.json())
  //         .then(data => {
  //           // if the current drink's category matches the category corresponding to the user's input mood
  //           //console.log(data);
  //           if (data.drinks[0].strCategory === req.query.category) {
  //             // push that drink object into an array
  //             queryMet.push(data.drinks[0]);
  //             //  { res.locals.drink = data.drinks[0];
  //             // return next(); } <-- & ^ code we might still need
  //           } else {
  //             // otherwise, store the category in a cache and log that category's appearance frequency
  //             catCache[data.drinks[0].strCategory] ? catCache[data.drinks[0].strCategory] += 1 : catCache[data.drinks[0].strCategory] = 1;
  //           }
  //         })
  //       }
  //       // if the query returned no strict results
  //       if (queryMet.length === 0) {
  //         // check the cache, were any drinks found using the user's ingredients at all?
  //         console.log('Reached queryMet.length = 0')
  //         const catKeys = Object.keys(catCache);
  //         let max = 0;
  //         let response;
  //         for (key in catKeys) {
  //           if (catCache[key] > max) {
  //             max = catCache[key];
  //             response = key;
  //           }
  //         }
  //         // if so, suggest the user switch their mood to the most frequent category appearance returned by the ingredients query.
  //         if (response) {
  //           res.locals.drinks = {suggestion: `Sorry, no drinks with those ingredients fit your mood.\n But if you were feeling ${response} then we found some recipes for you!`};
  //           return next();
  //         } else {
  //           // if no drinks were found using their ingredients
  //           // assign a null object to res.locals for the front end to interpet
  //           res.locals.drinks = {suggestion: "We're sorry, no drinks using all of those ingredients were found. Try modifying your search."};
  //           // and continue the middleware chain
  //           next();
  //         }
  //       } else {
  //         // if the query DID return results, assign them to res.locals
  //         res.locals.drinks = queryMet;
  //         console.log('RES LOCALS: ', res.locals.drinks);
  //         // and continue the middleware chain
  //         next();
  //       }
  //     })
  //     // catch any errors that may occur and send to the universal error handler
  //     .catch((err) => next({
  //       log: 'Express error handler caught error in handleSubmit',
  //       status: 500,
  //       message: { err: `${err}` },
  //     }));
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
