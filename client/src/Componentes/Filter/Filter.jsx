import React from 'react'
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
      <Muebles_y_Hogar/>
      </li>
    </ul>
    
    </>
  )
}
