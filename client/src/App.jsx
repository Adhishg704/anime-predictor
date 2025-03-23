import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import { AnimeSentimentAnalyzer } from "./pages/Recommend";

export default function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<AnimeSentimentAnalyzer />} />
      </Routes>
    </Router>
  )
}
