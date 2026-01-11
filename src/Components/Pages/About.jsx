import {
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaDumbbell,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="about" className="relative bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 border-t border-gray-800 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center md:text-left">
          
          {/* Column 1: Brand & About */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="bg-orange-600 p-2 rounded-lg">
                <FaDumbbell className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wider">
                TFC <span className="text-orange-500">NASHIK</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0 px-2">
              Your premium fitness destination. We combine state-of-the-art equipment, 
              expert coaching, and a motivating atmosphere to help you crush your goals. 
              <br />
              <span className="text-orange-500 font-semibold mt-2 block">#JoinTheTribe</span>
            </p>
          </motion.div>

          {/* Column 2: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-bold text-base sm:text-lg border-b border-orange-500/30 pb-2 inline-block mb-2">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm">
              <a 
                href="https://maps.google.com/?q=The+Exchange+Tower+Nashik+Road" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start justify-center md:justify-start gap-3 group"
              >
                <div className="mt-1 p-2 bg-gray-800 rounded-full group-hover:bg-orange-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-left">
                  4th Floor, The Exchange Tower,<br/> Near NMC, Nashik Road 📍
                </span>
              </a>

              <a href="mailto:contact@tfcnashik.com" className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-gray-800 rounded-full group-hover:bg-orange-500/20 transition-colors">
                  <FaEnvelope className="text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  contact@tfcnashik.com
                </span>
              </a>

              <a href="tel:+919922525245" className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-gray-800 rounded-full group-hover:bg-orange-500/20 transition-colors">
                  <FaPhone className="text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  +91 99225 25245
                </span>
              </a>
            </div>
          </motion.div>

          {/* Column 3: Socials & Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-white font-bold text-base sm:text-lg border-b border-orange-500/30 pb-2 inline-block mb-2">
              Connect With Us
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Follow our journey and get daily fitness tips.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://wa.me/919922525245"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-[#25D366] text-white hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/tfc.fitness.nashik"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Follow on Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="mt-6 text-xs text-gray-500 hover:text-orange-400 flex items-center gap-1 mx-auto md:mx-0 transition-colors"
            >
              Back to Top <FaArrowUp />
            </button>
          </motion.div>
        </div>

        {/* Footer Bottom / Developer Credit */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
        >
          <p>© {currentYear} TFC Nashik. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Developed with ⚡ by</span>
            <a
              href="https://instagram.com/ajax.pvt"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-gray-300 hover:text-orange-500 transition-colors relative group"
            >
              Ajay Jachak
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}