import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { update_current_page, update_querys_filter, update_url } from '../../../redux/actions'


export default function Electrodomesticos() {
    let [electrodomesticos, setElectrodomesticos]= useState([])

    let dispatch = useDispatch()
    useEffect(() =>{
        // se obtienen las categorias de productos
        (async function(){
            let res = await fetch('http://localhost:3001/categories').then(res => res.json())
            // console.log(res[0].tecnologia[0].name)
            setElectrodomesticos(res)
            // console.log(tecnology[0].tecnologia[0].name)
        })()
    }, [])
    
    
    //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
    // global
   function handleClick(e, c){
    e.preventDefault()
    dispatch(update_querys_filter(`category=electrodomesticos: ${c}`))
    dispatch(update_url())
   }
    
  return (
    <div>
    <a href="!#">Electrodomesticos</a>
    <ul>
        
       {
        // el estado local [electrodomesticos] tiene en la posicion 1 un objeto asi:
        // {electrodomesticos:[tipos de electrodomesticos]} 
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
