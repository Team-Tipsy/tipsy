import React from 'react'
import Photo from '../Assets/MainPhoto.jpeg';
import styled from 'styled-components';
import MyList from '../Components/MyList.jsx';
import SearchForm from '../Components/SearchForm.jsx';
import DrinkInfo from './DrinkInfo.jsx';
import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx'
import RecipeForm from './RecipeForm.jsx';
import Navigation from './Navigation.jsx';

function MainContainer(props) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 80vh;
    border-bottom: 1px  #6F9283 solid;
    border-left: 1px  #6F9283 solid;
    border-right: 1px  #6F9283 solid;
    margin: 0 80px;
  `;

  const { left, right, drinkObj, userFavs, userRecipes } = props;

  const Image = styled.img`
    border-radius: 300px 300px 0 0;
    width: 350px;
    height: 500px;
  `;
  const LeftContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    border-right: 1px  #6F9283 solid;
    flex: 1;
  `;

  const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
    color: #6F9283;
  `;
  // Logic for switching which components will render on the left
  // Image or My Favorite Drinks
  let Left;
  switch (left) {
    case 'image':
      Left = <Image src={Photo} />
      break;
    case 'drinkImage':
      Left = <Image src={drinkObj.strDrinkThumb} /> // do i need to use 'require'?
      break;
    case 'favorites':
      Left = <MyList title='My Favorite Drinks' userFavs={userFavs}/>
  }

  // Logic for switching which components will render on the right
  let Right;
  switch (right) {
    case 'homepage':
      Right = <SearchForm />
      break;
    case 'drinkInfo':
      Right = <DrinkInfo drinkObj={drinkObj}/>
      break;
    case 'recipes':
      Right = <MyList title='My Favorite Recipes' userRecipes={userRecipes} />
      break;
    case 'signup':
      Right = <SignupForm />
      break;
    case 'login':
      Right = <LoginForm />
      break;
    case 'addRecipe':
      Right = <RecipeForm />
      break;
  };


  return (
    <>
      <Navigation />
      <Wrapper id='main-container'>
        {/* Left Side */}
        <LeftContainer>
          { Left }
        </LeftContainer>

        {/* Right Side */}
        <RightContainer>
          { Right }
        </RightContainer>
      </Wrapper>
    </>
  )
}

export default MainContainer
