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
    <footer id="about" className="relative bg-[#050505] text-gray-300 pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* Background Decorative Text */}
      <h2 className="text-8xl md:text-[12rem] font-black text-white italic uppercase tracking-tighter opacity-5 absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap select-none pointer-events-none">
        NASHIK ROAD
      </h2>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Column 1: Brand & Ethos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-xl shadow-lg shadow-orange-600/20">
                <FaDumbbell className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                TFC <span className="text-orange-500">NASHIK</span>
              </h2>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed uppercase font-medium tracking-tight">
              Elite performance meets high-end recovery. We provide the tools, the atmosphere, and the expertise. You provide the grind.
              <span className="text-orange-500 font-black mt-4 block italic tracking-widest">#JOINTHELAB</span>
            </p>
          </motion.div>

          {/* Column 2: Contact/Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-white font-black italic uppercase text-lg tracking-widest flex items-center gap-2">
              <div className="h-px w-6 bg-orange-600" /> Headquarters
            </h3>
            <div className="flex flex-col gap-5 text-sm uppercase font-bold tracking-tight">
              <a 
                href="https://maps.google.com/?q=The+Exchange+Tower+Nashik+Road" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="mt-0.5 p-2 bg-zinc-900 border border-white/5 rounded-lg group-hover:bg-orange-600/20 transition-all">
                  <FaMapMarkerAlt className="text-orange-500" />
                </div>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  4th Floor, The Exchange Tower,<br/> Near NMC, Nashik Road 📍
                </span>
              </a>

              <a href="mailto:contact@tfcnashik.com" className="flex items-center gap-4 group">
                <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg group-hover:bg-orange-600/20 transition-all">
                  <FaEnvelope className="text-orange-500" />
                </div>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  contact@tfcnashik.com
                </span>
              </a>

              <a href="tel:+919922525245" className="flex items-center gap-4 group">
                <div className="p-2 bg-zinc-900 border border-white/5 rounded-lg group-hover:bg-orange-600/20 transition-all">
                  <FaPhone className="text-orange-500" />
                </div>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  +91 99225 25245
                </span>
              </a>
            </div>
          </motion.div>

          {/* Column 3: Social Hub */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-white font-black italic uppercase text-lg tracking-widest flex items-center gap-2">
              <div className="h-px w-6 bg-orange-600" /> Digital Lab
            </h3>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Live updates and athlete progress.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/919922525245"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-white/5 rounded-2xl hover:bg-[#25D366] text-white transition-all duration-300 hover:-translate-y-2 shadow-xl"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/tfc.nashik"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-white/5 rounded-2xl hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white transition-all duration-300 hover:-translate-y-2 shadow-xl"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-orange-500 flex items-center gap-2 transition-colors cursor-pointer"
            >
              Back to Top <FaArrowUp className="animate-bounce" />
            </button>
          </motion.div>
        </div>

        {/* Footer Credit Line */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          <p>© {currentYear} TFC Nashik • Built for performance</p>
          
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <a
              href="https://instagram.com/ajax.pvt"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-orange-500 transition-colors"
            >
              Ajay Jachak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}