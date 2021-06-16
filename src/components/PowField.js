import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

import { urlPow } from "../assets/Urls";

export const PowField = (props) => {
    const {
        values: { woj },
        setFieldValue,
    } = useFormikContext();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchPow() {
            console.log("Request: fetchPow");

            const response = await fetch(urlPow, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([
                    {
                        level: "woj",
                        v: woj,
                    },
                    {
                        level: "pow",
                        q: "",
                    },
                ]),
            });
            const data = await response.json();
            const options = data.map((item) => ({
                value: item.value,
                label: item.value,
            }));

            setOptions(options);
        }
        if (woj !== "") {
            fetchPow();
        }
    }, [woj, props.name, setFieldValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setFieldValue(props.name, value);
    };

    return (
        <>
            <select name={props.name} onChange={handleChange}>
                <option value="">wybierz powiat</option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>

        </>
    );
};