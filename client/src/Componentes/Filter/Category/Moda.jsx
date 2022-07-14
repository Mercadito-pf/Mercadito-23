import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { update_querys_filter, update_url } from '../../../redux/actions'

export default function Moda() {
    let [moda, setModa] = useState([])

    let dispatch = useDispatch()
    useEffect(() => {
        // se obtienen las categorias de productos
        (async function () {
            let res = await fetch('http://localhost:3001/categories').then(res => res.json())
            // console.log(res[0].tecnologia[0].name)
            setModa(res)
            // console.log(tecnology[0].tecnologia[0].name)
        })()
    }, [])

    //  modifica el estado global [url] para que home haga una nueva peticion a la url del estado
    // global
    function handleClick(e, c) {
        e.preventDefault()
        dispatch(update_querys_filter(`category=${c}`))
        dispatch(update_url())
    }

    return (
        <div>
            <a href="!#">Moda</a>
            <ul>

                {
                    // el estado local [moda] tiene en la posicion 3 un objeto asi:
                    // {moda:[tipos de moda]} 
                    moda?.length && moda[2].moda?.map((c, i) => {
                        return (
                            <li key={i}>
                                <Link onClick={(e) => handleClick(e, c.name)} to="/">{c.name.replaceAll("_", " ")}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    )
}
