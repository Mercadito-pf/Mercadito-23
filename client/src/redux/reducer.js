import { UPDATE_URL } from "./actionsTypes";

let initState={
    url: "http://localhost:3001/products"
}

function reducer(state = initState, action){
    switch (action.type) {
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