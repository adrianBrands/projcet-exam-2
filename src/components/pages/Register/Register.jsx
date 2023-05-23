import { Container } from "react-bootstrap";
import RegisterUser from "../../forms/Register";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

export default function Register() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Holidaze | Register</title>
          <meta
            name="description"
            content="Web site where you can check out several different bookings, make bookings or create venues to be booked by others"
          />
        </Helmet>
        <Container>
          <h1 className="border-bottom mt-5 text-primary">Register</h1>
          <RegisterUser />
        </Container>
      </HelmetProvider>
    </>
  );
}
