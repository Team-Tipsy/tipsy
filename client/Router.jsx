import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './Pages/App.jsx';
import RecipePage from './Pages/RecipePage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import DrinkPage from './Pages/DrinkPage.jsx';
import MyDrinksPage from './Pages/MyDrinksPage.jsx';

const Router = () => (
  <div>
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/drink" component={DrinkPage} />
      <Route path="/addrecipe" component={RecipePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/mydrinks" component={MyDrinksPage} />
    </Switch>
    </BrowserRouter>
  </div>
)

export default Router;  