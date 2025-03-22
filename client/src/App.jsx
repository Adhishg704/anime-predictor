import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Recommend from "./pages/Recommend";

export default function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Recommend />} />
        <Route path = "/recommend" element = {<Recommend />} />
      </Routes>
    </Router>
  )
}
