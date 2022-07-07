import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../redux/actions";

export default function Home() {

    let { products } = useSelector(state => state)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_all_products())
    }, [])


    return (
        <div>
            <h1>Nav</h1>
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

