import { Container } from "react-bootstrap";
import UseVenues from "../../../hooks/useVenues";

export default function Venues() {
  return (
    <Container>
      <h1 className="border-bottom text-primary  mt-5">Venues</h1>
      <UseVenues />
    </Container>
  );
}
