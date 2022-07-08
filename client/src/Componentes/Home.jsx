import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, update_url } from "../redux/actions";
import Paginate from "./pagination/Paginate";
// import s from './home.module.css'


export default function Home() {
    let [products, setProducts] = useState([])
    let [productsAll, setProductsAll]= useState([])
    let [minLimit, setMinLimit] = useState(1)
    let [maxLimit, setMaxLimit] = useState(6)

    let dispatch = useDispatch()

    // traigo el estado global
    let { url, currentPage } = useSelector(state => state)

    // se hara una peticion a la api cada vez que se monte el componente o se actualice el estado
    // global [url]
    useEffect(() => {

        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function () {
            let res = await fetch(url).then(res => res.json())
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
   


    // const data = products.length || isFilter ? filter : dogs
    const dogsPage = 8
    const end = currentPage * dogsPage
    const start = end - dogsPage
    // const dogsFiltered = data.length && data.slice(start, end)
    const totalDogs = productsAll.length
    const totalPages = totalDogs > 7 ? Math.ceil(totalDogs / dogsPage) : 1


    function handleClick(page) {
        if (totalPages > maxLimit) {
            if (page > 0 && page < 4) {
                setMinLimit(1)
                setMaxLimit(6)
                
            }else if (page <= totalPages && page > (totalPages - 4)) {
                setMinLimit(totalPages - 6)
                setMaxLimit(totalPages - 1)
            }
        } else if (page > currentPage) {
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
        dispatch(setCurrentPage(page))
        dispatch(update_url(`http://localhost:3001/products?_start=${start}&_limit=${8}`))
       
        
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
            <div className="flex">
                <Paginate
                    totalPages={totalPages}
                    minLimit={minLimit}
                    maxLimit={maxLimit}
                    handleClick={handleClick}
                />
            </div>
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

