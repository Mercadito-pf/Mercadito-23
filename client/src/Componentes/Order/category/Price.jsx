import React from 'react'
import { useDispatch } from 'react-redux'
import { update_querys_order, update_url } from '../../../redux/actions'

export default function Price() {

    let dispatch = useDispatch()
     let orders = ["minimo", "maximo"]

     function handleClick(e, order){
        e.preventDefault()
        if (order === "minimo") {
            dispatch(update_querys_order("_sort=price&_order=asc"))
            dispatch(update_url())
        }
        if (order === "maximo") {
            dispatch(update_querys_order("_sort=price&_order=desc"))
            dispatch(update_url())
        }
     }
  return (
    <div>
        <a href="!#">Precio</a>
        <ul>
            {
                orders.map(order =>{
                    return(
                        <li>
                            <a onClick={(e) => handleClick(e, order)} href="!#">{order}</a>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}
