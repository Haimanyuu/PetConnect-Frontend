import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import OtpVerification from "./pages/OtpVerification.tsx";
import Matches from "./pages/Matches.tsx";
import IntentSelection from "./pages/IntentSelection.tsx";
import LocationPage from "./pages/Location.tsx";
import PetProfile from "./pages/PetProfile.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
