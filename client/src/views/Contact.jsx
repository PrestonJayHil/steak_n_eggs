import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'
import contact from '../assets/jpeg/contact.jpg'

function Contact() {
  const [count, setCount] = useState(0)

 return (
  <div class="flex-container">
      <div class="flex-child">
        <div>
          <img src={contact} alt=""/>
        </div>
      </div>

    <div class="flex-child">
      <div className="contact-context-1">
        <p> Contact Us</p>
      </div>
      <div className = "contact-context-2">
      <p> Did you enjoy your visit? Tell your friends about us! </p>
      <p> If you didn't enjoy your visit... tell your enemies! </p>
      <p> We'd also love to hear from you about your experience. </p>
      <p> Please leave us a review online or send an email to one of us</p>
      <p> </p>
      <p> Restaurant owner: Stephen </p>
      <p> General Managers: Preston, Noah, and Adara </p>
      </div>
    </div>
    </div>
    );
}

export default Contact
