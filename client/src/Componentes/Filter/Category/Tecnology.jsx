import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update_querys_filter, update_url } from '../../../redux/actions'

export default function Tecnology() {

    // let {url} = useSelector(state => state)
    let [tecnology, setTecnology]= useState([])

    let dispatch = useDispatch()
    useEffect(() =>{
        (async function(){
            let res = await fetch('http://localhost:3001/categories').then(res => res.json())
            console.log(res[0].tecnologia[0].name)
            setTecnology(res)
            // console.log(tecnology[0].tecnologia[0].name)
        })()
    }, [])
    
    
   function handleClick(e, c){
    e.preventDefault()
    dispatch(update_querys_filter(`category=tecnologia: ${c}`))
    dispatch(update_url())
   }
    
  return (
    <div>
    <a href="!#">tecnologia</a>
    <ul>
        
       {
        
        tecnology.length && tecnology[0].tecnologia.map((c, i)=> {
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
