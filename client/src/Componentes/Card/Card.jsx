import React from 'react';
import Fav from '../Fav/Fav.jsx'
import {Link} from "react-router-dom";
import './Card.scss'
import { useSelector } from "react-redux";

const Cards = (products)=>{
    const {profile} = useSelector(state=>state.userRedcuer)
    

    return (

        <div className = 'principalContainer'>     
            <div className = 'cardContent'>

               {
                profile?._id &&  
                <div className="Favorito">
                    <Fav id={products.id}></Fav>
                </div>
                }

                <div className = 'image'>
                    <img src={products.image} alt='img not found' />
                </div>
                
                <div className = 'cardText'>
                    <h3>{products.name}</h3>
                    <h4>${products.price}.00</h4>
                    <h2>{products.seller}</h2>
                    <p>{products.sales} ventas</p>
                    <Link to={`/detail/${products.id}`} className='detailsButton'>
                        <button>see more</button>
                    </Link>
                </div>
                
            </div>
        
        </div>
    )
}

export default Cards;