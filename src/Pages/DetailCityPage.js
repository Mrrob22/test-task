import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

export const DetailCityPage = () =>{
    let { cityName } = useParams();
    console.log('cityName =', cityName);
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(() =>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then (async response => {
                const weather = await response.json()
                setCurrentWeather(weather)
            });
    }, [cityName])
    console.log('currentWeather =', currentWeather)
    return(
        <div>
            {cityName}
            <div>Температура = {currentWeather ? (Math.round(currentWeather.main.temp)) : null}</div>
            <div>Влажность = {currentWeather ? (Math.round(currentWeather.main.humidity)) : null} %</div>
            <div>Ощущаеться как = {currentWeather ? (Math.round(currentWeather.main.feels_like)) : null}</div>
            <div>Ветер = {currentWeather ? (Math.round(currentWeather.wind.speed)) : null} м/c</div>
            <div>Температрура максимальная/инимальная = {currentWeather ? (Math.round(currentWeather.main.temp_max)) : null} / {currentWeather ? (Math.round(currentWeather.main.temp_min)) : null}</div>
        </div>
    )
}