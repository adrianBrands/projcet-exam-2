import UseVenuesById from "../../../hooks/useVenueById";
import { Helmet } from "react-helmet";

export default function VenueById() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Venue</title>
      </Helmet>
      <UseVenuesById />
    </>
  );
}
