import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products, update_current_page, update_querys_filter, update_querys_paginate, update_url } from "../../redux/actions";
import Paginate from "../pagination/Paginate.jsx";
import Slider from "../Slider/Slider.jsx";
import Footer from "../Footer/Footer.jsx";
import Cards from "../Card/Card.jsx";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";



export default function Home() {

    let [viewAllProducts, setViewAllProducts] = useState(false)
    let [products, setProducts] = useState([])
    let [productsAll, setProductsAll] = useState([])
    let [minLimit, setMinLimit] = useState(1)
    let [maxLimit, setMaxLimit] = useState(6)
    const [productsPerpage, setproductsPerpage] = useState(8)

    let dispatch = useDispatch()

    // traigo el estado global
    let { url, currentPage } = useSelector(state => state)

    useEffect(() => {

        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            let res = await fetch(' http://localhost:3001/products').then(res => res.json())
            setProductsAll(res)
        })()

    }, [])

    // se hara una peticion a la api cada vez que se monte el componente o se actualice el estado
    // global [url]
    useEffect(() => {
        document.body.scrollIntoView();
        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            if (url.length) {
                let res = await fetch(url).then(res => res.json())
                // console.log(url)
                setProducts(res)
                return
            }
            let random = Math.floor(Math.random() * ((productsAll.length-17) - 0) + 0);
            let res = await fetch(`http://localhost:3001/products?_start=${random}&_limit=${productsPerpage}`).then(res => res.json())
            setProducts(res)

        })()

    }, [url, productsPerpage, productsAll])

   


    const totalProducts = url?.length && !viewAll?products.length: productsAll.length
    const totalPages = Math.ceil(totalProducts / productsPerpage)


    // controla los datos que los datos que se renderizan en cada pagina
    function handleClick(page) {
        const end = page * productsPerpage
        const start = end - productsPerpage
        dispatch(update_querys_paginate(`_start=${start}&_limit=${16}`))
        dispatch(update_url())
        if (totalPages > maxLimit) {
            if (page > 0 && page < 4) {
                setMinLimit(1)
                setMaxLimit(6)
                dispatch(update_current_page(page))
                return
            }
            if (page <= totalPages && page > (totalPages - 4)) {
                setMinLimit(totalPages - 6)
                setMaxLimit(totalPages - 1)
                dispatch(update_current_page(page))
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

    }

    // hace que se mustren todos los productos en divididos en paginas de 16 productos
    function viewAll(e) {
        e.preventDefault()
        setViewAllProducts(true)
        dispatch(update_current_page(1))
        dispatch(get_all_products())
        setproductsPerpage(16)
    }

    return (
        <div>
            <NavBar />
            <br />
            <Slider />
            <hr />
            <br />
            {
                // se mapea lo que tenga el estado local y se crea una card por cada producto 
                // en el estado local

                products.products && products?.products.map((p) => {


                    return( 
                        <Link to={`/detail/${p.id}`}>
                         <Cards key={p.id} id={p.id}image={p.image} name={p.name} seller={p.seller} sales={p.sales} price={p.price}/>
                        </Link>)
                       

                    // console.log(k)  

                })
            }
            <br />
            <br />
            {
                // opcion para ver todos los productos
                !url?.length && (
                <div onClick={viewAll}>
                    <Link to="/">Ver todos los productos</Link>
                </div>
                
                )
            }

            {viewAllProducts || currentPage > 0 ?
                <div className="flex">
                    <Paginate
                        totalPages={totalPages}
                        minLimit={minLimit}
                        maxLimit={maxLimit}
                        handleClick={handleClick}
                    />
                </div> : null}
            <Footer />
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

