import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import { signInURL } from "../../utilities/constants";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";


const emailRegex = /^[\w\-.]+@(stud.)?noroff.no$/;
const schema = yup.object().shape({
  email: yup.string().matches(emailRegex, "Invalid email.").required(),
  password: yup.string().min(8).required(),
});

/*testUser: 
username: addyB
email: addyB@noroff.no
avatar: https://gravatar.com/avatar/63e0639bb8d217fe96e4f7c6ccb886b0?s=400&d=robohash&r=x
password: 896734jdlmjd846h
*/



export default function SignInUser(){
  const [submitting ,setSubmitting] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate()
  async function onSubmit(data){
    setSubmitting(true);
    setSignInError(null);

    

    try{
      const response = await axios.post(signInURL, data);
      console.log(response.data);
      navigate('/profile')
    } catch (error) {
      console.log("error", error.response.data.errors[0].message);
      setSignInError(error.response.data.errors[0].message.toString());
    } finally {
      setSubmitting(false)
    }


  }
  return (
    <Formik
    validationSchema={schema}
    onSubmit={onSubmit}
    initialValues={{
    email: '',
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
          <p className="text-danger fs-5">{signInError ? signInError + " please try again" : null}</p>
          <Form className="mt-3" noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" name="email" value={values.email} onChange={handleChange} isValid={touched.email && !errors.email} isInvalid={!!errors.email}/>
                <Form.Control.Feedback type="invalid">Please provide a valid email address</Form.Control.Feedback>
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



















  