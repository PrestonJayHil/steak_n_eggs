import React, { useEffect, useState } from 'react'
// import logo from '../assets/svg/logo.svg'

import MenuItem from '../components/MenuItem.jsx';
import './Styles.css'



function Order() {



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
  </div>
  )
}

export default Order
