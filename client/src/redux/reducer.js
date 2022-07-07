import { UPDATE_URL } from "./actionsTypes";

let initState={
    url: "http://localhost:3001/products"
}

function reducer(state = initState, action){
    switch (action.type) {
        // se modifica el estado global [url] para que los componentes suscritos a dicho estado 
        // realicen una peticion a la api
        case UPDATE_URL:
            return{
                ...state,
                url: action.payload
            }
    
        default:
            return state;
    }
}

export default reducer