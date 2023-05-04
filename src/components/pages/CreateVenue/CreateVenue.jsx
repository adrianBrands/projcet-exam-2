import { Container } from "react-bootstrap"
import Create from "../../forms/Create"


export default function CreateVenue(){
  return (
  <Container>
    <h1 className="mt-5 border-bottom border-primary fw-lighter">Create Venue</h1>
    <Create />
  </Container>
  )
}