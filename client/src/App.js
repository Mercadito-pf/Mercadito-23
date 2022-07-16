import logo from './logo.svg';
import './App.css';
import Home from './Componentes/Home/Home.jsx';
import NavBar from './Componentes/NavBar/NavBar.jsx';
import { Route, useLocation } from 'react-router-dom'
import CreateProduct from './Componentes/CreateProduct/CreateProduct';

function App() {
  let {pathname} = useLocation()
  return (
    <div >
      
      {pathname !== "/login" && pathname!=="/create"&&<NavBar/>}
      <Route exact path="/" component={Home} />
      {/* <Route path="/detail/:id" component={Detail}/> */}
      {/* <Route path="/favorites" component={Favorites} /> */}
      {/* <Route path="/my-shoping" component={Shoping} /> */}
      {/* <Route path="/shoping-car" component={ShopingCar} /> */}
       {/* <Route path="/login" component={Login} /> */}
       {/* gfvkhgfkhgf */}
       <Route path="/create" component={CreateProduct} />
    </div>
  );
}

export default App;
