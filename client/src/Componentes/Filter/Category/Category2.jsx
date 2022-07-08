import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update_url } from '../../../redux/actions'

export default function Category2() {

    let {url} = useSelector(state => state)
    let [categories2, setCategories]= useState([])

    let dispatch = useDispatch()
    useEffect(() =>{
        (async function(){
            let res = await fetch('http://localhost:3001/categories2').then(res => res.json())
            setCategories(res)
        })()
    }, [])
    
   function handleClick(e, c){
    e.preventDefault()
    dispatch(update_url(`http://localhost:3001/products?categories2=${c}`))
   }
    
  return (
    <>
     <p>Categories2</p>
    <ul>
       {
        categories2.map(c => {
            return(
                <li key={c}>
                    <a onClick={(e) => handleClick(e, c)} href="!#">{c}</a>
                </li>
            )
        })
       }
    </ul>
    </>
   
  )
}
