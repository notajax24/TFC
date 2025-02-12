import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/common/Navbar";
import Home from "./Components/Pages/Home";
import Features from "./Components/Pages/features";
import Packages from "./Components/Pages/Packages";
import About from "./Components/Pages/About";
import Exercises from "./Components/Pages/Exercises";
import Join from "./Components/Pages/join";

export default function App() {
  return (
    <Router>
      <div className="relative z-10">
        <Navbar />
        <Home />
        <Features />
        <Packages />
        <Exercises />
        <Join />
        <About />
      </div>
    </Router>
  );
}
