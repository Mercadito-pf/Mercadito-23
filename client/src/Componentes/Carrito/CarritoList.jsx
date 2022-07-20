import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import Cards from '../Card/Card'
import '../Home/Home.scss'


export default function CarritoList (){
    let [state, setState] = useState([])
    let[refres, setRefres]= useState(true)
    
    

    async function handleClickcarrito(e, id_carrito){
        e.preventDefault();
        await clienteAxios.delete(`/carrito/${id_carrito}`)
        setRefres(!refres)
        alert("eliminado de carrito")
    }

    const requestOptions = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    
      };


      useEffect(()=>{
        (
            async function(){
                const {data}= await clienteAxios.get(`/carrito`, requestOptions)
               setState(data)
            }
        )()
    }, [refres])

    return (
        <div className='cardGrid'> 
    {
        state.length? state.map(p =>{
            if (p.product) {
                return(
                  <Cards 
                  
                  id_carrito={p._id} 
                   list={true}
                    handleClick={handleClickcarrito} 
                    image={p.product.image} 
                    name={p.product.name} 
                    price={p.product.price} 
                    id={p.product.id} />
                    
                )
            }
        })
        :
        (<h1>No tienes productos en tu seccion de carrito</h1>)
    }
    
        </div>)
}
