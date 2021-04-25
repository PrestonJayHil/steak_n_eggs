import React, { useState } from 'react'
import './Styles.css'
import menu_eggs from '../assets/jpeg/menu_eggs.jpg'
import menu_steak from '../assets/jpeg/menu_steak.jpg'
import menu from '../assets/jpeg/menu.jpg'



function Menu() {
  const [count, setCount] = useState(0)
  return (
    <div className="center">
      <h2>Click Menu to Download</h2>
      <a href={menu} target="_blank" download={menu} width="950px" height="1400px">
      <img src={menu} alt="" width="950px" height="1400px"/>
      </a>
      
    </div>
  )
}
export default Menu


