import React, { useState, useEffect } from "react";
import { useFormikContext, useField } from "formik";
import { urlPostCode } from "../assets/Urls";

export const PostCodeField = (props) => {
    const {
        values: { woj },
        setFieldValue,
    } = useFormikContext();
    const [, meta] = useField(props);
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
                        q: "",
                    },
                    {
                        level: "gmina",
                        q: "",
                    },
                    {
                        level: "city",
                        q: "",
                    },
                    {
                        level: "postCode",
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
            fetchPostCode();
        }
    }, [woj, props.name, setFieldValue]);

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
            {!!meta.touched && !!meta.error && (
                <div style={{ color: "red" }}>{meta.error}</div>
            )}
        </>
    );
};