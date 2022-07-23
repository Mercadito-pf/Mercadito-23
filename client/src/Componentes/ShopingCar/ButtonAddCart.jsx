import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clienteAxios from '../../config/axios';

export default function ButtonAddCart({ id }) {
    const { profile } = useSelector(state => state.userReducer)
    let history = useHistory()
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
    async function handleClick(e) {
        e.preventDefault()

        if (profile._id) {
            await clienteAxios.post(`/shoping/${id}`, {}, requestOptions)
            history.push("/shoping-car")
            return
        }
        
        localStorage.setItem("id_product", id)

    }
    return (
        <button onClick={handleClick}>Agregar al carrito</button>
    )
}
