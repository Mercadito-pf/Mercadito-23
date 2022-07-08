import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { update_url } from '../../../redux/actions'


export default function Electrodomesticos() {
    let [electrodomesticos, setElectrodomesticos]= useState([])

    let dispatch = useDispatch()
    useEffect(() =>{
        (async function(){
            let res = await fetch('http://localhost:3001/categories').then(res => res.json())
            // console.log(res[0].tecnologia[0].name)
            setElectrodomesticos(res)
            // console.log(tecnology[0].tecnologia[0].name)
        })()
    }, [])
    
    
   function handleClick(e, c){
    e.preventDefault()
    dispatch(update_url(`http://localhost:3001/products?category=electrodomesticos: ${c}`))
   }
    
  return (
    <div>
    <a href="!#">Electrodomesticos</a>
    <ul>
        
       {
        
        electrodomesticos.length && electrodomesticos[1].electrodomesticos.map((c, i)=> {
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