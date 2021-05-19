import React, { useState } from 'react'
import './Styles.css'
import menu from '../assets/jpeg/menu.jpg'

function Menu() {
  const [count, setCount] = useState(0)
  return (
    <div className="center">
      <h2>Click on Menu to Download</h2>
      <a href={menu} target="_blank" download="steak_n_eggs_menu" width="950px" height="1400px">
      <img src={menu} alt="" width="950px" height="1400px"/>
      </a>
    </div>
  )
}
export default Menu


