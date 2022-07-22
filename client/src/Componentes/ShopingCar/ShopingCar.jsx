import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { Link } from "react-router-dom";
import CardShoping from './CardShoping';

export default function ShopingCar() {

  let [shoping, setShoping]=useState({})
  let [refres, setRefres] = useState(true)


  async function handleClick(id){
    await clienteAxios.delete(`/shoping/${id}`)
    setRefres(!refres)
  }

  async function updateCantidad(id, cantidad){
    await clienteAxios.put(`/shoping/${id}`, {
      cantidad
  })
    setRefres(!refres)
  }
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

  };

  useEffect(() => {
    (
      async function () {
        const { data } = await clienteAxios.get(`/shoping`, requestOptions)
        setShoping(data)
      }
    )()
  }, [refres])
  return (
   <>
   {
    shoping.cart &&  shoping.cart.map(p =>{
      if (p.product) {
        return(
          <CardShoping updateCantidad={updateCantidad}  {...p.product} cantidad={p.cantidad} idShoping={p._id} handleClick={handleClick}/>
          
        )
      }
    })
   }

   {
    shoping.cart && shoping.cart.length? <div>
      <h3> Total de productos: {shoping.calc.totalProducts}</h3>
      <h3>Subtotal: ${shoping.calc.subTotal}</h3>
      <h3>Impuestos (15%) ${shoping.calc.impuestos}</h3>
      <h3>Precio total: ${shoping.calc.totalPrice}</h3>
    </div>:<h1>no tienes productos en tu carrito</h1>
   }
   <Link to="/FormBuy"> checkout</Link>
   </>
  )
}




