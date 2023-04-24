import { Container } from "react-bootstrap"
import SignInUser from "../../forms/SignIn"

export default function SignIn(){
  return (<Container>
    <h1 className="border-bottom mt-5">Sign in</h1>
    <SignInUser />
    </Container>
  );
}