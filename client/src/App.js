import logo from "./logo.svg";
import { Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Componentes/Home/Home";
import NavBar from "./Componentes/NavBar/NavBar";

import Detail from "./Componentes/Detail/Detail.jsx";
import Login from "./Componentes/Login/Login";
import Register from "./Componentes/Register/Register";
import NewPassword from "./Componentes/NewPassword/NewPassword";
import ForgotPassword from "./Componentes/ForgotPassword/ForgotPassword";

function App() {
  let { pathname } = useLocation();
  return (
    <>
      <div>
        {/* 
  <Route exact path="/" component={Home} /> */}

        {pathname !== "/login" &&
          pathname !== "/register" &&
          pathname !== "/new-password" &&
          pathname !== "/forgot-password" && <NavBar />}

        <Route exact path="/login" component={Login} />
        <Route eaxct path="/register" component={Register} />
        <Route eaxct path="/new-password" component={NewPassword} />
        <Route eaxct path="/forgot-password" component={ForgotPassword} />

        <Route exact path="/" component={Home} />
        <Route path="/detail/:id" component={Detail} />

        {/* <Route path="/favorites" component={Favorites} /> */}
        {/* <Route path="/my-shoping" component={Shoping} /> */}
        {/* <Route path="/shoping-car" component={ShopingCar} /> */}
      </div>
    </>
  );
}

export default App;
