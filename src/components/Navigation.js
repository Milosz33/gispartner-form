import React from "react";
import { NavLink } from "react-router-dom";


export const Navigation = () => {
    return (
        <header>
            <h1>Formularz Rejestracyjny</h1>
            <ul className="navigation">
                <li key={"form"}><NavLink exact to={"/form"}>zapisz się</NavLink></li>
                <li key={"list"}><NavLink exact to={"/list"}>lista użytkowników</NavLink></li>
            </ul>
        </header>
    )
};
