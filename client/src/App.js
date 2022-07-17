import logo from "./logo.svg";
import "./App.css";
import Home from "./Componentes/Home/Home.jsx";
import NavBar from "./Componentes/NavBar/NavBar.jsx";
import { Route, useLocation } from "react-router-dom";
import CreateProduct from "./Componentes/CreateProduct/CreateProduct";
import { useDispatch } from "react-redux";
import { authenticate } from "./redux/user/userActions";
import { useEffect } from "react";
import Login from "./Componentes/Login/Login";
import Register from "./Componentes/Register/Register";
import NewPassword from "./Componentes/NewPassword/NewPassword";
import ForgotPassword from "./Componentes/ForgotPassword/ForgotPassword";
import Detail from "./Componentes/detail/Detail";
// import Detail from "./Componentes/detail/Detail";

function App() {
  
  let { pathname } = useLocation();

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(authenticate());
  }, []);

  return (
    <div>
      {pathname !== "/login" && pathname!=="/create"&&pathname!=="/register"&&pathname!=="/forgot-password"&&<NavBar/>}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/new-password/:token" component={NewPassword} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail}/>
      {/* <Route path="/favorites" component={Favorites} /> */}
      {/* <Route path="/my-shoping" component={Shoping} /> */}
      {/* <Route path="/shoping-car" component={ShopingCar} /> */}
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/create" component={CreateProduct} />
    </div>
  );
}

export default App;
