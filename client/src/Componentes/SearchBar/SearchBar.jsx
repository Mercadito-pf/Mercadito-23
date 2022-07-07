import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { update_url } from '../../redux/actions'

export default function SearchBar() {

    let [input, setInput] = useState("")

    let dispatch = useDispatch()
    console.log(input)
    function handleChange(e){
        e.preventDefault()
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(update_url(`http://localhost:3001/products?name=${input}`))
    }
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={input} type="text" placeholder='Search your favorites products...' />
        </form>
    )
}
