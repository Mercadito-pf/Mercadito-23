import React from 'react';
import clienteAxios from '../../config/axios';
import './Fav.modules.css'
import heart_t from '../icons/tranparente.png'

// const {data}= await clienteAxios.get(`/favorites/${idproducto}?user=${profile?.name}`)
function Fav({id}) {

  const requestOptions = {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`
  }

  };

  console.log(id)
  
  const handleClick = async ()=>{
    console.log('click')
      try{
      const {data}= await clienteAxios.post(`/favorites/${id}`, {}, requestOptions)
        alert('se añadio a favoritos')
      }
      catch(e){
        console.log(e)
      }}
  return (
    <button onClick={handleClick}>
        {/* <span aria-label='Fav-gif' role='img'>🧡</span> */}
        <img src={heart_t}/>
    </button>
  )
}

export default Fav