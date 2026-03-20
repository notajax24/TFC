// src/Components/Pages/LandingPage.jsx
import Navbar from "../common/Navbar";
import Home from "./Home";
import Features from "./Features";
import Amenities from "./Amenities";
import Packages from "./Packages";
import Exercises from "./Exercises";
import About from "./About";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main>
        <Home />
        <Features />
        <Amenities />
        <Packages />
        <Exercises />
        <About />
      </main>
    </div>
  );
}