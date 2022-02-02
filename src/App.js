import React from "react";

import "./App.css";
import Info from "./Components/Info";
import Form from "./Components/Form";
import Weather_info from "./Components/Weather_info";

const API_KEY = "0026a7482713c18fc1f16d74d7ee751f";

class App extends React.Component{

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        let city = e.target.elements.city.value;
        if (city){
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

            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                sunrise: sunrise_date,
                sunset: sunset_date,
                error: "",
            });
        }
    }

    render() {
        return (
        <div>
            <Info />
            <Form weatherMethod = {this.gettingWeather}/>
            <Weather_info
                temp = {this.state.temp}
                city = {this.state.city}
                country = {this.state.country}
                sunrise = {this.state.sunrise}
                sunset = {this.state.sunset}
                error = {this.state.error}
            />
        </div>
        );
    }
}

export default App;