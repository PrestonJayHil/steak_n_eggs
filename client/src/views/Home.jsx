import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'
import home from '../assets/jpeg/home.jpg'

function Home() {
  
    const [count, setCount] = useState(0)

    return (
      <div class="flex-container">
      <div class="flex-child">
        <div>
        <img src={home} alt="" width="500px" height="800px"/>
        </div>
      </div>
      <div class="flex-child">
        <div className="home-context-1">
        <p>Welcome to Steak N' Eggs.</p>
        </div>
        <div className="home-context-2">
        <h1>  </h1>
        <h1>  </h1>
        <h1>  </h1>
        <p> Steak N' Eggs restaurant is an all-day</p>
        <p> diner offering delicious breakfast, lunch, and dinner options </p>  
        <p> along with our famous house special, Steak-N-Eggs.</p>
        <p> We welcome you to join us for a fun and inviting dining-in 
        <p> experience or to take advantage of our convenient to-go</p>
        <p> options giving you the flexibility to eat at home,  </p> 
        <p>at work, or in one of our breakfast booths!</p>
        </p>
        </div>
      </div>
    </div>
    );
}
export default Home
