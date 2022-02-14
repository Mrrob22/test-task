import React from "react";

export const Form = ({weatherMethod}) => (
    <form onSubmit={weatherMethod}>
        <input type="text" name="city" placeholder="Город"/>
        <button>Узнать погоду</button>
    </form>
);