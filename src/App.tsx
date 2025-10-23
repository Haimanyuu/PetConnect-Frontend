import { Routes, Route } from "react-router-dom";

import "./App.css"; 

import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import OtpVerification from "./pages/OtpVerification.tsx";
import Matches from "./pages/Matches.tsx";
import IntentSelection from "./pages/IntentSelection.tsx";
import LocationPage from "./pages/Location.tsx";
import PetProfile from "./pages/PetProfile.tsx";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import BrowsePets from "./pages/BrowsePets";
import CreateListing from "./pages/CreateListing";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/createlist" element={<CreateListing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/browse" element={<BrowsePets />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<OtpVerification />} />
      <Route path="/intent" element={<IntentSelection />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/pet/:petId" element={<PetProfile />} />
    </Routes>
  );
}

export default App;
