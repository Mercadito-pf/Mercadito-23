import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Home() {

    let [products, setProducts] = useState([])
    let { url } = useSelector(state => state)
    // let dispatch = useDispatch()
    useEffect(() => {
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
                products && products.map(p => {

                    return(
                        <>
                        <img src={p.image} alt={p.name} width="800" height='400'/>
                        <p>Sales {p.sales}</p>
                        <h3>{p.name}</h3>
                        <p>{p.seller}</p>
                        <p>${p.price}</p>
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

