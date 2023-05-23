import { Header, Footer } from "./components";
import { Home, Venues, VenueById, Register, SignIn, Profile, CreateVenue } from "./components/pages";
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
        <Route path="/create-venue" element={<CreateVenue />}/>
      </Routes>
      <Footer/>
      </AuthProvider>
    </>
  );
}

export default App;
