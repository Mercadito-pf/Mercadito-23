import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clienteAxios from '../../config/axios';

export default function ButtonAddCart(product) {
    // const { profile } = useSelector(state => state.userReducer)
    let history = useHistory()

    async function handleClick(e) {
        e.preventDefault()
        let id_cart = localStorage.getItem("id_cart")
        await clienteAxios.post(`/shoping/insert-product/${id_cart}`, product)
        // history.push("/shoping-car")
    }
    return (
        <button onClick={handleClick}>Agregar al carrito</button>
    )
}
