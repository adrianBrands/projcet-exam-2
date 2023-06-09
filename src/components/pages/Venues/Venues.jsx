import { Container } from "react-bootstrap";
import UseVenues from "../../../hooks/useVenues";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

export default function Venues() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Holidaze | Venues</title>
          <meta
            name="description"
            content="Web site where you can check out several different bookings, make bookings or create venues to be booked by others"
          />
        </Helmet>
        <Container>
          <h1 className="border-bottom text-primary  mt-5">Venues</h1>
          <UseVenues />
        </Container>
      </HelmetProvider>
    </>
  );
}
