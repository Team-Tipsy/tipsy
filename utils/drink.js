// import drinks from local file 
// array of drink objects 
const drinks = require('../drinks.js');

const drinkUtils = {}; 

drinkUtils.getRandomDrink = () => {
    // return random drink from all drinks 
    return drinks[Math.floor(Math.random() * drinks.length)];
}

drinkUtils.getDrinksByCategory = (category) => {
    // return random drink from all drinks 
    console.log(drinks.filter(e => e.strCategory === category));
    return drinks.filter(e => e.strCategory === category);
}


module.exports = drinkUtils;