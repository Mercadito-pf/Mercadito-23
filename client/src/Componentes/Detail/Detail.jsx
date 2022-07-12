import React from 'react';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {get_id} from '../../redux/actions';

export default function Detail () {
    const dispatch = useDispatch();
    // const Detail = useSelector((state)=>state.Detail);
    const {id} = useParams();

    let [detail, setDetail] = useState({})

    useEffect(()=>{
        (
            async function(){
                let res = await fetch(` http://localhost:3001/products/${id}`).then(res => res.json())

                setDetail(res)
            }
        )()
    })
  return (
    <>
    {
        <div>
            <h1>{detail.name}</h1>
            <img src={detail.image}/>
            <h3>Description:</h3>
            <h3>{detail.description}</h3>
            <h3>Category:</h3>
            <h3>{detail.category}</h3>
            <h3>Price:</h3>
            <h3>{detail.price}</h3>
            <h3>Stock:</h3>
            <h3>{detail.stock}</h3>
        </div>
        
    }
    </>
  )
}
