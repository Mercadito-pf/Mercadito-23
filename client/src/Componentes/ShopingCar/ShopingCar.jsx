import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { Link } from "react-router-dom";
import CardShoping from './CardShoping';

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
   <>
   {
    shoping.products &&  shoping.products.map(product =>{
        return(
          <CardShoping updateCantidad={updateCantidad}  {...product}  handleClick={handleClick}/>
        )
    })
   }

   {
    shoping.calc? <div>
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




