import React from 'react'
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { useSelector, useDispatch, connect } from 'react-redux'
import {Link,useParams} from 'react-router-dom';
import { ordenP } from '../FormBuy/FormBuy';
import Paypal from '../Paypal/Paypal';

export default function Orden() {
  const[ordernP, setOrdenP] = useState({})
  let id_cart = localStorage.getItem("id_cart")
    // const [idPaypal, setIdPaypal] = useState([])


    useEffect(()=>{
      (
          async function(){
              const {data} = await clienteAxios.get(`/shoping/${id_cart}`)
              setOrdenP(data,"oo")
              console.log(data)
          }
      )()
  },[])
  //  async function handlesubmit(){
  //   await clienteAxios.post(`/paypal/create-payment`)

  //  }  
    return (
        <>
            {
              ordernP.products && ordernP.products.map(product =>(
                <div>
                    <h3>Producto: {product.name}<br/>Cantidad: {product.cantidad}<br/>Stock: {product.stock}<br/>Price: {product.price}</h3>,
                  </div>
                ))
              }
          {
            ordernP.user &&
           <div>
             <h3>Nombre: <br/>{ordernP.user.nombre}<br/>Apellido:<br/> {ordernP.user.apellido}<br/>Direccion:<br/> {ordernP.user.direccion}<br/>Codigo Postal:<br/> {ordernP.user.codigoPostal}<br/>Ciudad: <br/>{ordernP.user.ciudad}<br/>Pais:<br/> {ordernP.user.pais}<br/>Telefono:<br/> {ordernP.user.telefono}<br/></h3>
           </div>
         } 
         <br/>
          {
           ordernP.calc &&
            <div>
              <h3>Subtotal: {ordernP.calc.subtotal}<br/>Total Products: {ordernP.calc.total}<br/> Impuestos: {ordernP.calc.impuestos}<br/> Precio Total: {ordernP.calc.totalPrice}</h3>
            </div>
          } 
                {/* subtotal:Number, 
        total:Number,
        impuestos:Number, 
        totalPrice:Number, */}
        <Paypal/>
        </>

    )
}
