import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

export const WeatherCard = ({cityName, setSelectedCities}) => {
    const history = useNavigate();
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(() =>{
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
                .then (async response => {
                    const weather = await response.json()
                    setCurrentWeather(weather)
                });
    }, [cityName])
    const clickHandler = (cityName) => {
        history(`/${cityName}`)
    }
    const clickHandlerDelete = (cityName) =>{
        const SelectedCities = JSON.parse(localStorage.getItem('selectedCities'))
        localStorage.setItem('selectedCities', JSON.stringify(SelectedCities.filter(city => city!==cityName)))
        setSelectedCities(SelectedCities.filter(city => city!==cityName))
    }
    return (
        currentWeather ? (
            <div> Карточка погоды {cityName}
                <div>temp = {currentWeather ? (Math.round(currentWeather.main.temp)) : null}</div>
                <div className={'d-flex align-center'}>
                    <button onClick={()=>clickHandler(cityName)}>Детальнее</button>
                    <button onClick={()=>clickHandlerDelete(cityName)}>Delete</button>
                </div>
            </div>
        ) : null
    )
}