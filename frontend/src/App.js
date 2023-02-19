import React from "react";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      {/* Routes to different pages */}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        {/* <Route exact path="/" element={<LandingPage />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/profile/:username" element={<UserPage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
