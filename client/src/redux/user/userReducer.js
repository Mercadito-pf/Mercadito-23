// Types
import {
  ERROR,
  GET_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actionsTypes";

let initState = {
  profile: "",
  error: "",
};

function userReducer(state = initState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        profile: action.payload,
      };
    case LOGIN_USER:
      return {
        profile: action.payload,
      };
    case REGISTER_USER:
      return {
        profile: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        profile: "",
      };
    case ERROR:
      localStorage.removeItem("token");
      return {
        profile: "",
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
