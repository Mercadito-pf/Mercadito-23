import logo from './logo.svg';
import './App.css';
import Home from './Componentes/Home';
import NavBar from './Componentes/NavBar/NavBar';
import { Route } from 'react-router-dom'

function App() {
  return (
    <div >
       <NavBar />
      <Route path="/" component={Home} />
      {/* <Route path="/detail:id" component={Detail}/> */}
      {/* <Route path="/favorites" component={Favorites} /> */}
      {/* <Route path="/my-shoping" component={Shoping} /> */}
      {/* <Route path="/shoping-car" component={ShopingCar} /> */}
       {/* <Route path="/login" component={Login} /> */}
    </div>
  );
}

export default App;
