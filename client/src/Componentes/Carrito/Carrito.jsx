import React, { useState } from 'react';
import clienteAxios from '../../config/axios';
import carrito1 from '../icons/carro1.png';
import carrito2 from '../icons/carro2.png';

function Carrito ({id}) {
    let [agregate, setAgregate] = useState(false)

    const requestOptions = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    };
  
    console.log(id,"sss")

    const handleClick2 = async()=>{
        console.log('click')
        try{
            const {data} = await clienteAxios.get(`/carrito/${id}`)
            console.log(data)
            if (data) {
                await clienteAxios.delete(`/carrito/${data._id}`)
                setAgregate(false)
                // alert('se elimino de favoritos')
                return
            }
                await clienteAxios.post(`/carrito/${id}`, {}, requestOptions)
                setAgregate(true)
            }
        catch(e){
            console.log("Algo anda mal en carrito ",e)
        }
    }
  return (
    <div>
        <button onClick={handleClick2}>
            <img src={agregate?carrito1:carrito2}/>
        </button>
    </div>
  )
}
export default Carrito;