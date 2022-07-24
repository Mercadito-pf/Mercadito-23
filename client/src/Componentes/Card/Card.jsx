import React from 'react';
import Fav from '../Fav/Fav.jsx'
import {Link, useHistory} from "react-router-dom";
import './Card.scss'
import { useSelector } from "react-redux";
import clienteAxios from '../../config/axios.js';

const Cards = (products)=>{
    const {profile} = useSelector(state=>state.userReducer)
    let history = useHistory()
    // console.log(profile)
    const requestOptions = {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      };
    async function handleClick(e){
        e.preventDefault()
        await clienteAxios.post(`/shoping/${products._id}`,{}, requestOptions)
        history.push("/shoping-car")
    }
    
    return (

        <div className = 'principalContainer'>  
        {/* <Link to={`/detail/${products.id}`} className='detailsButton'>    */}
            <div className = 'cardContent'>
            
                 {
                profile?._id &&  !products.list &&
                <div className="Favorito">
                    <Fav id={products._id} profile={profile}></Fav>
                </div>
                }
                { products.list &&
                    <div className='buttonX'>
                    <button className='x' onClick={(e) => products.handleClick(e, products.id_fav)}>x</button>
                    </div>
                }
                <div className = 'image'>
                    <img src={products.image} alt='img not found' />
                </div>
                <div className='namePro'>
                    <h3>{products.name}</h3>
                </div>
                
                <div className = 'cardText'>
                    <h4>${products.price}.00</h4>
                    <button className='add' onClick={handleClick}>Agregar al carrito</button>
                    <h2>{products.seller}</h2>
                    <p>{products.sales} ventas</p>
                    <Link to={`/detail/${products.id}`} className='detailsButton'>
                        <button>ver mas</button>
                    </Link>
                </div>
            </div>
            {/* </Link> */}
        </div>
    )
}

export default Cards;