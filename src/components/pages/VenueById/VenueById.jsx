import UseVenuesById from "../../../hooks/useVenueById";
import { Helmet } from "react-helmet";

export default function VenueById() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Venue</title>
        <meta
          name="description"
          content="Web site where you can check out several different bookings, make bookings or create venues to be booked by others"
        />
      </Helmet>
      <UseVenuesById />
    </>
  );
}
