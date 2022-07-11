import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products, update_current_page, update_querys_filter, update_querys_paginate, update_url } from "../redux/actions";
import Paginate from "./pagination/Paginate";
// import s from './home.module.css'


export default function Home() {

    let[viewAllProducts, setViewAllProducts] = useState(false)
    let [products, setProducts] = useState([])
    let [productsAll, setProductsAll] = useState([])
    let [minLimit, setMinLimit] = useState(1)
    let [maxLimit, setMaxLimit] = useState(6)
    const [productsPerpage, setproductsPerpage] = useState(8)

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
            let res = await fetch(`http://localhost:3001/products?_start=${0}&_limit=${productsPerpage}`).then(res => res.json())
            setProducts(res)

        })()

    }, [url, productsPerpage])

    useEffect(() => {

        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            let res = await fetch(' http://localhost:3001/products').then(res => res.json())
            setProductsAll(res)
        })()

    }, [])



    
    const totalProducts = productsAll.length
    const totalPages = Math.ceil(totalProducts / productsPerpage)
    const end = currentPage * productsPerpage
    const start = end - productsPerpage

    // console.log(start)


    // controla los datos que los datos que se renderizan en cada pagina
    function handleClick(page) {
        if (totalPages > maxLimit) {
            if (page > 0 && page < 4) {
                setMinLimit(1)
                setMaxLimit(6)
                dispatch(update_current_page(page))
                dispatch(update_querys_paginate(`_start=${start}&_limit=${16}`))
                dispatch(update_url())
                return
            }
            if (page <= totalPages && page > (totalPages - 4)) {
                setMinLimit(totalPages - 6)
                setMaxLimit(totalPages - 1)
                dispatch(update_current_page(page))
                dispatch(update_querys_paginate(`_start=${start}&_limit=${16}`))
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
        dispatch(update_querys_paginate(`_start=${start}&_limit=${16}`))
        dispatch(update_url())

    }

    // hace que se mustren todos los productos en divididos en paginas de 16 productos
    function viewAll(e){
        e.preventDefault()
        setViewAllProducts(true)
        dispatch(update_current_page(1))
        dispatch(get_all_products())
        setproductsPerpage(16)
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
                            <img src={p.image} alt={p.name} />
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
            {
                // opcion para ver todos los productos
                 !url.length && <a onClick={viewAll} href="!#">Ver todos los productos</a>
            }
           
            {viewAllProducts || currentPage>0?
            <div className="flex">
                <Paginate
                    totalPages={totalPages}
                    minLimit={minLimit}
                    maxLimit={maxLimit}
                    handleClick={handleClick}
                />
            </div>:null}
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

