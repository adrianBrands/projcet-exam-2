import { Container } from "react-bootstrap";
import Create from "../../forms/Create";
import { Helmet } from "react-helmet";

export default function CreateVenue() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Create</title>
      </Helmet>
      <Container>
        <h1 className="mt-5 border-bottom border-bottom text-primary">Create Venue</h1>
        <Create />
      </Container>
    </>
  );
}
