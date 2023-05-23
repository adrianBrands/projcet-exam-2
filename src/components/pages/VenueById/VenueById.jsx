import UseVenuesById from "../../../hooks/useVenueById";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

export default function VenueById() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Holidaze | Venue</title>
          <meta
            name="description"
            content="Web site where you can check out several different bookings, make bookings or create venues to be booked by others"
          />
        </Helmet>
        <UseVenuesById />
      </HelmetProvider>
    </>
  );
}
