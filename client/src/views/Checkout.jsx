import React, { useState } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'

function Checkout() {

  const checkoutList = JSON.parse(localStorage.getItem("checkoutItems")) || []
  const [count, setCount] = useState(0)
  
console.log(checkoutList)



// button to remove items from cart
const handleRemove = (item) => {
setCheckoutItems(old => [...old, item]) 
localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
alert(`${item.item_title} added to chekout`)
}


// function to calculate totalprice in cart 
const totalPrice = (checkoutList, item_price) => {
  
}


// another function for checkout (checkout should wipe entire cart)

if(checkoutList.length < 1){
  return <h2>No checkouts available</h2>
}
else{
  return (
  <div className="cart-header">
  <section className="cart-style">
    <h1>Your Cart:</h1>
    {
      checkoutList.map(item => (
        <div>
              <p>{item.item_title}</p>
              <p>{item.item_price}</p>           
              <button onClick={() => handleRemove(item)}>Remove</button>
        </div>
      ))
    }
  </section>
  <section className="cart-header-border2">
    <p>Total Items in Cart: {checkoutList.length}</p>
    <p>Subtotal: {checkoutList.item_price} </p>
  </section>
  </div>
  )
}
}

export default Checkout


