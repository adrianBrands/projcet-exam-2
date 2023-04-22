import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import { authRegisterURL } from "../../utilities/constants";
import { useState } from "react";

const emailRegex = /^[\w\-.]+@(stud.)?noroff.no$/;
const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().matches(emailRegex, "Invalid email.").required(),
  url: yup.string().url("invalid url").required(),
  password: yup.string().min(8).required(),
});

export default function RegisterUser(){
  const [submitting ,setSubmitting] = useState(false);
  const [signInError, setSignInError] = useState(null);

  async function onSubmit(data){
    setSubmitting(true);
    setSignInError(null);

    try{
      const response = await axios.post(authRegisterURL, data);
      console.log(response.data)
    } catch (error) {
      console.log("error", error);
      setSignInError(error.toString());
    } finally {
      setSubmitting(false)
    }

  }

return (
  <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        email: '',
        url: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
      
      <Container className="mt-5 mb-5">
        <Form className="mt-3" noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="validationFormik01">
            <FloatingLabel controlId="floatingInputName" label="name"  className="mb-3">
              <Form.Control type="text" placeholder="name" name="name" value={values.name} onChange={handleChange} isValid={touched.name && !errors.name} isInvalid={!!errors.name}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide more then 3 characters</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" name="email" value={values.email} onChange={handleChange} isValid={touched.email && !errors.email} isInvalid={!!errors.email}/>
              <Form.Control.Feedback type="invalid">Please provide a valid email address</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputProfileImage" label="Profile image URL" className="mb-3">
            <Form.Control type="url" placeholder="url" name="url" value={values.url} onChange={handleChange} isValid={touched.url && !errors.url} isInvalid={!!errors.url}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide a valid url</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputPassword" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} isValid={touched.password && !errors.password} isInvalid={!!errors.password}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide more then 8 characters</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit">
          {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </Form>
      </Container>

  )}
  </Formik>
)}