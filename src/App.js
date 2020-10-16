import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import {Switch, Router, Route, Redirect} from 'react-router-dom';
import PageCars from "./components/cars/page-cars";
import PageCustomer from "./components/customers/page-customers";
import PageProducts from "./components/products/page-products";

function App() {
  return (
    <div className="App">
        <div className="main">
            <Header/>
            <Switch>
                {/*<Redirect to='/sales'/>*/}
                <Route path='/cars' component={PageCars}/>
                <Route path='/customers' component={PageCustomer}/>
                <Route path='/products' component={PageProducts}/>
            </Switch>
        </div>
    </div>
  );
}

export default App;
