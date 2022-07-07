import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import Home from '../src/Componentes/Home';
import CreateProduct from './Componentes/CreateProduct';
import ProductDetail from './Componentes/ProductDetail';
import UserProfile from './Componentes/UserProfile';
import History from './Componentes/History';

function App() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/createProduct' component={CreateProduct} />
          <Route exact path='/productDetail/:productId' component={ProductDetail}/>
          <Route exact path='/profile/:userId' component={UserProfile} />
          <Route exact path='/history/:userId' component={History} />
          <Route exact path='' />
        </Switch>
      </div>
    );
  }

export default App;
