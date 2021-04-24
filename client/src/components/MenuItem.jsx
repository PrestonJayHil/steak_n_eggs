import React, {useState} from 'react'



export default function MenuItem({ item }) {


    return (
        <div>
         <h2>{item.item_title} {item.item_price} </h2>
        <div> </div>
         <h3>{item.item_desc}</h3>
        </div>

    )
}