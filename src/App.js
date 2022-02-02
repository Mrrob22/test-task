import React, {useEffect, useState} from "react";

import "./App.css";
import Info from "./Components/Info";
import {Form} from "./Components/Form";
import {Weather_info} from "./Components/Weather_info";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
    const [localState, setLocalState] = useState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    })
    useEffect(() => {
        const selectedCities = JSON.parse(localStorage.getItem('selectedCities'))
        console.log('selectedCities =', selectedCities)
    })
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
            console.log("selectedCities = ",selectedCities)
            const api_url = await
                // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=${API_KEY}&units=metric`);
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();
            console.log(data, " = data");

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
                sunrise: sunrise_date,
                sunset: sunset_date,
                error: "",
            });
        }
    }

    console.log(process.env.REACT_APP_API_KEY)
    return (
    <div>
        <Info/>
        <Form weatherMethod={gettingWeather}/>
        <Weather_info state={localState}/>
    </div>
    );
}

export default App;