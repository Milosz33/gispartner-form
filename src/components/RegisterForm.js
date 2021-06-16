import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import "../scss/RegisterForm.scss";
import {urlWoj} from "../assets/Urls";



const RegisterForm = () => {
    const [woj, setWoj] = useState([]);

       const HandleDataSelect = async () => {
           const response = await fetch(urlWoj, {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify([
                   {
                       level: 'woj',
                       q: ''
                   }])
           })
           const data = await response.json();
           setWoj(data);

       };
           useEffect(() => {
               HandleDataSelect();
           }, []);

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
                            <h4>wprowadź swój e-mail</h4>
                            <Field className="email" placeholder="e-mail" type="email" name="email"/>
                            <ErrorMessage className="error-message" name="email" component="div" />

                            <h4>wybierz województwo</h4>
                            <select onChange={HandleDataSelect}  id="select-region">
                                <option value={}>województwo</option>
                            </select>
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
    )};

export default RegisterForm;