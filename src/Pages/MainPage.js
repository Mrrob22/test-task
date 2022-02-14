import React, {useEffect, useState} from "react";

// import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from "../Components/Info";
import {Form} from "../Components/Form";
import {Weather_info} from "../Components/Weather_info";
import {WeatherCard} from "../Components/WeatherCard";

const API_KEY = process.env.REACT_APP_API_KEY;

export const MainPage = () => {
    const [localState, setLocalState] = useState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    })
    const [selectedCities, setSelectedCities] = useState([])

    useEffect(() => {
        const SelectedCities = JSON.parse(localStorage.getItem('selectedCities'))
        if (SelectedCities.join(',') !== selectedCities.join(',')){
            setSelectedCities(SelectedCities)
        }
    },[selectedCities, localStorage.getItem('selectedCities')])

    const gettingWeather = async (e) => {
        e.preventDefault();
        let city = e.target.elements.city.value;
        if (city){
            const localCitiesArray = localStorage.getItem('selectedCities')
            let selectedCities = [];
            if (localCitiesArray){
                selectedCities = JSON.parse(localCitiesArray)
            }
            !selectedCities.includes(city) && selectedCities.push(city)
            localStorage.setItem('selectedCities', JSON.stringify(selectedCities))
            const api_url = await
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();

            let sunset = data.sys.sunset;
            let dateSunset = new Date();
            dateSunset.setTime(sunset);
            let sunset_date = dateSunset.getHours() + ":" + dateSunset.getMinutes() + ":" + dateSunset.getSeconds() + " P.M.";

            let sunrise= data.sys.sunrise;
            let dateSunrise = new Date();
            dateSunrise.setTime(sunrise);
            let sunrise_date = dateSunrise.getHours() + ":" + dateSunrise.getMinutes() + ":" + dateSunrise.getSeconds() + " A.M.";

            setLocalState({
                temp: Math.round(data.main.temp),
                city: data.name,
                country: data.sys.country,
                sunrise: undefined,
                sunset: undefined,
                error: undefined,
            });
        } else {
            setLocalState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Введите город"
            })
        }
    }

    return (
        <div className="wrapper">
            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 info">
                            <Info/>
                        </div>
                        <div className="col-sm-7 form">
                            <Form weatherMethod={gettingWeather}/>
                            <Weather_info state={localState}/>
                        </div>
                        <div className="d-flex">
                            {selectedCities.length?(
                                selectedCities.map(city => (
                                    <WeatherCard cityName={city} key={city} setSelectedCities={setSelectedCities}/>
                                ))
                            ):null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}