import logo from './logo.svg';
import { Route, useLocation } from 'react-router-dom'
import './App.css';
import Home from './Componentes/Home';
import NavBar from './Componentes/NavBar/NavBar';

import Detail from './Componentes/Detail/Detail.jsx'



function App() {
  let {pathname} = useLocation()
  return (
    
    <div >

      <Route exact path="/" component={Home} />
      
      {pathname !== "/login" && <NavBar/>}
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail}/>

      {/* <Route path="/favorites" component={Favorites} /> */}
      {/* <Route path="/my-shoping" component={Shoping} /> */}
      {/* <Route path="/shoping-car" component={ShopingCar} /> */}
       {/* <Route path="/login" component={Login} /> */}
    </div>
  );
}

export default App;
