import React from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {MainPage} from '../../Pages/MainPage'

export const RouterComponent = () => {
    return (
        <BrowserRouter>
                <Route exact path = '/' component = {MainPage} />
                {/*<Route path = '/:cityName' component = {DetailForecastComponent} />*/}
        </BrowserRouter>
    )
}