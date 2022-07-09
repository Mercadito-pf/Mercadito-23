import React from 'react'
import { useDispatch } from 'react-redux'
import { update_querys_order, update_url } from '../../../redux/actions'

export default function Alphabet() {
  let dispatch = useDispatch()
     let orders = ["ascendente", "descendente"]

     function handleClick(e, order){
        e.preventDefault()
        if (order === "ascendente") {
            dispatch(update_querys_order("_sort=name&_order=asc"))
            dispatch(update_url())
        }
        if (order === "descendente") {
            dispatch(update_querys_order("_sort=name&_order=desc"))
            dispatch(update_url())
        }
     }
  return (
    <div>
        <a href="!#">Nombre</a>
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
