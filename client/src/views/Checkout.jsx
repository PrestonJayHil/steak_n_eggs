import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'

function Checkout() {

  const checkoutList = JSON.parse(localStorage.getItem("checkoutItems")) || []

  const [count, setCount] = useState(0)
  
console.log(checkoutList)

if(checkoutList.length < 1){
  return <h2>No checkouts available</h2>
}
else{
  return (
  <div>
    <h2>Checkout Page</h2>
    {
      checkoutList.map(item => (
        <div>
              <p>Title: {item.item_title}</p>
              <p>{item.item_price}</p>           
              <button>remove from cart</button>
          </div>
      ))
    }
  </div>
  )
}
}

export default Checkout


