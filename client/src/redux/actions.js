import { UPDATE_URL } from "./actionsTypes"

// const URL ="  http://localhost:3001/products"
function update_url(url) {
    return{
        type: UPDATE_URL,
        payload: url
    }
}

export {
    update_url
}