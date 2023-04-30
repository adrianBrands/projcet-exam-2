import { Container } from "react-bootstrap";
import UseBookings from "../../../hooks/useProfile";
import UseProfileImage from "../../../hooks/useProfileImage";

export default function Profile(){
  return (
    <Container>
      <h1 className="mt-5 border-bottom">Profile</h1>
      <h3 className="mt-5 fw-lighter border-bottom">Change profile image</h3>
      <UseProfileImage/>
      <h2 className="border-bottom fw-lighter">Your bookings</h2>
      <UseBookings />
    </Container>
  )
}