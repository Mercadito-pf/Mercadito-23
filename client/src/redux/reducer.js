import { SET_CURRENT_PAGE, UPDATE_CURRENT_PAGE, UPDATE_QUERYS, UPDATE_QUERYS_FILTER, UPDATE_QUERYS_PAGINATE, UPDATE_QUERYS_SEARCH, UPDATE_URL } from "./actionsTypes";

let initState={
    url: "",
    currentPage:0,
    querys:[`_start=${0}&_limit=${8}`]
}

function reducer(state = initState, action){
    switch (action.type) {
        // se modifica el estado global [url] para que los componentes suscritos a dicho estado 
        // realicen una peticion a la api
        case UPDATE_QUERYS_PAGINATE:
            return{
                ...state,
                querys: state.querys.map((q, i) => {
                    if(i === 0){
                        return action.payload
                    } else{
                        return q
                    }
                }),
                // url:`http://localhost:3001/products?${state.querys.join("&")}`
            }
            
        case UPDATE_QUERYS_FILTER:
            return{
                ...state,
                querys: [`_start=${0}&_limit=${8}`, action.payload],
                currentPage:1
            }
        case UPDATE_URL:
            return{
                ...state,
                url:`http://localhost:3001/products?${state.querys.join("&")}`
            }

        case UPDATE_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
    
        default:
            return state;
    }
}

export default reducer