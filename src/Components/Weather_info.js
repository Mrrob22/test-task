import React from "react";

export const Weather_info = ({state}) => (
    <div className="infoWeath">
        {state.city &&
            <div>
                <p>Местоположение: {state.city}, {state.country}</p>
                <p>Температура: {state.temp}</p>
            </div>
        }
        <p className="error">{state.error}</p>
    </div>
);
