import React, { useState } from 'react';
import styled from 'styled-components';
import  { Redirect } from 'react-router-dom'


const StyledSearchForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function SearchForm() {
  const [ ingredients, setIngredients ] = useState();
  const [ mood, setMood ] = useState('');

  // object translating user's input mood to API's predetermined list of categories
  const moodList= {
    'Be basic': "Ordinary Drink",
    'Feel fancy': "Cocktail",
    'Party': "Punch / Party Drink",
    'Be experimental': "Shot",
    'Find something casual': "Cocktail",
    'I don\'t know surprise me': () => {
      console.log('"Surprise me" func initiated');
      const randInt = Math.floor(Math.random()*4);
      const categories = {
        0: "Ordinary Drink",
        1: "Cocktail",
        2: "Punch / Party Drink",
        3: "Shot"
      }
      console.log('result of "surprise me" ->', categories[randInt]);
      return categories[randInt];
    },
  };

  // render all keys in the moodList object as options for the user to select
  const moods = Object.keys(moodList).map((elem, index) => {
    return <option value={elem} key={index.toString()} >{ elem }</option>
  }); 

  // user has input a mood. Turn that into an API accepted category
  // using the above moodList object. Set the result as our
  // "mood" state.
  const assignMood = () => {
    console.log('assignMood invoked');
    setMood(moodList[e.target.value]);
  }

  const handleSubmit = () => {
    console.log('handleSubmit invoked');
    // remove all spaces from the user's ingredients input
    const sendIngredients = ingredients.replace(' ', '');
    console.log('finalized ingredients query string', sendIngredients);

    // query the API via the handleSubmit router, passing in the necessary req.querys
    fetch(`http://localhost:3000/handleSubmit?ingredients=${sendIngredients}&category=${mood}`, (req, res) => {
      console.log('Fetching from API');
      let drinkObj;
      let message;
      // if message, an object will be returned
      if (res.data.drinks.suggestion) message = res.data.drinks.suggestion;
      // otherwise we're recieving an array of objects and want to specify the index we're grabbing
      else drinkObj = res.data.drinks[0];
      console.log('API\'s response', res.data.drinks[0] || res.data.drinks.suggestion);
    })
      // then redirect to the /drink page, passing drinkObj (or message?) as a prop.
      .then(<Redirect
        to={{
          pathname: "/drink",
          state: { drinkObj }
        }}
      />
      );
        
  }

  return (
    <div>
      <StyledSearchForm>
        <h1>So what are we working with?</h1>
        <input type='text' value={ingredients} 
          // set the ingredients state element as the user's input string
          onChange={e => setIngredients(e.target.value)} 
          placeholder='Separate each ingredient with a comma...'  
        />
        <h1>I want to...</h1>
        <select id="moodList" onChange={assignMood} value={mood}>
          { moods }
        </select>
        <input type='submit' value='Submit' onSubmit={handleSubmit} />
      </StyledSearchForm>
    </div>
  )
}

export default SearchForm
