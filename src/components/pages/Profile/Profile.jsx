import { Container } from "react-bootstrap";
import UseBookings from "../../../hooks/useProfile";
import UseProfileImage from "../../../hooks/useProfileImage";
import { Helmet } from "react-helmet";

export default function Profile() {
  return (
    <>
      <Helmet>
        <title>Holidaze | Profile</title>
      </Helmet>
      <Container>
        <h1 className="mt-5 border-bottom text-primary">Profile</h1>
        <h2 className="mt-5 fw-lighter">Change profile image</h2>
        <UseProfileImage />
        <UseBookings />
      </Container>
    </>
  );
}
