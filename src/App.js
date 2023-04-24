import { Header, Footer } from "./components";
import { Home, Venues, VenueById, Register, SignIn, Profile } from "./components/pages";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";


function App() {
  return (
    <>
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/venues" element={<Venues />}/>
        <Route path="/venue/:id" element={<VenueById />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
