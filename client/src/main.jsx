import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom'
import './index.css'
import Home from './views/Home'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {/* <Route path="/menu"><Menu /></Route> */}
        {/* <Route path="/rewards"><Rewards /></Route> */}
        {/* <Route path="/checkout"><Checkout /></Route> */}
        {/* <Route path="/contact"><Contact /></Route> */}
        {/* <Route path="/about"><About /></Route> */}
        <Route path="/"><Home /></Route>
        {/* <Route><NotFound /></Route> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
