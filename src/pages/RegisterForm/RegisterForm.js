import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./RegisterForm.scss";
import "../../scss/select.scss";
import { WojField } from "../../components/WojField";
import { PowField } from "../../components/PowField";
import { GminaField } from "../../components/GminaField";
import { CityField } from "../../components/CityField";
import { PostCodeField } from "../../components/PostCodeField";
import { NumField } from "../../components/NumField";
import { StreetField } from "../../components/StreetField";

async function fetchPoint(user) {
  const body = {
    reqs: [
      {
        pkt_numer: user.nr,
        pkt_kodPocztowy: user.kod,
        ul_pelna: user.ulc,
        miejsc_nazwa: user.msc,
      },
    ],
  };
  const response = await fetch("https://capap.gugik.gov.pl/api/fts/gc/pkt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());

  return response?.[0].single?.record.geometry.coordinates || [];
}

const RegisterForm = (props) => {
  console.log(props);
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          woj: "",
          pow: "",
          gmi: "",
          msc: "",
          ulc: "",
          kod: "",
          nr: "",
        }}
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
          if (values.gmi === "") {
            errors.gmi = "wybierz gminę";
          }
          if (values.msc === "") {
            errors.msc = "wybierz miejscowość";
          }
          if (values.ulc === "") {
            errors.ulc = "wybierz ulicę";
          }
          if (values.kod === "") {
            errors.kod = "wybierz kod pocztowy";
          }
          if (values.nr === "") {
            errors.nr = "wybierz numer";
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          let oldUsers = window.localStorage.getItem("users");
          oldUsers = oldUsers ? JSON.parse(oldUsers) : [];
          const geoData = await fetchPoint(values);
          window.localStorage.setItem(
            "users",
            JSON.stringify([
              ...oldUsers,
              {
                name: values.name,
                lastname: values.lastname,
                email: values.email,
                woj: values.woj,
                pow: values.pow,
                gmi: values.gmi,
                msc: values.msc,
                ulc: values.ulc,
                kod: values.kod,
                nr: values.nr,
                geo: geoData,
              },
            ])
          );
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

              <h4>województwo</h4>
              <WojField name="woj" />
              <ErrorMessage
                className="error-message"
                name="woj"
                component="div"
              />

              <h4>powiat</h4>
              <PowField name="pow" />
              <ErrorMessage
                className="error-message"
                name="pow"
                component="div"
              />

              <h4>gmina</h4>
              <GminaField name="gmi" />
              <ErrorMessage
                className="error-message"
                name="gmi"
                component="div"
              />

              <h4>miejscowość</h4>
              <CityField name="msc" />
              <ErrorMessage
                className="error-message"
                name="msc"
                component="div"
              />

              <h4>ulica</h4>
              <StreetField name="ulc" />
              <ErrorMessage
                className="error-message"
                name="ulc"
                component="div"
              />

              <h4>kod pocztowy</h4>
              <PostCodeField name="kod" />
              <ErrorMessage
                className="error-message"
                name="kod"
                component="div"
              />

              <h4>numer</h4>
              <NumField name="nr" />
              <ErrorMessage
                className="error-message"
                name="nr"
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
