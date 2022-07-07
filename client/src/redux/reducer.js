import { GET_ALL_PRODUCTS } from "./actionsTypes";

let initState={
    products:[]
}

function reducer(state = initState, action){
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
    
        default:
            return state;
    }
}

export default reducer