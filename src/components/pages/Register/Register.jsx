import { Container } from "react-bootstrap";
import RegisterUser from "../../forms/Register";
import { Helmet } from "react-helmet";

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Register</title>
      </Helmet>
      <Container>
        <h1 className="border-bottom mt-5 text-primary">Register</h1>
        <RegisterUser />
      </Container>
    </>
  );
}
