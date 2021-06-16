import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../scss/RegisterForm.scss";
import "../scss/select.scss";
import { WojField } from "./WojField";
import { PowField } from "./PowField";
import { GminaField } from "./GminaField";
import { CityField } from "./CityField";
import { PostCodeField } from "./PostCodeField";
import { NumField } from "./NumField";
import {StreetField} from "./StreetField";

const RegisterForm = () => {
    return (
        <div className="form-container">
            <Formik
                initialValues={{ name: "", lastname: "", email: "", woj: "", pow: "", gmina: "", city: "", street: "",  postCode: "", num: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "e-mail jest wymagany";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = "podany adres jest niepoprawny";
                    }
                    if (!values.name) {
                        errors.name = "imię jest wymagane";
                    } else if (values.name.length < 2) {
                        errors.name = "imię jest za krótkie";
                    }
                    if (!values.lastname) {
                        errors.lastname = "nazwisko jest wymagane";
                    } else if (values.lastname.length < 2) {
                        errors.lastname = "nazwisko jest za krótkie";
                    }
                    if (values.woj === "") {
                        errors.woj = "wybierz województwo";
                    }
                    if (values.pow === "") {
                        errors.pow = "wybierz powiat";
                    }
                    if (values.gmina === "") {
                        errors.gmina = "wybierz gminę";
                    }
                    if (values.city === "") {
                        errors.city = "wybierz miejscowość";
                    }
                    if (values.street === "") {
                        errors.street = "wybierz ulicę";
                    }
                    if (values.postCode === "") {
                        errors.postCode = "wybierz kod pocztowy";
                    }
                    if (values.num === "") {
                        errors.num = "wybierz numer";
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <>
                        <Form>
                            <h2>Rejestracja</h2>
                            <h4>Imię</h4>
                            <Field
                                className="name"
                                placeholder="Twoje imię"
                                type="text"
                                name="name"
                            />
                            <ErrorMessage
                                className="error-message"
                                name="name"
                                component="div"
                            />
                            <h4>Nazwisko</h4>
                            <Field
                                className="lastname"
                                placeholder="Twoje nazwisko"
                                type="text"
                                name="lastname"
                            />
                            <ErrorMessage
                                className="error-message"
                                name="lastname"
                                component="div"
                            />
                            <h4>wprowadź swój e-mail</h4>
                            <Field
                                className="email"
                                placeholder="e-mail"
                                type="email"
                                name="email"
                            />
                            <ErrorMessage
                                className="error-message"
                                name="email"
                                component="div"
                            />
                            <h4>wybierz województwo</h4>
                            <WojField name="woj" />
                            <ErrorMessage
                                className="error-message"
                                name="woj"
                                component="div"
                            />

                            <h4>wybierz powiat</h4>
                            <PowField name="pow" />
                            <ErrorMessage
                                className="error-message"
                                name="pow"
                                component="div"
                            />

                            <h4>wybierz gminę</h4>
                            <GminaField name="gmina" />
                            <ErrorMessage
                                className="error-message"
                                name="gmina"
                                component="div"
                            />

                            <h4>wybierz miejscowość</h4>
                            <CityField name="city" /><ErrorMessage
                            className="error-message"
                            name="city"
                            component="div"
                        />

                            <h4>wybierz ulicę</h4>
                            <StreetField name="street" />
                            <ErrorMessage
                                className="error-message"
                                name="street"
                                component="div"
                            />

                            <h4>wybierz kod pocztowy</h4>
                            <PostCodeField name="postCode" />
                            <ErrorMessage
                                className="error-message"
                                name="postCode"
                                component="div"
                            />

                            <h4>wybierz numer</h4>
                            <NumField name="num" />
                            <ErrorMessage
                                className="error-message"
                                name="num"
                                component="div"
                            />

                            <div>
                                <button
                                    className="form-btn"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Wyślij
                                </button>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;