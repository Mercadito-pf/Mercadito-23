import React from 'react';
import Fav from '../Fav/Fav.jsx'
import Carrito from '../Carrito/Carrito.jsx';
import {Link} from "react-router-dom";
import './Card.scss'
import { useSelector } from "react-redux";
import clienteAxios from '../../config/axios.js';

const Cards = (products)=>{
    const {profile} = useSelector(state=>state.userReducer)
    // console.log(profile)
    console.log(products.id_fav)
    // console.log(products,"dddddddddddddddddddddddd")
    
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
                    {
                        products.list && <button  onClick={(e) => products.handleClick(e, products.id_fav) }>X</button>
                    }

                { 
                    profile?._id && !products.list && 
                    <div>
                        <Carrito id={products._id} profile={profile}></Carrito>
                    </div>
                }
                  {
                        products.list && <button  onClick={(e) => products.handleClick2(e, products.id_carrito) }>X</button>
                    }




                {/* {products.list && <button onClick={(e)=>products.handleClickcarrito(e,products.id_carrito)}>X</button>} */}
                <div className = 'image'>
                    <img src={products.image} alt='img not found' />
                </div>
                
                <div className = 'cardText'>
                    <h3>{products.name}</h3>
                    <h4>${products.price}.00</h4>
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