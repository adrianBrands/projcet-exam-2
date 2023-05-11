import { Container } from "react-bootstrap";
import UseVenues from "../../../hooks/useVenues";
import { Helmet } from "react-helmet";

export default function Venues() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Venues</title>
      </Helmet>
      <Container>
        <h1 className="border-bottom text-primary  mt-5">Venues</h1>
        <UseVenues />
      </Container>
    </>
  );
}
