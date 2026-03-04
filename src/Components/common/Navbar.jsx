import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import tfclogo from "../../assets/tfcweb.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // === NEW: BODY SCROLL LOCK LOGIC ===
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Programs", id: "features" },
    { name: "Lab", id: "exercises" },
    { name: "Packages", id: "packages" },
    { name: "About", id: "about" },
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi TFC, I want to know about the Latest Offers.");
    window.open(`https://wa.me/919922525245?text=${message}`, "_blank");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // This will trigger the useEffect to unlock scroll
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white rounded-2xl p-4 shadow-lg flex items-center justify-center border border-white/10"
      >
        <FaWhatsapp className="w-7 h-7" />
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
      </motion.button>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-white/5" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("home")}
            className="relative z-[110]"
          >
            <img 
              src={tfclogo} 
              alt="TFC" 
              className={`transition-all duration-500 ${scrolled ? "h-10" : "h-14"} w-auto`}
            />
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group relative text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors italic"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-600 transition-all group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection("packages")}
              className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest italic rounded-full hover:bg-orange-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Join Lab
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden z-[110] p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Full Screen Mobile Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              // Ensure this is fixed and covers the whole screen to prevent leaks
              className="fixed inset-0 bg-black z-[105] flex flex-col justify-center p-12 overflow-hidden h-screen"
            >
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/[0.03] italic uppercase pointer-events-none select-none">
                TFC
              </h2>

              <div className="relative z-10 space-y-8">
                {navLinks.map((link, i) => (
                  <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-5xl font-black italic uppercase tracking-tighter text-white hover:text-orange-500 transition-colors text-left"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}