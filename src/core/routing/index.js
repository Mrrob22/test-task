import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {MainPage} from '../../Pages/MainPage'
import {DetailCityPage} from '../../Pages/DetailCityPage'

export const RouteComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' element={<MainPage />} />
                <Route path = '/:cityName' element={<DetailCityPage />} />
            </Routes>
        </BrowserRouter>
    )
}