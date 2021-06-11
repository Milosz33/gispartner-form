import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import "../scss/RegisterForm.scss";




const RegisterForm = () => {
    return(
        <div className="form-container">
            <Formik
                initialValues={{ name:'', lastname:'', email: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'e-mail jest wymagany';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'podany adres jest niepoprawny';
                    }
                    if(!values.name) {
                        errors.name = 'imię jest wymagane';
                    } else if (values.name.length < 2) {
                        errors.name = 'imię jest za krótkie'
                    }
                    if(!values.lastname) {
                        errors.lastname = 'nazwisko jest wymagane';
                    } else if ( values.lastname.length < 2 )
                    {
                        errors.lastname = 'nazwisko jest za krótkie';
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({ isSubmitting }) => (
                    <>
                        <Form>
                            <h2>Rejestracja</h2>
                            <h4>Imię</h4>
                            <Field className="name" placeholder="Twoje imię" type="text" name="name"/>
                            <ErrorMessage className="error-message" name="name" component="div" />
                            <h4>Nazwisko</h4>
                            <Field className="lastname" placeholder="Twoje nazwisko" type="text" name="lastname"/>
                            <ErrorMessage className="error-message" name="lastname" component="div" />
                            <h4> wprowadź swój e-mail</h4>
                            <Field className="email" placeholder="e-mail" type="email" name="email"/>
                            <ErrorMessage className="error-message" name="email" component="div" />

                            <div>
                                <button className="form-btn" type="submit" disabled={isSubmitting}>
                                    Wyślij
                                </button>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    )}

export default RegisterForm;