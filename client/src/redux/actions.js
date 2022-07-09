import { UPDATE_CURRENT_PAGE, UPDATE_QUERYS_FILTER, UPDATE_QUERYS_PAGINATE, UPDATE_URL } from "./actionsTypes"

function update_querys_filter(query) {
    return{
        type: UPDATE_QUERYS_FILTER,
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


// exporto todas las funciones
export {
    update_url,
    update_querys_filter,
    update_querys_paginate,
    update_current_page

}