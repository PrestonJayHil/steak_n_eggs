import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
// import logo from '../assets/svg/logo.svg'

import MenuItem from '../components/MenuItem.jsx';
import './Styles.css'



function Order() {



  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [count, setCount] = useState(0)

  const [menus, setMenu] = useState([]);
  const [items, setItems] = useState({});
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [loading, setLoading] = useState(menus.length === 0);



  const checkoutList = JSON.parse(localStorage.getItem("checkoutItems"))  || []
  const [checkoutItems, setCheckoutItems] = useState(checkoutList)
console.log(checkoutItems, "<===== checkout")

useEffect(() => {
  localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));     
}, [checkoutItems])


  const handleCheckout = (item) => {
       setCheckoutItems(old => [...old, item]) 
       localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
       alert(`${item.item_title} added to chekout`)
  }

  const checkout = async () => {
    if (!isAuthenticated) {
      // TODO: redirect to login or signup?
      // history.push()
      return;
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
    setLoading(true);
    const getMenu = async () => {
      const req = new Request('http://localhost:8082/menus');
      const resp = await fetch(req);
      if (resp.ok) {
        const menus = await resp.json();
        Array.from(menus, (menuWithItems) => {
          const menu = {
            menu_id: menuWithItems.menu_id,
            menu_title: menuWithItems.menu_title,
            menu_start_time: menuWithItems.menu_start_time,
            menu_end_time: menuWithItems.menu_end_time,
          }; 
          const { items } = menuWithItems;
          setMenu((prev) => [...prev, menu]);
          setItems((prev) => ({
            ...prev,
            [menuWithItems.menu_id]: items,
          }));
        });

        setSelectedMenuId(menus[0].menu_id);
      }
      setLoading(false);
    };

    getMenu();
  }, []);

  if (loading) {
    return <span>loading...</span>;
  }

  return (
  <div className="menu-header">
    <h2>Order Online! Pick up in-store!</h2>
    <select
      defaultValue={selectedMenuId}
      onChange={({ target: { value }}) => { setSelectedMenuId(value); }}
    >
      {
        menus.map((menu) => (
          <option
            key={menu.menu_id}
            value={menu.menu_id}
          >
            {menu.menu_title}

          </option>
        ))
      }
    </select>
    <ul className="menu-items">
      {
        items[selectedMenuId].map((item) => (
          <li key={item.item_id}>
            <MenuItem item={item} />
            <button onClick={() => handleCheckout(item)}> Add to cart</button>
          </li>
        ))
      }
    </ul>
    <button onClick={checkout}>
      Checkout
    </button>
  </div>
  )
}

export default Order
