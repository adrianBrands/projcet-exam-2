import { Container } from "react-bootstrap"
import RegisterUser from "../../forms/Register"

export default function Register(){
  return (
    <Container>
    <h1 className="border-bottom mt-5">Register</h1>
    <RegisterUser />
    </Container>
  )
}