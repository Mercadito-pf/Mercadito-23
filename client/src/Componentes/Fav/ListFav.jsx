import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import Cards from '../Card/Card'
import '../Home/Home.scss'

export default function ListFav() {

    let [state, setState] = useState([])
    let[refres, setRefres]= useState(true)

    async function handleClick(e, id_fav){
        e.preventDefault()
        await clienteAxios.delete(`/favorites/${id_fav}`)
        setRefres(!refres)
        alert("eliminado de fav")
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
                const {data}= await clienteAxios.get(`/favorites`, requestOptions)
               setState(data)
            }
        )()
    }, [refres])


    return(
        <div className='cardGrid'>
        {
            state.length? state.map(p =>{
                if (p.product) {
                    return(
                        <Cards id_fav={p._id} list={true} handleClick={handleClick} image={p.product.image} name={p.product.name} seller={p.product.seller} sales={p.product.sales} price={p.product.price} id={p.product.id} />
                    )
                }
            }):<h1>No tienes productos en tu seccion de favoritos</h1>
        }
        </div>
    )
    
  
}
