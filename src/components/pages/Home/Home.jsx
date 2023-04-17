import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import background from "../../../images/china-gf98bd0a45_1920.jpg"
export default function Home(){
  return <div className="backgroundImage">
          <Container>
            <h1 className="text-white fst-italic fw-normal stay">Stay once, carry memories forever...</h1>
            <Link to="/venues"><Button size="lg" className="mt-3">Find Your Stay</Button></Link>
          </Container>
         </div>
}

