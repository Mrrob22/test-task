import React from "react";

export const Weather_info = ({state}) => (
    <div>
        {state.city &&
            <div>
                <p>Местоположение: {state.city}, {state.country}</p>
                <p>Температура: {state.temp}</p>
                <p>Восход солнца: {state.sunrise}</p>
                <p>Закат солнца: {state.sunset}</p>
            </div>
        }
    </div>
);
