import React, {useState} from 'react'

export default function MenuItem({ item }) {
  const imgPath = `${item.item_title
    .replaceAll(/\W/g, '')
    .toLowerCase()}.jpg`;
  return (
      <div>
        <img src={imgPath} />
        <h2>{item.item_title} {item.item_price}</h2>
        <p>{item.item_desc}</p>
      </div>
  )
}
