import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import tfclogo from "../../assets/tfcweb.png"

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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi TFC, I want to know about the Latest Offers.");
    const whatsappUrl = `https://wa.me/919922525245?text=${message}`; // Replace with actual WhatsApp number
    window.open(whatsappUrl, "_blank");
  };

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
    <>
      {/* WhatsApp Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </motion.button>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black-900/80  border-b border-gray-800/50"
            : "backdrop-blur-2 bg-transparent  border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img 
            src={tfclogo} 
            alt="TFC Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto"
            loading="eager"
            fetchPriority="high"
          />
          
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
            onClick={() => scrollToSection("exercises")}
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
    </>
  );
}
