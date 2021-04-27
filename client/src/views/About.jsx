import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'

function About() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <h2>About</h2>
    <p style={{textAlign: 'left'}}>Steak N' Eggs was founded in 2021 by hungry college students Stephen, Preston, Noah, and Adara. <br></br>
        Since most mornings began with zoom classes, there was not always enough time to get a healthy and fulfilling breakfast.<br></br>
        Seeking to make a change, the four began planning, and Steak N' Eggs was born.<br></br>
        The idea that a takeaway restaurant could increase health, happiness, and alertness seemed crazy at first, but studies
        have shown that less than 44% of Americans eat breakfast despite 93% saying it was the most important meal of the day.<br></br>
        Steak N' Eggs seeks to offer a quick and convenient breakfast, lunch, or dinner option for everyone and has since expanded into
        the traditional dine-in restaurant style to enhance customer experience.<br></br>
        </p>
  </div>
  )
}

export default About
