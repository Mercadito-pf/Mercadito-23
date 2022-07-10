import React from 'react'
import { useSelector } from 'react-redux'
import Filter from '../Filter/Filter'
import Order from '../Order/Order'
import SearchBar from '../SearchBar/SearchBar'

import './NavBar.scss';
import carrito from '../icons/carrito.png'
import user from '../icons/user.png'
import bag from '../icons/bag.png'


export default function NavBar() {

  let {currentPage} = useSelector(state => state)
  
  return (
      <div className='containerNavbar'>

        <nav className='nav'> 
          <ul className='contentButton'>
              <li className='logo'>
                <h1>Mercadito</h1>
                <h5>COMPRA Y VENDE SEGURO</h5>
              </li>
              <SearchBar />
              {/* <li className='item'>
                <a href="!#">Crear cuenta</a>
              </li> */}
              <li className='item'>
                <a href="!#"><img src={user}/>Iniciar sesion</a>
              </li>
              <li className='item'>
                <a href="!#"><img src={bag}/>Mis compras</a>
              </li>
              <li className='item'>
                <a href="!#"><img src={carrito}/>Carrito</a>
              </li>
          </ul>
        </nav>
        
        <div className='categories'>
          <ul className='contentCategory' >
            <li className='item'>
              <a href="!#" className='categoria'>Categorias</a>
              <Filter />
            </li>
            { currentPage> 0 &&
            <li className='item'>
              <a href="!#">Ordenar por:</a>
              <Order/>
            </li>
            }
          </ul>
        </div>
      </div>
  )
}
