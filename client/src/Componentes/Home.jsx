import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_current_page, update_querys_filter, update_querys_paginate, update_url } from "../redux/actions";
import Paginate from "./pagination/Paginate";
// import s from './home.module.css'


export default function Home() {
    let [products, setProducts] = useState([])
    let [productsAll, setProductsAll] = useState([])
    let [minLimit, setMinLimit] = useState(1)
    let [maxLimit, setMaxLimit] = useState(6)
    // let [currentPage, setCurrentPage] = useState(1)

    let dispatch = useDispatch()

    // traigo el estado global
    let { url, currentPage } = useSelector(state => state)

    // se hara una peticion a la api cada vez que se monte el componente o se actualice el estado
    // global [url]
    useEffect(() => {

        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            if (url.length) {
                let res = await fetch(url).then(res => res.json())
                setProducts(res)
                return
            }
            let res = await fetch(`http://localhost:3001/products?_start=${0}&_limit=${8}`).then(res => res.json())
            setProducts(res)

        })()

    }, [url])

    useEffect(() => {

        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            let res = await fetch(' http://localhost:3001/products').then(res => res.json())
            setProductsAll(res)
        })()

    }, [])



    const products_per_page = 8
    const totalProducts = productsAll.length
    const totalPages = Math.ceil(totalProducts / products_per_page)
    const end = currentPage * products_per_page
    const start = end - products_per_page

    console.log(start)


    function handleClick(page) {
        if (totalPages > maxLimit) {
            if (page > 0 && page < 4) {
                setMinLimit(1)
                setMaxLimit(6)
                dispatch(update_current_page(page))
                dispatch(update_querys_paginate(`_start=${start}&_limit=${8}`))
                dispatch(update_url())
                return
            }
            if (page <= totalPages && page > (totalPages - 4)) {
                setMinLimit(totalPages - 6)
                setMaxLimit(totalPages - 1)
                dispatch(update_current_page(page))
                dispatch(update_querys_paginate(`_start=${start}&_limit=${8}`))
                dispatch(update_url())
                return
            }
        }


        if (page > currentPage) {
            if ((page - minLimit) === 4) {
                setMinLimit(minLimit + 1)
                setMaxLimit(maxLimit + 1)
            } else if (page - minLimit === 5) {
                setMinLimit(minLimit + 2)
                setMaxLimit(maxLimit + 2)
            }
        } else if (page < currentPage) {
            if ((page - minLimit) === 2) {
                setMinLimit(minLimit - 1)
                setMaxLimit(maxLimit - 1)
            } else if ((page - minLimit) === 1) {
                setMinLimit(minLimit - 2)
                setMaxLimit(maxLimit - 2)
            }
        }

        dispatch(update_current_page(page))
        dispatch(update_querys_paginate(`_start=${start}&_limit=${8}`))
        dispatch(update_url())

    }




    return (
        <div>
            <br />
            <h1>Slider</h1>

            <hr />
            <br />
            {
                // se mapea lo que tenga el estado local y se crea una card por cada producto 
                // en el estado local
                products && products.map(p => {


                    // console.log(k)
                    return (
                        <>
                            <img src={p.image} alt={p.name} width="800" height='400' />
                            <p>Ventas {p.sales}</p>
                            <h3>{p.name}</h3>
                            <p>{p.seller}</p>
                            <p>Precio: ${p.price}</p>
                            <p>categoria:</p>
                            <li>{p.category.replaceAll("_", " ")}</li>
                            <br />

                            <hr />

                            <br />
                            <br />
                        </>
                    )
                })
            }
            <br />
            <br />
            {currentPage > 0 &&
            <div className="flex">
                <Paginate
                    totalPages={totalPages}
                    minLimit={minLimit}
                    maxLimit={maxLimit}
                    handleClick={handleClick}
                />
            </div>}
            <h1>footer</h1>
        </div>
    )
}


// const Home: React.FC = () => {

//   let dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(get_all_products())
//   }, [])


//   return (
//     <div>
//       {
//         state.map()
//       }
//     </div>
//   );
// };


// export default Home

