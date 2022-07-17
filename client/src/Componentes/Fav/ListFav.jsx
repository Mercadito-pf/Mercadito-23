import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import clienteAxios from '../../config/axios'
import Cards from '../Card/Card'

export default function ListFav() {

    let [state, setState] = useState([])

    const {profile} = useSelector(state=>state.userReducer)

    useEffect(()=>{
        (
            async function(){
               let {data} = await clienteAxios
               .get(`/favorites?user=${profile.name}`)

               setState(data)
            }
        )()
    }, [])


    return(
        <>
        {
            state.length && state.map(p =>{
                if (p.product) {
                    return(
                        <Cards list={true} image={p.product.image} name={p.product.name} seller={p.product.seller} sales={p.product.sales} price={p.product.price} id={p.product.id} />
                    )
                }
            })
        }
        </>
    )
    
  
}
