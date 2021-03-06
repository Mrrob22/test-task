import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import App from './App';
import IndexReducer from './Reducers/IndexReducer';

const store = createStore( IndexReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        {/*<BrowserRouter>*/}
            <App/>
        {/*</BrowserRouter>*/}
    </Provider>,
    document.getElementById('root')
);