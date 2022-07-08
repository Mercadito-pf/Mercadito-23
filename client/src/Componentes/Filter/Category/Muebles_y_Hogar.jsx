import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { update_url } from '../../../redux/actions'

export default function Muebles_y_Hogar() {
    let [mh, setMh]= useState([])

    let dispatch = useDispatch()
    useEffect(() =>{
        (async function(){
            let res = await fetch('http://localhost:3001/categories').then(res => res.json())
            setMh(res)
        })()
    }, [])
    
    
   function handleClick(e, c){
    e.preventDefault()
    dispatch(update_url(`http://localhost:3001/products?category=muebles_y_hogar: ${c}`))
   }
    
  return (
    <div>
    <a href="!#">muebles y hogar</a>
    <ul>
        
       {
        
        mh.length && mh[2].muebles_y_hogar.map((c, i)=> {
            return(
                <li key={i}>
                    <a onClick={(e) => handleClick(e, c.name)} href="!#">{c.name.replaceAll("_", " ")}</a>
                </li>
            )
        })
       }
    </ul>
    </div>
   
  )
}