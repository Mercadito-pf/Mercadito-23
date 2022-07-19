import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import Cards from '../Card/Card'
import '../Home/Home.scss'

export default function ListFav() {

    let [state, setState] = useState([])

    const requestOptions = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    
      };

      console.log(requestOptions)
    useEffect(()=>{
        (
            async function(){
                const {data}= await clienteAxios.get(`/favorites`, requestOptions)

               setState(data)
            }
        )()
    }, [])


    return(
        <div className='cardGrid'>
        {
            state.length? state.map(p =>{
                if (p.product) {
                    return(
                        <Cards list={true} image={p.product.image} name={p.product.name} seller={p.product.seller} sales={p.product.sales} price={p.product.price} id={p.product.id} />
                    )
                }
            }):<h1>No tienes productos en tu seccion de favoritos</h1>
        }
        </div>
    )
    
  
}
