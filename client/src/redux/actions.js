import { SET_CURRENT_PAGE, UPDATE_URL } from "./actionsTypes"

// se obtiene la url que debe enviar componente que despache esta accion y se pasa como payload
// para modificar el estado global url
function update_url(url) {
    return{
        type: UPDATE_URL,
        payload: url
    }
}

function setCurrentPage(page){
    return{
        type:SET_CURRENT_PAGE,
        payload:page
    }
}

// exporto todas las funciones
export {
    update_url,
    setCurrentPage
}