import { Header, Footer } from "./components";
import { Home, Venues, VenueById, Register, SignIn } from "./components/pages";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/venues" element={<Venues />}/>
        <Route path="/venue/:id" element={<VenueById />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/sign-in" element={<SignIn />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
