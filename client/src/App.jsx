import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Recommend from "./pages/Recommend";

export default function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/signup" element = {<SignUp />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/recommend" element = {<Recommend />} />
      </Routes>
    </Router>
  )
}
