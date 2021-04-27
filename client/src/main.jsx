import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom'
import './index.css'
import Home from './views/Home'
import Menu from './views/Menu'
import Order from './views/Order'
import Rewards from './views/Rewards'
import Checkout from './views/Checkout'
import Contact from './views/Contact'
import About from './views/About'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="Home">
      <header className="Home-header">
      <l href="Steak N' Eggs" class="active">Steak N' Eggs</l> 
      <a href="home" class="active">Home</a>
      <a href="menu" class="active">Menu</a>
      <a href="order" class="active">Order-online</a>
      <a href="rewards" class="active">Rewards</a>
      <a href="checkout" class="active">Checkout</a>
      <a href="about" class="active">About</a>
      <a href="contact" class="active">Contact</a>
      </header>
      <Switch>
        {<Route path="/menu"><Menu /></Route>}
        {<Route path="/order"><Order /></Route>}
        {<Route path="/rewards"><Rewards /></Route>}
        {<Route path="/checkout"><Checkout /></Route>}
        {<Route path="/contact"><Contact /></Route>}
        {<Route path="/about"><About /></Route>}
        <Route path="/"><Home /></Route>
        {/* <Route><NotFound /></Route> */}
      </Switch>
      </div>

    <div className="Body">
      <h2>Welcome to our restaurant!</h2>
      </div> 

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)