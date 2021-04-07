import React, { useState } from 'react'
import file from '../assets/pdf/menu.pdf'
import './Styles.css'

function Menu() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <iframe
            style={{ width: "563px", height: "666px" }}
            src={file}
            type='menu.pdf'
            title='title'
          />
  </div>
  )
  


}

export default Menu


