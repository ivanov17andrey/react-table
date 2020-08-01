import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ClassNames from "classnames";

function AddForm(props) {

  return (
    <Formik
      initialValues={{
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      }}
      validationSchema={Yup.object({
        id: Yup.string().max(4, "< 4 symbols").required("Required"),
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string()
          .max(13, "Must be 13 characters or less")
          .required("Required"),
      })}
			onSubmit={(values, {resetForm}) => {
				props.handleAddToTable(values);
				resetForm({values: ""});
				props.handleHideForm();
			}}
    >
      {({ isValid, dirty, touched, errors }) => (
        <Form className={"form-row mb-3"}>
          <div className="col-1">
            <Field
              name="id"
              type="number"
              placeholder={"id"}
              className={ClassNames("form-control", {
                "is-invalid": touched.id && errors.id,
              })}
            />
            <ErrorMessage
              component={"div"}
              name="id"
              className={"invalid-feedback"}
            />
          </div>
          <div className="col">
            <Field
              name="firstName"
              type="text"
              placeholder={"firstName"}
              className={ClassNames("form-control", {
                "is-invalid": touched.firstName && errors.firstName,
              })}
            />
            <ErrorMessage
              component={"div"}
              name="firstName"
              className={"invalid-feedback"}
            />
          </div>
          <div className="col">
            <Field
              name="lastName"
              type="text"
              placeholder={"lastName"}
              className={ClassNames("form-control", {
                "is-invalid": touched.lastName && errors.lastName,
              })}
            />
            <ErrorMessage
              component={"div"}
              name="lastName"
              className={"invalid-feedback"}
            />
          </div>
          <div className="col">
            <Field
              name="email"
              type="email"
              placeholder={"email"}
              className={ClassNames("form-control", {
                "is-invalid": touched.email && errors.email,
              })}
            />
            <ErrorMessage
              component={"div"}
              name="email"
              className={"invalid-feedback"}
            />
          </div>
          <div className="col">
            <Field
              name="phone"
              type="tel"
              placeholder="(999)999-9999"
              className={ClassNames("form-control", {
                "is-invalid": touched.phone && errors.phone,
              })}
            />
            <ErrorMessage
              component={"div"}
              name="phone"
              className={"invalid-feedback"}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              className={"btn btn-dark"}
            >
              Добавить в таблицу
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddForm;
