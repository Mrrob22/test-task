import React from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouteComponent} from './core/routing'

const App = () => {
    return (
        <div className="wrapper">
            <RouteComponent/>
        </div>
    )
}

export default App;