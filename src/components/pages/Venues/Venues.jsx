import { Container } from "react-bootstrap"
import UseVenues from "../../../hooks/useVenues"

export default function Venues(){
  return (
    <Container>
      <h1 className="border-bottom">Venues</h1>
      <UseVenues/>
    </Container>
   )
    
  
}