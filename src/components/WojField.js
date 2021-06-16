import React, { useState, useEffect } from "react";
import { useFormikContext, useField } from "formik";

import { urlWoj } from "../assets/Urls";

export const WojField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [, meta] = useField(props);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchWoj() {
            console.log("Request: fetchWoj");

            const response = await fetch(urlWoj, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([
                    {
                        level: "woj",
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

        fetchWoj();
    }, [props.name, setFieldValue]);

    const handleChange = (event) => {
        const value = event.target.value;

        setFieldValue(props.name, value);
    };

    return (
        <>
            <select name={props.name} onChange={handleChange}>
                <option value="">wybierz województwo</option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {!!meta.touched && !!meta.error && (
                <div style={{ color: "red" }}>{meta.error}</div>
            )}
        </>
    );
};