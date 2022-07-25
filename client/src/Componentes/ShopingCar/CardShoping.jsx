import React from 'react'
import clienteAxios from '../../config/axios'

export default function CardShoping(product) {
  console.log(product.cantidad)
  return (
    <div>
      <button onClick={()=> product.handleClick(product._id)}>eliminar</button>
      <h1>{product.name}</h1>
      <h3>Precio: ${product.price}</h3>
      <h3>Disponibles: {product.stock}</h3>

      <button 
      disabled ={product.cantidad === 1} 
      onClick={()=> product.updateCantidad(product.cantidad-1, product._id)}>decrementar</button>
      <h1>{product.cantidad}</h1>
      <button 
      disabled ={product.cantidad === product.stock} 
      onClick={()=> product.updateCantidad(product.cantidad+1, product._id)}>incrementar</button>
      <hr />
      <hr />
    </div>

    
  )
}
