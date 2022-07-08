import React from 'react'
import Electrodomesticos from './Category/Electrodomesticos'
import Moda from './Category/Moda'
import Muebles_y_Hogar from './Category/Muebles_y_Hogar'
import Tecnology from './Category/Tecnology'
// import Category1 from './Category/Category1'
// import Category2 from './Category/Category2'

export default function Filter() {


  return (
    <>
    <ul>
      <li>
      <Tecnology/>
      </li>
      <li>
        <Electrodomesticos/>
      </li>
      <li>
      <Muebles_y_Hogar/>
      </li>
      <li>
        <Moda/>
      </li>
    </ul>
    
    </>
  )
}
