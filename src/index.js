import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter, Switch, Route} from 'react-router-dom'
import thunk from 'redux-thunk'
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import reducer from "./redux/reducer";
import PageLogin from "./pages/page-login";

const store = createStore(reducer, compose(
    applyMiddleware(thunk), //解决redux异步问题
    window.devToolsExtension ? window.devToolsExtension() : f => f // chrome控制台redux工具
))

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <HashRouter>
            <Route path='/login' component={PageLogin}></Route>
            <Route component={App}></Route>
            {/*<App/>*/}
        </HashRouter>
    </Provider>,
// </React.StrictMode>,
document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
