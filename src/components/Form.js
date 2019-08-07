import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import UserList from "./UserList";

const SignupForm = ({ values, errors, touched, handleSubmit, status }) => {
  const [users, setUsers] = useState(["STUFF"]);
  console.log("Users Array:", users);

  useEffect(() => {
    console.log("infinite loop?");
    setUsers([...users, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <Field type="text" name="username" placeholder="Username" />
        <Field type="text" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
        </label>

        <button type="submit">Submit</button>
        <div>
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
        </div>
        <div>
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>
        <div>
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
      </Form>
      <UserList users={users} />
    </div>
  );
};

const FormikSignupForm = withFormik({
  mapPropsToValues({ username, email, password, termsOfService }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      termsOfService: termsOfService || false
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    if (values.email === "abc@gmail.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          resetForm();
          setSubmitting(false);
          setStatus(res.data);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(SignupForm);

export default FormikSignupForm;
