import React, { useState } from 'react';
import styled from 'styled-components';
import  { Redirect, useHistory } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// ReactDom.render()

const StyledSearchForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function SearchForm() {
  let history = useHistory();
  const [ ingredients, setIngredients ] = useState('');
  const [ mood, setMood ] = useState('');

  // object translating user's input mood to API's predetermined list of categories
  const moodList= {
    'Select a mood': 'Placeholder',
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
    if (elem === 'Select a mood') {
      return <option id='select' value='' key={index.toString()} >{ elem }</option>
    }
    return <option id={`mood${index}`} value={elem} key={index.toString()} >{ elem }</option>
  }); 

  // user has input a mood. Turn that into an API accepted category
  // using the above moodList object. Set the result as our
  // "mood" state.
  const assignMood = (e) => {
    console.log('assignMood invoked');
    console.log(e.target.value);
    setMood(moodList[e.target.value]);
  }

  const handleSubmit = () => {
    // remove all spaces from the user's ingredients input
    const sendIngredients = ingredients.replace(' ', '');
    console.log('finalized ingredients query string', sendIngredients);
    console.log('mood: ', mood)
    let drinkObj;
    let message;

    // query the API via the handleSubmit router, passing in the necessary req.querys
    fetch(`/api/handleSubmit?ingredients=${sendIngredients}&category=${mood}`)
      .then(res => res.json())
      .then(data => {
        if (data.suggestion) message = data.suggestion;
        drinkObj = data[0];
        // console.log('API\'s response', drinkObj || message);
      })
      // then redirect to the /drink page, passing drinkObj (or message?) as a prop.
      .then(() => {
        if (drinkObj) {
          // ReactDOM.render(<Redirect
          //   to={{
          //     pathname: "/drink",
          //     state: { drinkObj }
          //   }}
          //   />, document.getElementById('root')); 
          history.push({
            pathname: '/drink',
            state: {
              drinkObj
            }
          })
        } else {
          console.log(message);
        }
      }
      )
      .catch((err) => console.log(err));
        
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
        <select id="moodList" onChange={assignMood} >
          { moods }
        </select>
        <input type='submit' value='Submit' onClick={handleSubmit} />
      </StyledSearchForm>
    </div>
  )
}

export default SearchForm
