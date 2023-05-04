import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import {profileURL} from "../utilities/constants";
import { useContext, useState, useEffect } from "react";


const schema = yup.object().shape({
  avatar: yup.string().url("invalid url").required(),
});


export default function UseProfileImage(){
  const [submitting ,setSubmitting] = useState(false);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('auth'));
    if (profile) {
     setProfile(profile);
    }
  }, []);

  async function onSubmit(data){
    if(profile.name){
      const imageUrl = profileURL + `/${profile.name}/media`;

    
      setSubmitting(true);
      setError(null);
      console.log(imageUrl)
      try{
        const response = await axios.put(imageUrl, data, {
          headers: {
            Authorization: `Bearer ${profile.accessToken}`,
          }
        });
        console.log(response.data.avatar)
        const storage = JSON.parse(localStorage.getItem('auth'));
        storage.avatar = response.data.avatar;
        localStorage.setItem("auth", JSON.stringify(storage));
       
      } catch (error) {
        console.log("error", error.response.data.errors[0].message);
        setError(error.response.data.errors[0].message.toString());
      } finally {
        setSubmitting(false);
        window.location.reload();
      }

    }
  } return (
    <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          avatar: '',
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
          resetForm,
        }) => (
        
        <Container className="mt-3 mb-3">
          <p className="text-danger fs-5">{error ? error + " please try again" : null}</p>
          <Form className="mt-3"  noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel controlId="floatingInputProfileImage" label="Profile image URL" className="mb-3">
              <Form.Control type="url" placeholder="avatar" name="avatar" value={values.avatar} onChange={handleChange} isValid={touched.avatar && !errors.avatar} isInvalid={!!errors.avatar}/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide a valid url</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
            {submitting ? `updating...`: "update"}
            </Button>
          </Form>
        </Container>
  
    )}
    </Formik>
  )}
   