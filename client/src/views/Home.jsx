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
             <img src={home} alt="" className="justify-content-left" width="500px" height="800px" buffer="-20px"/>
          </div>
      </div>
      <div class="flex-child">
        <div className="home-context-1">
         <p>Steak N' Eggs</p>
        </div>
        <div className="home-context-2">
          <p>Order online now!</p>
        <div className="home-context-3">
          <p> Steak N' Eggs restaurant is an all-day diner</p>
          <p> offering delicious breakfast, lunch, and dinner options </p>  
          <p> along with our famous house special, Steak-N-Eggs.</p>
          <p> We welcome you to join us for a fun and inviting 
          <p> dining-in experience or to take advantage </p>
          <p> of our convenient to-go options giving you   </p> 
          <p> the flexibility to eat at home, at work, </p>
          <p> or in one of our breakfast booths!</p>
          </p>
        </div>
      </div>
    </div>
    </div>
    );
}
export default Home
