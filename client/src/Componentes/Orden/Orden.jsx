import React from 'react'
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { useSelector, useDispatch, connect } from 'react-redux'
import {Link,useParams} from 'react-router-dom';
import { ordenP } from '../FormBuy/FormBuy';

export default function Orden() {
  const[ordernP, setOrdenP] = useState({})
  let id_cart = localStorage.getItem("id_cart")
    // const [idPaypal, setIdPaypal] = useState([])


    useEffect(()=>{
      (
          async function(){
              const {data} = await clienteAxios.get(`/shoping/${id_cart}`)
              setOrdenP(data)
          }
      )()
  },[])
  
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
              <h3>Subtotal: {ordernP.calc.subTotal}<br/>Total Products: {ordernP.calc.totalProducts}<br/> Impuestos: {ordernP.calc.impuestos}<br/> Precio Total: {ordernP.calc.totalPrice}</h3>
            </div>
          } 
        
        <button>Pagar</button>
        </>

    )
}


// import React, { useEffect, useState } from 'react'
// import CardShoping from '../ShopingCar/CardShoping';
// import clienteAxios from '../../config/axios';

// export default function ShopingCar() {

//     const [order, setOrder] = useState({})

//     useEffect(() => {
//         (
//       async function () {
//         const { data } = await clienteAxios.get(`/shoping/${id_cart}`)
//         setOrder(data)
//       }
//     )()
//   }, [])

// return (
//     <>
//     {
// order.products && order.products.map( product => {
//     return(
//         <CardShoping  />
//     )
// })
//     }
//     {
//         order.calc?<div>
//                <h3> Total de productos: {order.calc.totalProducts}</h3>
//                <h3>Subtotal: ${order.calc.subTotal}</h3>
//                <h3>Impuestos (15%) ${order.calc.impuestos}</h3>
//                <h3>Precio total: ${order.calc.totalPrice}</h3>
//         </div>
//         :null
//     }

//     </>
// )

// }