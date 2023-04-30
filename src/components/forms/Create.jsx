import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import { authRegisterURL } from "../../utilities/constants";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';



const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().required(),
  media: yup.string().url("invalid url").required(),
  //venueManager: yup.boolean().oneOf([true]).notRequired(),
  
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





export default function Create(){
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
      onSubmit={console.log}
      initialValues={{
        name: '',
        description: '',
        media: [''],
        price: '',
        maxGuests: '',
        rating: '',
        meta: {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false
        },
        location: {
          address: '',
          city: '',
          zip: '',
          country: '',
          continent: '',
          lat: '',
          ing: '',
        }
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
            <FloatingLabel controlId="floatingInputDescription" label="Description" className="mb-3">
              <Form.Control type="text" placeholder="description" name="description" value={values.description} onChange={handleChange} isValid={touched.description && !errors.description} isInvalid={!!errors.description}/>
              <Form.Control.Feedback type="invalid">Please provide more then 3 characters</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputImage" label="Venue image" className="mb-3">
            <Form.Control type="url" placeholder="image" name="media" value={values.media} onChange={handleChange} isValid={touched.media && !errors.media} isInvalid={!!errors.media}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide a valid url</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputPrice" label="Venue price" className="mb-3">
            <Form.Control type="number" placeholder="price" name="price" value={values.price} onChange={handleChange} isValid={touched.price && !errors.price} isInvalid={!!errors.price}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide a valid price</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputGuests" label="maxGuests" className="mb-3">
            <Form.Control type="number" placeholder="guests" name="maxGuests" value={values.maxGuests} onChange={handleChange} isValid={touched.maxGuests && !errors.maxGuests} isInvalid={!!errors.maxGuests}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide guests</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingInputRating" label="rating" className="mb-3">
            <Form.Control type="number" placeholder="rating" name="rating" value={values.rating} onChange={handleChange} isValid={touched.rating && !errors.rating} isInvalid={!!errors.rating}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please provide guests</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="wifi"  onChange={handleChange} value={values.meta.wifi} name="meta.wifi"  />
          </Form.Group>
          
          <Button variant="primary" type="submit">
          {submitting ? "Signing in..." : "Register"}
          </Button>
        </Form>
      </Container>

  )}
  </Formik>
)}