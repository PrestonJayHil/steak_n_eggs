import React, {useState} from 'react'
import FrenchToastCombo from '../assets/menu_assets/french_toast_combo.jpg'
import SteakNEggs from '../assets/menu_assets/steak_n_eggs.jpg'



export default function MenuItem({ item }) {


    return (
        <div>
         <h2>{item.item_title} {item.item_price} </h2>
        <div> </div>
         <h3>{item.item_desc}</h3>
        </div>

    )
}




    
  /*  items.forEach((item) => {
        filepath = name_normalize_function(item.item_title);
        return (<img src={filepath} />);
      })

        const firstItem = items[0]
        const filepath = name_normalize_function(firstItem.item_title);
        return (<img src={filepath} />);

    */

    
