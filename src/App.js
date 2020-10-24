import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import {Switch, Router, Route, Redirect, DefaultRoute} from 'react-router-dom';
import PageCars from "./components/cars/page-cars";
import PageCustomer from "./components/customers/page-customers";
import PageItems from "./components/items/page-items";
import PageSales from "./components/sales/page-sales";

function App() {
  return (
    <div className="App">
        <div className="main">
            <Header/>
            <Switch>
                {/*<DefaultRoute handler={PageSales}/>*/}
                <Route path='/sales' component={PageSales}/>
                <Route path='/cars' component={PageCars}/>
                <Route path='/customers' component={PageCustomer}/>
                <Route path='/items' component={PageItems}/>
                <Redirect to='/sales'/>
            </Switch>
        </div>
    </div>
  );
}

export default App;
