import React from 'react'
import Filter from '../Filter/Filter'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar() {
  return (
    <nav>
        <h1>Mercadito</h1>
        <h3>COMPRA Y VENDE SEGURO</h3>
        <SearchBar/>
        <ul>
            <li>
            <a href="!#">Start your account</a>
            </li>
            <li>
            <a href="!#">My shoppings</a>
            </li>
            <li>
            <a href="!#">Shopping car</a>
            </li>
        </ul>
        <div>
        <a href="!#">Categories</a>
        <Filter/>
        </div>
        
    </nav>
  )
}
