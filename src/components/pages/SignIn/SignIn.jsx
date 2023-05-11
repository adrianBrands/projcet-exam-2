import { Container } from "react-bootstrap";
import SignInUser from "../../forms/SignIn";
import { Helmet } from "react-helmet";

export default function SignIn() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Sign in</title>
      </Helmet>
      <Container>
        <h1 className="border-bottom mt-5 text-primary">Sign in</h1>
        <SignInUser />
      </Container>
    </>
  );
}
