import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import {Switch, Router, Route, Redirect} from 'react-router-dom';
import PageCars from "./components/cars/page-cars";
import PageCustomer from "./components/customers/page-customers";

function App() {
  return (
    <div className="App">
        <div className="main">
            <Header/>
            <Switch>
                <Route path='/cars' component={PageCars}/>
                {/*<Redirect to='/sales'/>*/}
                <Route path='/customers' component={PageCustomer}/>
                {/*<Route path='/cars' component={CarTable}/>*/}
            </Switch>
        </div>
    </div>
  );
}

export default App;
