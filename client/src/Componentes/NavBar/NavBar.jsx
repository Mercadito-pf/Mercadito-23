import React from 'react'
import { useSelector } from 'react-redux'
import Filter from '../Filter/Filter'
import Order from '../Order/Order'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar() {

  let {currentPage} = useSelector(state => state)
  return (
    <nav>
      <h1>Mercadito</h1>
      <h3>COMPRA Y VENDE SEGURO</h3>
      <SearchBar />
      <ul>
        <li>
          <a href="!#">Crear cuenta</a>
        </li>
        <li>
          <a href="!#">Iniciar sesion</a>
        </li>
        <li>
          <a href="!#">Mis compras</a>
        </li>
        <li>
          <a href="!#">Carrito</a>
        </li>
      </ul>
      <div>
        <a href="!#">Categorias</a>
        <Filter />
      </div>
      {
        currentPage> 0 && <div>
        <a href="!#">Ordenar por:</a>
        <Order/>
      </div>
      }
      
    </nav>
  )
}
