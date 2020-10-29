import React from 'react'
import './App.css'
import Header from './components/header/header'
import {Switch, Route, Redirect} from 'react-router-dom'
import PageCars from "./components/cars/page-cars"
import PageCustomer from "./components/customers/page-customers"
import PageItems from "./components/items/page-items"
import PageSales from "./components/sales/page-sales"
import PageSalesReport from "./components/sales-report/page-sales-report";
import {connect} from 'react-redux'
import storageUtils from "./utils/storageUtils"

class App extends React.Component {

    render() {
        const {user} = this.props.user
        let userid = user ? user._id : storageUtils.getUserId()
        if (!userid) {
            return <Redirect to='/login'/>
        }
        return (
            <div className="main">
                <Header/>
                <Switch>
                    {/*<DefaultRoute handler={PageSales}/>*/}
                    <Route path='/sales' component={PageSales}/>
                    <Route path='/sales_report' component={PageSalesReport}/>
                    <Route path='/cars' component={PageCars}/>
                    <Route path='/customers' component={PageCustomer}/>
                    <Route path='/items' component={PageItems}/>
                    <Redirect to='/sales_report'/>
                </Switch>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(App)
