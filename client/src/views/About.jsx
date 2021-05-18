import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'
import about from '../assets/jpeg/about.jpg'

function About() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <h1 style={{textAlign: 'center'}}> About </h1>
    <p style={{textAlign: 'left', fontSize:'20px', paddingLeft: '220px'}}>Steak N' Eggs was founded in 2021 by hungry college students Stephen, Preston, Noah, and Adara. <br></br>
        Since most mornings began with zoom classes, there was not always enough time to get a healthy and fulfilling breakfast.<br></br>
        Seeking to make a change, the four began planning, and Steak N' Eggs was born.<br></br>
        The idea that a takeaway restaurant could increase health, happiness, and alertness seemed crazy at first, <br>
        </br>but studies have shown that less than 44% of Americans eat breakfast, 
        <br></br> despite 93% saying it was the most important meal of the day.<br></br>
        Steak N' Eggs seeks to offer a quick and convenient breakfast, lunch, or dinner option for everyone 
        <br></br>and has since expanded into the traditional dine-in restaurant style to enhance customer experience.<br></br>
        </p>
      <div>
        <center>
          <img src={about} 
          alt="photo of steak and eggs" 
          width="500" 
          height="300"
          textAlign= "center"
           />
        </center>
      </div>
  </div>
  );
}

export default About
