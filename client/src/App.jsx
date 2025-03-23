import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Recommend, AnimeSentimentAnalyzer } from "./pages/Recommend";

export default function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<AnimeSentimentAnalyzer />} />
        <Route path = "/recommend" element = {<Recommend />} />
      </Routes>
    </Router>
  )
}
