import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { update_querys_filter, update_url } from '../../../redux/actions'

export default function Tecnology() {

    // let {url} = useSelector(state => state)
    let [tecnologia, setTecnology] = useState([])

    let dispatch = useDispatch()
    useEffect(() => {
        // se obtienen las categorias de productos
        (async function () {
            let tecnologia = await fetch('http://localhost:3001/categories').then(res => res.json())
            setTecnology(tecnologia[0].sub)
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
            <h3>tecnologia</h3>
            <ul>

                {

                    // el estado local [tecnology] tiene en la posicion 0 un objeto asi:
                    // {tecnologia:[tipos de tecnologia]} 
                    tecnologia.length && tecnologia.map((c, i) => {
                        return (
                            <li key={i} onClick={(e) => handleClick(e, c.name)}>
                                <Link to="/">{c.name.replaceAll("_", " ")}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    )
}
