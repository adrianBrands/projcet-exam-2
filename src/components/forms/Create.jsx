import { Container, Form, Button, FloatingLabel, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import { Field, Formik } from "formik";
import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { venuesURL } from "../../utilities/constants";
import { FieldArray } from "formik";

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  description: yup.string().required(),
  maxGuests: yup.number().min(1).max(100).positive().required(),
  price: yup.number().min(1).positive().required(),
});

/**
 * function that displays a create venue form and if submitted, runs an api request and if success it sends the user
 * to the created venues single page. if an error occurs it will be displayed for the user.
 */
export default function Create() {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("auth"));
    if (profile) {
      setProfile(profile);
    }
  }, []);

  const navigate = useNavigate();

  async function onSubmit(data) {
    if (profile.name) {
      setSubmitting(true);
      setRegisterError(null);

      try {
        const response = await axios.post(venuesURL, data, {
          headers: {
            Authorization: `Bearer ${profile.accessToken}`,
          },
        });
        navigate("/profile");
      } catch (error) {
        setRegisterError(error.response.data.errors[0].message.toString());
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        name: "",
        description: "",
        media: [""],
        price: "",
        maxGuests: "",
        rating: 0,
        meta: {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: {
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: 0,
          lng: 0,
        },
      }}>
      {({ handleSubmit, handleChange,  values, touched, errors }) => (
        <Container className="mt-5 mb-5">
          <p className="text-danger fs-5">{registerError ? registerError + " please try again" : null}</p>
          <Form className="mt-3" noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} controlId="validationFormik01">
                <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                    autoComplete="name"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please provide more then 3 characters</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputDescription" label="Description" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isValid={touched.description && !errors.description}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">Please provide more then 3 characters</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FieldArray type="url" placeholder="image" name="media" value={values.media} onChange={handleChange}>
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { media } = values;
                    return (
                      <div>
                        {media.map((image, index) => (
                          <div key={index}>
                            <Field placeholder="Image URL" className="field" name={`media[${index}]`} />
                            {index > 0 && (
                              <Button className="mb-3 remove" onClick={() => remove(index)}>
                                remove
                              </Button>
                            )}

                            <Button className="mb-3 add" onClick={() => push("")}>
                              add
                            </Button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please provide a valid url</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputPrice" label="Price" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please provide a valid price</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputGuests" label="Guests" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="guests"
                    name="maxGuests"
                    value={values.maxGuests}
                    onChange={handleChange}
                    isValid={touched.maxGuests && !errors.maxGuests}
                    isInvalid={!!errors.maxGuests}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please provide a number of guests that are more then 0 and less then 100
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="Rating" className="mb-3">
                  <Form.Control type="number" placeholder="rating" name="rating" value={values.rating} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckboxWifi">
                <Form.Check type="checkbox" label="wifi" onChange={handleChange} value={values.meta.wifi} name="meta.wifi" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckboxParking">
                <Form.Check type="checkbox" label="parking" onChange={handleChange} value={values.meta.parking} name="meta.parking" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckboxBreakfast">
                <Form.Check type="checkbox" label="breakfast" onChange={handleChange} value={values.meta.breakfast} name="meta.breakfast" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckboxPets">
                <Form.Check type="checkbox" label="pets" onChange={handleChange} value={values.meta.pets} name="meta.pets" />
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputAddress" label="address" className="mb-3">
                  <Form.Control type="text" placeholder="address" name="location.address" value={values.location.address} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputCity" label="city" className="mb-3">
                  <Form.Control type="text" placeholder="city" name="location.city" value={values.location.city} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputZip" label="zip" className="mb-3">
                  <Form.Control type="text" placeholder="zip" name="location.zip" value={values.location.zip} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputCountry" label="country" className="mb-3">
                  <Form.Control type="text" placeholder="country" name="location.country" value={values.location.country} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputContinent" label="continent" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="continent"
                    name="location.continent"
                    value={values.location.continent}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputLat" label="latitude" className="mb-3">
                  <Form.Control type="number" placeholder="latitude" name="location.lat" value={values.location.lat} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputLng" label="longitude" className="mb-3 text-body-secondary">
                  <Form.Control type="number" placeholder="longitude" name="location.lng" value={values.location.lng} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Button className="mb-5" variant="primary" type="submit">
              {submitting ? "Creating" : "Create"}
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}
