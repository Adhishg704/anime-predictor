import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

export default function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<HomePage />} />
      </Routes>
    </Router>
  )
}
