import { Container, Form, Button, FloatingLabel, Col, Row } from "react-bootstrap";
import { Field, Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { venuesURL } from "../../utilities/constants";
import { FieldArray } from "formik";
import { useParams } from "react-router-dom";

/**
 * displays an update form. sends the data to the api and if success, reloads the page.
 * If an error occurs, displays an error message.
 * @param {Object} props
 */
export default function Update(props) {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [profile, setProfile] = useState([]);

  const { id } = useParams();
  const API_URL = `${venuesURL}/${id}`;

  const { name, description, media, price, maxGuests, rating, address, city, zip, country, continent, lat, lng } = props;

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("auth"));
    if (profile) {
      setProfile(profile);
    }
  }, []);

  async function onSubmit(data) {
    if (profile.name) {
      setSubmitting(true);
      setRegisterError(null);

      try {
        const response = await axios.put(API_URL, data, {
          headers: {
            Authorization: `Bearer ${profile.accessToken}`,
          },
        });
      } catch (error) {
        setRegisterError(error.response.data.errors[0].message.toString());
      } finally {
        setSubmitting(false);
        window.location.reload();
      }
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        name: name,
        description: description,
        media: media,
        price: price,
        maxGuests: maxGuests,
        rating: rating,
        meta: {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: {
          address: address,
          city: city,
          zip: zip,
          country: country,
          continent: continent,
          lat: lat,
          lng: lng,
        },
      }}>
      {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                  />
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
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel controlId="floatingInputImage" label="" className="mb-3">
                  <FieldArray
                    type="url"
                    placeholder="image"
                    name="media"
                    value={values.media}
                    onChange={handleChange}
                    isValid={touched.media && !errors.media}
                    isInvalid={!!errors.media}>
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
                                <Button className="remove mb-2" onClick={() => remove(index)}>
                                  remove
                                </Button>
                              )}

                              <Button className="add mb-2" onClick={() => push("")}>
                                add
                              </Button>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputPrice" label="Venue price" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                    isInvalid={!!errors.price}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputGuests" label="Max guests" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="guests"
                    name="maxGuests"
                    value={values.maxGuests}
                    onChange={handleChange}
                    isValid={touched.maxGuests && !errors.maxGuests}
                    isInvalid={!!errors.maxGuests}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="Rating" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="rating"
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                    isValid={touched.rating && !errors.rating}
                    isInvalid={!!errors.rating}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="wifi" onChange={handleChange} value={values.meta.wifi} name="meta.wifi" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="parking" onChange={handleChange} value={values.meta.parking} name="meta.parking" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="breakfast" onChange={handleChange} value={values.meta.breakfast} name="meta.breakfast" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="pets" onChange={handleChange} value={values.meta.pets} name="meta.pets" />
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="address" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="address"
                    name="location.address"
                    value={values.location.address}
                    onChange={handleChange}
                    isValid={touched.address && !errors.address}
                    isInvalid={!!errors.address}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="city" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="city"
                    name="location.city"
                    value={values.location.city}
                    onChange={handleChange}
                    isValid={touched.city && !errors.city}
                    isInvalid={!!errors.city}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="zip" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="zip"
                    name="location.zip"
                    value={values.location.zip}
                    onChange={handleChange}
                    isValid={touched.zip && !errors.zip}
                    isInvalid={!!errors.zip}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <FloatingLabel controlId="floatingInputRating" label="country" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="country"
                    name="location.country"
                    value={values.location.country}
                    onChange={handleChange}
                    isValid={touched.country && !errors.country}
                    isInvalid={!!errors.country}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel controlId="floatingInputRating" label="continent" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="continent"
                    name="location.continent"
                    value={values.location.continent}
                    onChange={handleChange}
                    isValid={touched.continent && !errors.continent}
                    isInvalid={!!errors.continent}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="latitude" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="latitude"
                    name="location.lat"
                    value={values.location.lat}
                    onChange={handleChange}
                    isValid={touched.lat && !errors.lat}
                    isInvalid={!!errors.lat}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col}>
                <FloatingLabel controlId="floatingInputRating" label="longitude" className="mb-3 text-body-secondary">
                  <Form.Control
                    type="number"
                    placeholder="longitude"
                    name="location.lng"
                    value={values.location.lng}
                    onChange={handleChange}
                    isValid={touched.lng && !errors.lng}
                    isInvalid={!!errors.lng}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Button className="mb-5" variant="primary" type="submit">
              {submitting ? "Updating..." : "Update"}
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}
