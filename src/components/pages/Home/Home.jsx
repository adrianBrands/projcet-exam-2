import { Button, Container } from "react-bootstrap"
import background from "../../../images/china-gf98bd0a45_1920.jpg"
export default function Home(){
  return <div className="backgroundImage">
          <Container>
            <h1 className="text-white fst-italic fw-normal mt-5">Stay once, carry memories forever...</h1>
            <Button size="lg" className="mt-3">Find Your Stay</Button>
          </Container>
         </div>
}