import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import { authRegisterURL } from "../../utilities/constants";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';


const emailRegex = /^[\w\-.]+@(stud.)?noroff.no$/;
const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().matches(emailRegex, "Invalid email.").required(),
  avatar: yup.string().url("invalid url").required(),
  //venueManager: yup.boolean().oneOf([true]).notRequired(),
  password: yup.string().min(8).required(),
});

/*testUser: 
username: addyB
email: addyB@noroff.no
avatar: https://gravatar.com/avatar/63e0639bb8d217fe96e4f7c6ccb886b0?s=400&d=robohash&r=x
password: 896734jdlmjd846h
*/



export default function RegisterUser(){
  const [submitting ,setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  

  const navigate = useNavigate()
  async function onSubmit(data){
    setSubmitting(true);
    setRegisterError(null);

    try{
      const response = await axios.post(authRegisterURL, data);
      console.log(response.data)
      navigate('/Sign-in')
    } catch (error) {
      console.log("error", error.response.data.errors[0].message);
      setRegisterError(error.response.data.errors[0].message.toString());
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
        avatar: '',
        venueManager: false,
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
        <p className="text-danger fs-5">{registerError ? registerError + " please try again" : null}</p>
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
            <Form.Control type="url" placeholder="avatar" name="avatar" value={values.avatar} onChange={handleChange} isValid={touched.avatar && !errors.avatar} isInvalid={!!errors.avatar}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide a valid url</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Venue manager"  onChange={handleChange} value={values.venueManager}  name="venueManager"/>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputPassword" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} isValid={touched.password && !errors.password} isInvalid={!!errors.password}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide more then 8 characters</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit">
          {submitting ? "Signing in..." : "Register"}
          </Button>
        </Form>
      </Container>

  )}
  </Formik>
)}