import React, { useState, useEffect } from "react";
import "./UsersList.scss"

export const UsersList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let users = window.localStorage.getItem("users");
        users = users ? JSON.parse(users) : [];

        setUsers(users);
    }, []);
    window.localStorage.removeItem("users")

    return (
        <div className="users-box">
            {users.map((user, index) => (
                <ol key={index}>
                    <li key={"name"}>imię: {user.name}</li>
                    <li key={"lastname"}>nazwisko: {user.lastname}</li>
                    <li key={"email"}>e-mail: {user.email}</li>
                    <li key={"woj"}>województwo: {user.woj}</li>
                    <li key={"pow"}>powiat: {user.pow}</li>
                    <li key={"gmina"}>gmina: {user.gmi}</li>
                    <li key={"msc"}>miejscowość: {user.msc}</li>
                    <li key={"ulica"}>ulica: {user.ulc}</li>
                    <li key={"kod"}>kod pocztowy: {user.kod}</li>
                    <li key={"num"}>numer: {user.nr}</li>
                </ol>
            ))}
        </div>
    );
};