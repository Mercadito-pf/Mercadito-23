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
            <p>{detail.description}</p>
            <h3>{detail.category}</h3>
            <h3>{"$ "+detail.price}</h3>
            <h3>{detail.stock}</h3>
            <h3>{detail.seller}</h3>
            <h3>{detail.sales}</h3>
            <div>
                {
                    detail.category === "celulares" || detail.category === "laptops_y_computadores" || detail.category === "consolas_de_videojuegos"?(
                        <div>
                            <h3>alamcenamiento: {detail.almacenamiento}</h3>,
                            <h3>ram: {detail.ram}</h3>,
                            <h3>marca: {detail.marca}</h3>,
                            <h3>modelo: {detail.modelo}</h3>
                            {
                                detail.category === "celulares"?(
                                    <div>
                                        <h3>bateria:{detail.bateira}</h3>
                                    </div>
                                ):(null)
                            }
                            <h3>Procesador</h3>
                            <div>
                            <ul>
                                <li>{detail.procesador.marca}</li>
                                <li>{detail.procesador.linea}</li>
                                <li>{detail.procesador.nucleos}</li>
                                <li>{detail.procesador.velocidad}</li>
                            </ul>
                            </div>
                        </div>
                    ):(null)
                }
                </div>
                <div>
                {
                    detail.category === "audio_y_video"?(
                        detail.type === "tv"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>,
                                <h3>frecuencia: {detail.frecuencia}</h3>,
                                <h3>resolucion: {detail.resolucion}</h3>
                            </div>
                        ): detail.type === "audifonos"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>,
                                <h3>duracion bateria: {detail.duracion_bateria}</h3>
                            </div>
                        ): detail.type === "equipos"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>,
                                <h3>potencia: {detail.potencia}</h3>
                            </div>
                        ):(null)
                    ):(null)
                }
                </div>
                <div>
                    {
                        detail.category === "refrigeracion"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>,
                                <h3>litros: {detail.litros}</h3>
                            </div>
                        ): detail.category === "lavado"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>
                                <h3>RPM: {detail.RPM}</h3>,
                                <h3>capacidad de lavado: {detail.capacidad_de_lavado}</h3>,
                                <h3>potencia: {detail.potencia}</h3>
                            </div>
                        ):detail.category === "cocina"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>,
                                <h3>tipo: {detail.tipo}</h3>
                            </div>
                        ):detail.category === "limpieza"?(
                            <div>
                                <h3>marca: {detail.marca}</h3>,
                                <h3>modelo: {detail.modelo}</h3>
                            </div>
                        ):(<h3>name: {detail.name}</h3>,
                           <h3>seller: {detail.seller}</h3>,
                           <h3>price: {detail.price}</h3>,
                           <h3>stock: {detail.stock}</h3>,
                           <h3>sales: {detail.sales}</h3>,
                           <h3>category: {detail.category}</h3>,       
                           <h3>description: {detail.descrition}</h3>,
                           <h3>image: {detail.image}</h3>,
                           <h3>almacenamiento: {detail.almacenamiento}</h3>,
                           <h3>ram: {detail.ram}</h3>,
                           <h3>marca: {detail.marca}</h3>,
                           <h3>modelo: {detail.modelo}</h3>,
                           <h3>bateria: {detail.bateria}</h3>,
                           <h3>type: {detail.tipo}</h3>                 
                        )
                    }
                </div>
        </div>
        
    }
    </>
  )
}
