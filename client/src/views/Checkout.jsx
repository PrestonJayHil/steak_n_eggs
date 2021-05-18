import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react'
// import logo from '../assets/svg/logo.svg'
import './Styles.css'

function Checkout() {
  const checkoutList = JSON.parse(localStorage.getItem("checkoutItems")) || []
  const [checkoutItems, setCheckoutItems] = useState(checkoutList)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const checkout = async () => {
    if (!isAuthenticated) {
      return alert("Log in to checkout");
    }

    try {
      const body = JSON.stringify(checkoutItems.reduce((acc, item) => {
        const { item_id } = item;
        if (!acc[item_id]) {
          acc[item_id] = 1;
        } else {
          acc[item_id] += 1;
        }
        return acc;
      }, {}));
      const token = await getAccessTokenSilently({
        audience: 'http://localhost:8082'
      });
      const req = new Request('http://localhost:8082/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      });
      const resp = await fetch(req);
      if (resp.ok) {
        setCheckoutItems([]);
        // TODO: implement order page (blocked by API)
        // const { order_id } = await resp.json();
        // history.pushState(`/orders/${order_id}`);
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
  }, [checkoutItems])




// button to remove items from cart
const handleRemove = (item) => {
  const removeIdx = Array
                .from(checkoutItems)
                .findIndex(({ item_id }) => (item_id === item.item_id));
  if (removeIdx !== -1) {
    setCheckoutItems(checkoutItems.filter((_, itemIdx) => (itemIdx !== removeIdx)))
  }
}


// function to calculate totalprice in cart 
const totalPrice = checkoutItems.reduce((sum, item) => {
  const price = parseFloat(item.item_price.replaceAll(/\$/g, ''));
  if (!(Object.is(price, NaN))) {
    sum += price;
  }
  return sum;
}, 0);


// another function for checkout (checkout should wipe entire cart)

if(checkoutItems.length < 1){
  return <h2>No checkouts available</h2>
}
else{
  return (
  <div className="cart-header">
  <section className="cart-style">
    <h1>Your Cart:</h1>
    {
      checkoutItems.map(item => (
        <div>
              <p>{item.item_title}</p>
              <p>{item.item_price}</p>           
              <button onClick={() => handleRemove(item)}>Remove</button>
        </div>
      ))
    }
  </section>
  <section className="cart-header-border2">
    <p>Total Items in Cart: {checkoutItems.length}</p>
    <p>Subtotal: ${totalPrice} </p>
  </section>
  <button onClick={checkout}>
    Checkout
  </button>
  </div>
  )
}
}

export default Checkout


