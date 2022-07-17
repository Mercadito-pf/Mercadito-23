import React, { useState } from 'react'
import { useEffect } from 'react'

import {useParams} from 'react-router-dom'

export default function Detail() {

    let [detail, setDetail]=useState({})
    let [props, setProps]= useState([])
    let {id} = useParams()

    let arr = [
        "name",
        "price",
        "stock",
        "description",
        "almacenamiento",
        "ram",
        "marca",
        "modelo",
        "bateria",
        "frecuencia",
        "resolucion",
        "duracion_bateria",
        "potencia",
        "litros",
        "RPM",
        "capacidad_de_lavado",
        "tipo",
        "procesador"
    ]

    useEffect(()=>{
        (
            async function(){
                let res = await fetch(`http://localhost:3001/products/${id}`).then(res => res.json())

                for (const key in res) {
                    if (arr.includes(key)) {
                        setProps(prev =>{
                            return [...prev, key]
                        })
                    }
                    
                }
                setDetail(res)
            }
        )()
    },[])


    return(
        <>
        <img src={detail.image} alt="" />
        {
            props.map(p =>{
                
                if (p ==="procesador") {
                    let {marca, linea, nucleos, velocidad} = detail.procesador
                    return(
                        <>
                        <h3>{p}: {marca} {linea} con {nucleos} nucleos a {velocidad}</h3>
                        </>
                        
                    )
                }
                if (p === "ram") {
                    return(
                        <h3>RAM: {detail.ram}GB</h3>
                    )
                }
                
                return(
                    <h3>{p}: {detail[p]}</h3>
                )
            })
        }
        </>
    )
   
}
