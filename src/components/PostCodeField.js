import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { urlPostCode } from "../assets/Urls";

export const PostCodeField = (props) => {
    const {
        values: { woj, pow, gmi, msc, ulc },
        setFieldValue,
    } = useFormikContext();

    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetchPostCode() {
            console.log("Request: fetchPostCode");

            const response = await fetch(urlPostCode, {
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

        if (woj !== "" && pow !== "" && gmi !== "" && msc !== "") {
            fetchPostCode();
        }
    }, [woj, pow, gmi, msc, ulc, props.name, setFieldValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setFieldValue(props.name, value);
    };

    return (
        <>
            <select name={props.name} onChange={handleChange}>
                <option value="">wybierz kod pocztowy</option>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>

        </>
    );
};