import { Container } from "react-bootstrap";
import UseBookings from "../../../hooks/useProfile";
import UseProfileImage from "../../../hooks/useProfileImage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

export default function Profile() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Holidaze | Profile</title>
          <meta
            name="description"
            content="Web site where you can check out several different bookings, make bookings or create venues to be booked by others"
          />
        </Helmet>
        <Container>
          <h1 className="mt-5 border-bottom text-primary">Profile</h1>
          <h2 className="mt-5 fw-lighter">Change profile image</h2>
          <UseProfileImage />
          <UseBookings />
        </Container>
      </HelmetProvider>
    </>
  );
}
