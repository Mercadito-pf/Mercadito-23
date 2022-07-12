import axios from 'axios';

import { GET_ALL_PRODUCTS, 
    UPDATE_CURRENT_PAGE, 
    UPDATE_QUERYS_FILTER, 
    UPDATE_QUERYS_ORDER, 
    UPDATE_QUERYS_PAGINATE, 
    UPDATE_URL,
    // GET_PRODUCT_ID
} from "./actionsTypes"

function update_querys_filter(query) {
    return{
        type: UPDATE_QUERYS_FILTER,
        payload: query
    }
}
function update_querys_order(query) {
    return{
        type: UPDATE_QUERYS_ORDER,
        payload: query
    }
}

function update_querys_paginate(query) {
    return{
        type: UPDATE_QUERYS_PAGINATE,
        payload: query
    }
}

function update_url(){
    return{
        type:UPDATE_URL
    }
}

function update_current_page(page){
    return{
        type:UPDATE_CURRENT_PAGE,
        payload:page

    }
}
function get_all_products(){
    return{
        type:GET_ALL_PRODUCTS
    }
}

// function get_id(id){
//     try{
//         return function (dispatch){
//           const dbProduct =  axios.get(`http://localhost:3001/products/${id}`);
//           return dispatch({
//             type:GET_PRODUCT_ID,
//             payload: dbProduct
//           })
//         }
//     }
//     catch(e){
//         alert("Algo salio mal al traer producto")
//         console.log("error al traer producto por id",e)
//     }
// }


// exporto todas las funciones
export {
    update_url,
    update_querys_filter,
    update_querys_order,
    update_querys_paginate,
    update_current_page,
    get_all_products,
    // get_id
}