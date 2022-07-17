import React from 'react';
import clienteAxios from '../../config/axios';
import './Fav.modules.css'

// const {data}= await clienteAxios.get(`/favorites/${idproducto}?user=${profile?.name}`)
function Fav({id, profile}) {
  
  const handleClick = async ()=>{
      try{
      const {data}= await clienteAxios.get(`/favorites/${id}?user=${profile}`)
        alert('se añadio a favoritos')
      }
      catch(e){
        console.log(e)
      }}
  return (
    <button className="gf" onClick={handleClick}>
        <span aria-label='Fav-gif' role='img'>🧡</span>
    </button>
  )
}

export default Fav