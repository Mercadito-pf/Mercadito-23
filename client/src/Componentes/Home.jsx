import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Home() {
    let [products, setProducts] = useState([])

    // traigo el estado global
    let { url } = useSelector(state => state)

    // se hara una peticion a la api cada vez que se monte el componente o se actualice el estado
    // global [url]
    useEffect(() => {

        // autoinvoke function que hace una petcion a la api y la guarda en el estado  local
        (async function(){
            let res = await fetch(url).then(res => res.json())
            setProducts(res)
        })()
        
    }, [url])


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
                    return(
                        <>
                        <img src={p.image} alt={p.name} width="800" height='400'/>
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

