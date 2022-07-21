import React from 'react'
import clienteAxios from '../../config/axios'

export default function CardShoping(props) {

  return (
    <div>
      <button onClick={()=> props.handleClick(props.idShoping)}>eliminar</button>
      <h1>{props.name}</h1>
      <h3>Precio: ${props.price}</h3>
      <h3>Disponibles: {props.stock}</h3>

      <button 
      disabled ={props.cantidad === 1} 
      onClick={()=> props.updateCantidad(props.idShoping, props.cantidad-1)}>decrementar</button>
      <h1>{props.cantidad}</h1>
      <button 
      disabled ={props.cantidad === props.stock} 
      onClick={()=> props.updateCantidad(props.idShoping, props.cantidad+1)}>incrementar</button>
      <hr />
      <hr />
    </div>

    
  )
}
