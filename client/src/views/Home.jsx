import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Home.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="Home">
      <header className="Home-header">
      <l href="Steak N' Eggs" class="active">Steak N' Eggs</l> 
      <a href="home" class="active">Home</a>
      <a href="menu" class="active">Menu</a>
      <a href="order-online" class="active">Order-Online</a>
      <a href="rewards" class="active">Rewards</a>
      <a href="checkout" class="active">Checkout</a>
      <a href="about" class="active">About</a>
      <a href="contact" class="active">Contact</a>
      </header>
    </div>

    

  )
}

export default Home
