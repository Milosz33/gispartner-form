import {NavLink} from "react-router-dom";
import React from "react";
import "../scss/NotFound.scss"


const NotFound = () => (

    <div className="notfound-box">
        <h1>404 - Not Found!</h1>
        <NavLink to="/">
            Go Home
        </NavLink>
    </div>
);

export default NotFound;