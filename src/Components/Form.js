import React from "react";

export const Form = ({weatherMethod}) => (
    <form onSubmit={weatherMethod}>
        <input type="text" name="city" placeholder="Город"/>
        <button>Получить погоду</button>
    </form>
);