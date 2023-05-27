import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { signInURL } from "../../utilities/constants";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const emailRegex = /^[\w\-.]+@(stud.)?noroff.no$/;
const schema = yup.object().shape({
  email: yup.string().matches(emailRegex, "Invalid email.").required(),
  password: yup.string().min(8).required(),
});

/**
 * displays a sign in form. When the form submits, sends the data to the api and if success, navigates the user
 * to the profile page, if an error occurs, displays an error message.
 */
export default function SignInUser() {
  const [submitting, setSubmitting] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  async function onSubmit(data) {
    setSubmitting(true);
    setSignInError(null);

    try {
      const response = await axios.post(signInURL, data);
      setAuth(response.data);
      navigate("/profile");
      navigate(0);
    } catch (error) {
      setSignInError(error.response.data.errors[0].message.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        email: "",
        password: "",
      }}>
      {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
        <Container className="mt-5 mb-5">
          <p className="text-danger fs-5">{signInError ? signInError + " please try again" : null}</p>
          <Form className="mt-3" noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  data-cy="signIn"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid email address</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingInputPassword" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  data-cy="signInPassword"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide more then 8 characters</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" data-cy="signInButton">
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}
