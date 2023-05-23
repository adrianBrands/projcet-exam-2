import { Container } from "react-bootstrap";
import Create from "../../forms/Create";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

export default function CreateVenue() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Holidaze | Create</title>
          <meta
            name="description"
            content="Web site where you can check out several different bookings, make bookings or create venues to be booked by others"
          />
        </Helmet>
        <Container>
          <h1 className="mt-5 border-bottom border-bottom text-primary">Create Venue</h1>
          <Create />
        </Container>
      </HelmetProvider>
    </>
  );
}
