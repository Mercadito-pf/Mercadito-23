import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { update_querys_filter, update_url } from '../../redux/actions'
import searchButton from '../icons/search.png'
import './SearchBar.scss'

export default function SearchBar() {

    let [input, setInput] = useState("")
    let dispatch = useDispatch()

    // setea los cada cambio del input en estado local
    function handleChange(e){
        e.preventDefault()
        setInput(e.target.value)
    }

    // al dar enter se despacha la accion para modificar el estado global [url]
    function handleSubmit(e){
        e.preventDefault()
        dispatch(update_querys_filter(`name=${input}`))
        dispatch(update_url())
    }
    return (
        <div className='containerBar'>
            <form onSubmit={handleSubmit} className='container'>
                <input onChange={handleChange} value={input} className='input' type="text" placeholder='Busque sus productos favoritos...' />
            </form>
            <button type='submit' value=''>
                    <img src={searchButton} alt=''/>
            </button>
        </div>
    )
}
