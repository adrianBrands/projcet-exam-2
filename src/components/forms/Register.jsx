import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { authRegisterURL } from "../../utilities/constants";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[\w\-.]+@(stud.)?noroff.no$/;
const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().matches(emailRegex, "Invalid email.").required(),
  avatar: yup.string().url("invalid url").required(),
  password: yup.string().min(8).required(),
});

/*testUser venueManager:false: 
username: addyB
email: addyB@noroff.no
avatar: https://gravatar.com/avatar/63e0639bb8d217fe96e4f7c6ccb886b0?s=400&d=robohash&r=x
password: 896734jdlmjd846h
*/

/*testUser venueManager:true: 
username: addyB123
email: addyB123@noroff.no
avatar: 
password: 3848372hye373dnidh
*/

/**
 * displays a register form. When the form submits, sends the data to the api and if success, navigates the user
 * to the sign in page, if an error occurs, displays an error message.
 */
export default function RegisterUser() {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);

    try {
      const response = await axios.post(authRegisterURL, data);
      console.log(response.data);
      if(response.data){
        setSuccess(true);
      }
    } catch (error) {
      console.log("error", error.response.data.errors[0].message);
      setRegisterError(error.response.data.errors[0].message.toString());
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (success === true) {
    setTimeout(() => {
      navigate("/Sign-in");
    }, 4000);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        name: "",
        email: "",
        avatar: "",
        venueManager: false,
        password: "",
      }}>
      {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
        <Container className="mt-5 mb-5">
          <p className="text-success fs-5">{success === true ? "Success, taking you to the sign in page..." : null}</p>
          <p className="text-danger fs-5">{registerError ? registerError + " please try again" : null}</p>
          <Form className="mt-3" noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormik01">
              <FloatingLabel controlId="floatingInputName" label="name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide more then 3 characters</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
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
                />
                <Form.Control.Feedback type="invalid">Please provide a valid email address with: @stud.noroff.no</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingInputProfileImage" label="Profile image URL" className="mb-3">
                <Form.Control
                  type="url"
                  placeholder="avatar"
                  name="avatar"
                  value={values.avatar}
                  onChange={handleChange}
                  isValid={touched.avatar && !errors.avatar}
                  isInvalid={!!errors.avatar}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid url, example: https://gravatar.com/avatar/600d2958102e1021b146af9e990ec390?s=400&d=robohash&r=x
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Venue manager" onChange={handleChange} value={values.venueManager} name="venueManager" />
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
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide more then 8 characters</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
              {submitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}
