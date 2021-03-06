import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { urlGmina } from "../assets/Urls";

export const GminaField = (props) => {
    const {
        values: { woj, pow },
        setFieldValue,
    } = useFormikContext();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchGmina() {
            console.log("Request: fetchGmina");

            const response = await fetch(urlGmina, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([
                    {
                        level: "woj",
                        v: woj,
                    },
                    {
                        level: "pow",
                        v: pow,
                    },
                    {
                        level: "gmi",
                        q: "",
                    },
                ]),
            });
            const data = await response.json();
            const options = data.map((item) => ({
                value: item.value,
                label: item.value,
            }));      setOptions(options);
        }
        if (woj !== "" && pow !== "") {
            fetchGmina();
        }
    }, [woj, pow, props.name, setFieldValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setFieldValue(props.name, value);
    };

    return (
        <>
            <select name={props.name} onChange={handleChange}>
                <option value="">wybierz gminę</option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </>
    );
};