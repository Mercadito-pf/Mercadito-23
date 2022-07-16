import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { update_querys_order, update_url } from '../../../redux/actions'

export default function Alphabet() {
  let dispatch = useDispatch()
     let orders = ["ascendente", "descendente"]

    //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
    // global
     function handleClick(e, order){
        e.preventDefault()
        if (order === "ascendente") {
            dispatch(update_querys_order("sort=name&order=asc"))
            dispatch(update_url())
        }
        if (order === "descendente") {
            dispatch(update_querys_order("sort=name&order=desc"))
            dispatch(update_url())
        }
     }
  return (
    <div>
        <h4>Nombre</h4>
        <ul>
            {
                orders.map((order, i) =>{
                    return(
                        <li key={i} onClick={(e) => handleClick(e, order)}>
                            <Link  to="/">{order}</Link>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}
