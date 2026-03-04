import { motion } from "framer-motion";
import bg from "../../assets/bg.jpg";
import bgvideo from "../../assets/bgvideo.mp4";
import {
  FaDumbbell,
  FaUserFriends,
  FaChartLine,
  FaFire,
  FaClock,
  FaMapMarkerAlt,
  FaAppleAlt,
} from "react-icons/fa";

export default function Home() {
  
  const enterTheLab = () => {
    const section = document.getElementById("packages");
    if (section) {
      const yOffset = -80; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // UPDATED WITH IMAGE DATA
  const leftStats = [
    { value: "14k+", label: "Sq Ft Floor", icon: <FaMapMarkerAlt />, color: "text-orange-500" },
    { value: "Certified", label: "Pro Trainers", icon: <FaDumbbell />, color: "text-white" },
    { value: "15+", label: "Premium Amenities", icon: <FaUserFriends />, color: "text-orange-500" },
  ];

  const rightStats = [
    { value: "In-House", label: "Cafe & Steam", icon: <FaFire />, color: "text-white" },
    { value: "Personal", label: "Dietitians", icon: <FaAppleAlt />, color: "text-orange-500" },
    { value: "Elite", label: "Gaming Zone", icon: <FaClock />, color: "text-white" },
  ];

  return (
    <section id="home" className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover hidden md:block opacity-60"
        >
          <source src={bgvideo} type="video/mp4" />
        </video>
        <img
          src={bg}
          alt="Gym"
          className="w-full h-full object-cover md:hidden opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-1.5 border border-orange-500/30 rounded-full bg-orange-500/10 backdrop-blur-md"
          >
            <span className="text-orange-500 font-black tracking-[0.4em] uppercase text-[10px]">
              Nashik's Premier 14,000 Sq Ft Lab
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
              WE DON'T JUST <br />
              <span className="text-orange-600 drop-shadow-[0_0_30px_rgba(234,88,12,0.4)]">TRAIN</span>
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mt-2">
              WE <span className="text-orange-600">FUEL</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-zinc-400 text-sm md:text-lg uppercase font-bold tracking-[0.2em] max-w-2xl"
          >
            "Experience the evolution of luxury fitness & performance training"
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            onClick={enterTheLab}
            className="mt-12 group relative px-12 py-5 bg-white text-black rounded-2xl font-black italic uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 transition-colors group-hover:text-white">Enter the Lab</span>
            <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Floating Side Stats - Fully Integrated Data */}
      <div className="hidden lg:block">
        <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-6">
          {leftStats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              key={i}
              className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-2xl w-52 shadow-2xl"
            >
              <div className={`text-2xl mb-1 ${stat.color}`}>{stat.icon}</div>
              <div className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{stat.value}</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-6">
          {rightStats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              key={i}
              className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-2xl w-52 text-right shadow-2xl"
            >
              <div className={`text-2xl mb-1 flex justify-end ${stat.color}`}>{stat.icon}</div>
              <div className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{stat.value}</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}