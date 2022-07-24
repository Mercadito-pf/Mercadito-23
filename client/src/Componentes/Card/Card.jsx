import React from 'react';
import Fav from '../Fav/Fav.jsx'
import {Link, useHistory} from "react-router-dom";
import './Card.scss'
import { useSelector } from "react-redux";
import ButtonAddCart from '../ShopingCar/ButtonAddCart.jsx';

const Cards = (products)=>{
    // console.log(products.id)
    let idProduct = products.id
    const {profile} = useSelector(state=>state.userReducer)
    
    return (

        <div className = 'principalContainer'>  
            <div className = 'cardContent'>
            
                 {
                profile?._id &&  !products.list &&
                <div className="Favorito">
                    <Fav id={products._id} profile={profile}></Fav>
                </div>
                }
                {
                    products.list && <button onClick={(e) => products.handleClick(e, products.id_fav)}>X</button>
                }
               <ButtonAddCart {...products}/>
                <div className = 'image'>
                    <img src={products.image} alt='img not found' />
                </div>
                
                <div className = 'cardText'>
                    <h3>{products.name}</h3>
                    <h4>${products.price}.00</h4>
                    <h2>{products.seller}</h2>
                    <p>{products.sales} ventas</p>
                    <Link to={`/detail/${products._id}`} className='detailsButton'>
                        <button>ver mas</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cards;