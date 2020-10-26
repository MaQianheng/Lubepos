import React from 'react';
import './App.css';
import Header from './components/header/header';
import {Switch, Route, Redirect} from 'react-router-dom';
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
                <Route path='/Lubepos/sales' component={PageSales}/>
                <Route path='/Lubepos/cars' component={PageCars}/>
                <Route path='/Lubepos/customers' component={PageCustomer}/>
                <Route path='/Lubepos/items' component={PageItems}/>
                <Redirect to='/Lubepos/sales'/>
            </Switch>
        </div>
    </div>
  );
}

export default App;
