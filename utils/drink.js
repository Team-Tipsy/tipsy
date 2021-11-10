// import drinks from local file 
// array of drink objects 
const drinks = require('../drinks.js');

const drinkUtils = {}; 

drinkUtils.getRandomDrink = () => {
    // return random drink from all drinks 
    return drinks[Math.floor(Math.random() * drinks.length)];
}

drinkUtils.pickRandomDrink = (drinks) => {
    // return random drink from array of drinks
    return drinks[Math.floor(Math.random() * drinks.length)];
}

drinkUtils.getDrinksByCategory = (category) => {
    // return random drink from all drinks 
    return drinks.filter(e => e.strCategory === category);
}

drinkUtils.getDrinksByIngredients = (ingredients) => {
    return drinks.filter(d => checkIfDrinkUsesAllIngredients(ingredients, d));
}
drinkUtils.getDrinksByCategoryAndIngredients = (category, ingredients) => {
    let drinks = drinkUtils.getDrinksByCategory(category); 
    return drinks.filter(d => checkIfDrinkUsesAllIngredients(ingredients, d));
}


// input: ingredients (array), drink (object)
// output: true/false if drink uses all ingredients
function checkIfDrinkUsesAllIngredients(ingredients, drink){
    // create map of ingredients 
    let ingredientsMap = new Map()

    // split to array so we can iterate + lowercase to deal with capitalization issues
    ingredients = ingredients.split(',').map(e => e.toLowerCase());
    ingredients.map(e => ingredientsMap.set(e));
    // create map of drink ingredients 
    let drinkIngredientsMap = createDrinkIngredientsMap(drink); 
    // iterate through ingredients
    for(let i=0; i<ingredients.length; i++){
        // if drink contains ingredient 
        if (drinkIngredientsMap.has(ingredients[i])){
            // remove it from the ingredients map
            ingredientsMap.delete(ingredients[i]); 
        }
    }
    return ingredientsMap.size === 0;
}

// input: drink (object)
// output: map containing drink ingredients 
function createDrinkIngredientsMap(drink){
    let drinkMap = new Map(); 

    // convert to lowercase to deal with capitalization issues 
    if (drink.strIngredient1) drinkMap.set(drink.strIngredient1.toLowerCase());
    if (drink.strIngredient2) drinkMap.set(drink.strIngredient2.toLowerCase());
    if (drink.strIngredient3) drinkMap.set(drink.strIngredient3.toLowerCase());
    if (drink.strIngredient4) drinkMap.set(drink.strIngredient4.toLowerCase());
    if (drink.strIngredient5) drinkMap.set(drink.strIngredient5.toLowerCase());
    if (drink.strIngredient6) drinkMap.set(drink.strIngredient6.toLowerCase());
    if (drink.strIngredient7) drinkMap.set(drink.strIngredient7.toLowerCase());
    if (drink.strIngredient8) drinkMap.set(drink.strIngredient8.toLowerCase());
    if (drink.strIngredient9) drinkMap.set(drink.strIngredient9.toLowerCase());
    if (drink.strIngredient10) drinkMap.set(drink.strIngredient10.toLowerCase());
    if (drink.strIngredient11) drinkMap.set(drink.strIngredient11.toLowerCase());
    if (drink.strIngredient12) drinkMap.set(drink.strIngredient12.toLowerCase());
    if (drink.strIngredient13) drinkMap.set(drink.strIngredient13.toLowerCase());
    if (drink.strIngredient14) drinkMap.set(drink.strIngredient14.toLowerCase());
    if (drink.strIngredient15) drinkMap.set(drink.strIngredient15.toLowerCase());

    return drinkMap; 
}


module.exports = drinkUtils;