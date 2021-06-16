import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { urlNum } from "../assets/Urls";

export const NumField = (props) => {
    const {
        values: { woj, pow, gmi, msc, ulc, kod },
        setFieldValue,
    } = useFormikContext();

    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchNum() {
            console.log("Request: fetchNum");

            const response = await fetch(urlNum, {
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
                        v: ulc,
                    },
                    {
                        level: "kod",
                        v: kod,
                    },
                    {
                        level: "nr",
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

        if (woj !== "" && pow !== "" && gmi !== "" && msc !== "" && ulc !== "" && kod !== "") {
            fetchNum();
        }
    }, [woj, pow, gmi, msc, ulc, kod, props.name, setFieldValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setFieldValue(props.name, value);
    };

    return (
        <>
            <select name={props.name} onChange={handleChange}>
                <option value="">wybierz numer</option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </>
    );
};