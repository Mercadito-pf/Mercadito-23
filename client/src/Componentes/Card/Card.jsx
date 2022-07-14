import React from 'react';


const Cards = (products)=>{
    return (
        <div className = "container">
            <div className = "cards">
                <div className = "card-image">
                    <img src={products.image} alt="img not found" />
                </div>
                
                <div className = "card-text">
                    <h3>{products.name}</h3>
                    <h3>{products.price}</h3>
                    <h2>{products.seller}</h2>
                    <p  className = "cards-genres">{products.sales}</p>
                </div>
                
            </div>
        </div>
    )
}

export default Cards;