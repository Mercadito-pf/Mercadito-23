import React from 'react'
import Filter from '../Filter/Filter'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar() {
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

    </nav>
  )
}
