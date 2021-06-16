import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { urlStreet } from "../assets/Urls";

export const StreetField = (props) => {
    const {
        values: { woj, pow, gmi, msc },
        setFieldValue,
    } = useFormikContext();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchStreet() {
            console.log("Request: fetchStreet");

            const response = await fetch(urlStreet, {
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
                        v: gmi,
                    },
                    {
                        level: "msc",
                        v: msc,
                    },
                    {
                        level: "ulc",
                        q: "ulc",
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

        if (woj !== "" && pow !== "" && gmi !== "" && msc !== "") {
            fetchStreet();
        }
    }, [woj, pow, gmi, msc, props.name, setFieldValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setFieldValue(props.name, value);
    };

    return (
        <>
            <select name={props.name} onChange={handleChange}>
                <option value="">wybierz ulicę</option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>

        </>
    );
};