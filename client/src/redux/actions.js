import { GET_ALL_PRODUCTS } from "./actionsTypes"

const URL ="  http://localhost:3001/products"
function get_all_products() {
    return (dispatch) => {
        // dispatch({ type: IS_LOADING })
        return fetch(URL)
            .then(res => res.json())
            .then(json => {
                return dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: json
                })
            })
            .catch((error) => {
                // dispatch({
                //     type: SET_ERROR
                // })
                console.log(error)
            })
    }
}

export {
    get_all_products
}