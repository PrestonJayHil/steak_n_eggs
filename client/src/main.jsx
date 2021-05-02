import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import './index.css'
import Home from './views/Home'
import Menu from './views/Menu'
import Order from './views/Order'
import Rewards from './views/Rewards'
import Checkout from './views/Checkout'
import Contact from './views/Contact'
import About from './views/About'

function Nav() {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
  } = useAuth0();

  return (
    <header className="Home-header">
      <nav className="Home-nav">
        <Link className="Nav-link" to="/">Steak N' Eggs</Link>
        <Link className="Nav-link" to="home">Home</Link>
        <Link className="Nav-link" to="menu">Menu</Link>
        <Link className="Nav-link" to="order">Order-online</Link>
        <Link className="Nav-link" to="rewards">Rewards</Link>
        <Link className="Nav-link" to="checkout">Checkout</Link>
        <Link className="Nav-link" to="about">About</Link>
        <Link className="Nav-link" to="contact">Contact</Link>
      </nav>
      {
        isAuthenticated ?
        <button
          className="login-btn"
          onClick={logout}
        >
          Log Out
        </button>
        :
        <button
          className="login-btn"
          onClick={loginWithRedirect}
        >
          Log In
        </button>
      }

    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="Home">
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
        >
          <Nav />
          <Switch>
            <Route path="/menu"><Menu /></Route>
            <Route path="/order"><Order /></Route>
            <Route path="/rewards"><Rewards /></Route>
            <Route path="/checkout"><Checkout /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/"><Home /></Route>
            {/* <Route><NotFound /></Route> */}
          </Switch>
        </Auth0Provider>
      </div>

      <div className="Body">
        <h2>Welcome to our restaurant!</h2>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
