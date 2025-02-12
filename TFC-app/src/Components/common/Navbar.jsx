import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black-900/80  border-b border-gray-800/50"
          : "backdrop-blur-2 bg-transparent  border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl font-poppins font-bold text-[#FF9D23]"
        >
          TFC
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-orange-500 transition cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-orange-500 transition cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("packages")}
            className="hover:text-orange-500 transition cursor-pointer"
          >
            Packages
          </button>
          <button
            onClick={() => scrollToSection("excercise")}
            className="hover:text-orange-500 transition cursor-pointer "
          >
            Excercise
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-orange-500 transition cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block text-white hover:text-yellow-400 text-lg"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block text-white hover:text-yellow-400 text-lg"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              className="block text-white hover:text-yellow-400 text-lg"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block text-white hover:text-yellow-400 text-lg"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block text-white hover:text-yellow-400 text-lg"
            >
              About
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
