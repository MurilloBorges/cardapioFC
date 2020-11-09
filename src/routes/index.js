/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { isAuthenticated } from '../services/authentication';

// Pages
import Error from '../pages/404';
import BuscaCep from '../pages/BuscaCep';
import Categories from '../pages/Categories';
import Drinks from '../pages/Drinks';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={
      (props) => (isAuthenticated() ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />))
    }
  />
);

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/404" exact component={Error} />
        <Route path="/" exact component={Categories} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/drinks" exact component={Drinks} />
        <PrivateRoute path="/busca-cep" exact component={BuscaCep} />

        {/* Página not found */}
        <Route path="*" exact component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
