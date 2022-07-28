import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { Link } from "react-router-dom";
import CardShoping from './CardShoping';

import './ShopingCard.scss';

export default function ShopingCar() {

  let [shoping, setShoping]=useState({})
  let [refres, setRefres] = useState(true)
  let id_cart = localStorage.getItem("id_cart")

  async function handleClick(_id){
    console.log(_id)
    await clienteAxios.delete(`/shoping/delet-product/${id_cart}`,{data: {_id}})
    setRefres(!refres)
  }

  async function updateCantidad(cantidad, id){
    await clienteAxios.put(`/shoping/${id}`, {
      cantidad
  })
    setRefres(!refres)
  }

  useEffect(() => {
        (
      async function () {
        const { data } = await clienteAxios.get(`/shoping/${id_cart}`)
        setShoping(data)
      }
    )()
  }, [refres])
  return (
    <div className='shopContainer'>
      <div className='carShop'>
        <h1 className='miCarrito'>Mi carrito</h1>
      {
        shoping.products &&  shoping.products.map(product =>{
            return(
            <div>
              <CardShoping updateCantidad={updateCantidad}  {...product}  handleClick={handleClick}/>
            </div>
              
            )
        })
      }
      </div>

      {
        shoping.calc?
        <div className='containerRes'>
          <h1>Resumen del pedido</h1>
          <h3> Total de productos: {shoping.calc.totalProducts}</h3>
          <h3>Subtotal: ${shoping.calc.subTotal}</h3>
          <h3>Impuestos (15%) ${shoping.calc.impuestos}</h3>
          <h3>Precio total: ${shoping.calc.totalPrice}</h3>
          <Link to="/FormBuy"> checkout</Link>
        </div>
        :
        <h1>no tienes productos en tu carrito</h1>
        
      }
  
   </div>
  )
}




