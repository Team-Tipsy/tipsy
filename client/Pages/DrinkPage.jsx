import React from 'react'
import MainContainer from '../Components/MainContainer.jsx';

function DrinkPage(props) {
  const { drinkObj } = props.location.state; 
  // if drinkObj is empty, make get request to API using the drink name 

  return (
    <div>
      <MainContainer left='drinkImage' drinkObj={drinkObj} right='drinkInfo' />
    </div>
  )
}

export default DrinkPage;