import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

/*
***JSON DRINK OBJECT FORMAT***
obj.strDrink = {drink name};
obj.strInstructions = {instructions};
obj.strIngredient[num] = ingredient
obj.strMeasure[num] = corresponding measurement
*/

function DrinkInfo({ drinkObj }) {
  const id = localStorage.getItem('userId');
  const [fav, setFav] = useState(false);
  // check if DrinkName is in favorites table
  useEffect(() => {
    fetch(`/api/faves/${id}`)
      .then(res => res.json())
      .then(data => {
        for (let elem of data) {
          if (elem == drinkObj.strDrink) setFav(true);
        }
      })
  }, []);
  const drinkName = drinkObj.strDrink;
  const instructions = drinkObj.strInstructions;
  // Must combine strIngredient and strMeasure to popular ingredients array.
  // This is handled below in the while loop
  const ingredients = [];
  
  // ingredient key array
  let ingredientAndMeasureKeys = {
    strIngredient1: drinkObj.strMeasure1,
    strIngredient2: drinkObj.strMeasure2,
    strIngredient3: drinkObj.strMeasure3,
    strIngredient4: drinkObj.strMeasure4,
    strIngredient5: drinkObj.strMeasure5,
    strIngredient6: drinkObj.strMeasure6,
    strIngredient7: drinkObj.strMeasure7,
    strIngredient8: drinkObj.strMeasure8,
    strIngredient9: drinkObj.strMeasure9,
    strIngredient10: drinkObj.strMeasure10,
    strIngredient11: drinkObj.strMeasure11,
    strIngredient12: drinkObj.strMeasure12,
    strIngredient13: drinkObj.strMeasure13,
    strIngredient14: drinkObj.strMeasure14,
    strIngredient15: drinkObj.strMeasure15,
  };

  // create a numerical variable of the current strIngredient
  // let num = 1;

  // while there are still ingredients to be read
  for (let key in ingredientAndMeasureKeys) {
    console.log('for loop entered...');
    // create an array of ingredients and their measurements if applicable
    const ingredient = drinkObj[key];
    if (ingredient === null) break;
    // the following line gets overwritten if there is no corresponding measurement
    let measurement = ':     ';
    // check if the current ingredient has a corresponding measurement
    // (drinkObj.strMeasure`${num}` !== null) ? measurement += drinkObj.strMeasure`${num}` : measurement = '';
    measurement += ingredientAndMeasureKeys[key];
    // push the completed string into the ingredients array
    ingredients.push(`${ingredient}${measurement}`)
  }

  const handleClick = () => {
    if (fav == true) {
      // delete from favs table
      //fetch();
      setFav(false);
    } else {
      // add to favs table
      //fetch();
      setFav(true);
    }
  }

  let heartIcon = (fav == true) ? <AiFillHeart onClick={handleClick} /> : <AiOutlineHeart onClick={handleClick} />;

  return (
    <div className="drink-info" >
      <h1 id="name">
        { drinkName }
        { heartIcon }
      </h1>
      <ul id="measured-ingredients">
        {ingredients.map((entry, index) => {
          return <li id="ingredient-bullet" key={index}>{entry}</li>
        })}
      </ul>
      <p id="instructions">
        {instructions}
      </p>
    </div>
  )
}

export default DrinkInfo
