import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'

function Contact() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <h2>Contact Us</h2>
    <p>Did you enjoy your visit? Tell your friends about us! <br></br>
    If you didn't enjoy your visit... tell your enemies! <br></br>
       <br></br>
       <br></br>
       We'd also love to hear from you about your experience. Please leave us a review online or send us an email.
       <br></br>
       Restaurant owner: Stephen <br></br>
       General Managers: Preston, Noah, and Adara <br></br> </p>
  </div>
  )
}

export default Contact
