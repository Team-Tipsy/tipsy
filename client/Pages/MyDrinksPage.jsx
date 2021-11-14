import React, { useEffect, useState } from 'react'
import MainContainer from '../Components/MainContainer.jsx';

function MyDrinksPage(props) {
  // the above might not make it necessary to have the userId state below
  // const [ userId, setUserId ] = useState(0);
  const [ userFavs, setUserFavs ] = useState([]);
  const [ userRecipes, setUserRecipes ] = useState([]);

  // similar to ComponentDidMount
  useEffect(() => {
    // getting user Id from local storage
    const id = JSON.parse(localStorage.getItem('userId'));
    // setUserId(id);
    fetch(`/api/faves/${id}`) // this is req.params
      .then(response => response.json())
      .then(data => {
        console.log('user favs from server', data);
        setUserFavs(data);
      })

    fetch(`/api/recipes/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('FETCH user recipes from server', data);
        setUserRecipes(data);
      })
  }, []);
  console.log('RETURN')
  return (
    <div>
      <MainContainer left='favorites' right='recipes' userFavs={userFavs} userRecipes={userRecipes} />
    </div>
  )
}

export default MyDrinksPage;
