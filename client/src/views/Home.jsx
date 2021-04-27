import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'

function Home() {
    const [count, setCount] = useState(0)

    return (
      <div>
        <h1>Welcome to Steak N' Eggs</h1>
        <p>Steak N' Eggs restaurant is an all-day diner offering delicious breakfast, lunch, and dinner options
            along with our famous house special, Steak-N-Eggs. <br></br> We welcome you to join us for a fun and inviting 
            dining-in experience or to take advantage of our convenient to-go options giving you the flexibility
            to eat at home, at work, or in one of our breakfast booths!</p>
        <iframe class="iframe" src="https://drive.google.com/file/d/1ASw-2cwNT-fOnb_cZHWlOrWrrUSuyKC_/view"
            frameborder="0"> </iframe>
      </div>
    );
}

export default Home
