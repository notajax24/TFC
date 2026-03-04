import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaHeartbeat,
  FaUsers,
  FaShower,
  FaFistRaised,
  FaCoffee,
} from "react-icons/fa";

export default function Join() {
  const features = [
    {
      icon: <FaDumbbell />,
      title: "The Iron Standard",
      description:
        "Dedicated heavy-lifting zone with Olympic platforms, calibrated plates, and dumbbells up to 60kg. No waiting for racks.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Smart Cardio",
      description:
        "Endurance equipment that tracks stats in real-time. Designed for heart health, fat loss, and metabolic recovery.",
    },
    {
      icon: <FaUsers />,
      title: "Trishul Support",
      description:
        "Certified floor coaches, not just guards. We maintain a strict ratio to ensure your form is always corrected.",
    },
    {
      icon: <FaShower />,
      title: "Total Recovery",
      description:
        "Premium steam and shower facilities to relax muscles and detoxify your system after a heavy training session.",
    },
    {
      icon: <FaFistRaised />,
      title: "MMA Training",
      description:
        "Professional zone with heavy bags and a full-size octagon. Learn combat disciplines from certified MMA coaches.",
    },
    {
      icon: <FaCoffee />,
      title: "In-Gym Cafe",
      description:
        "Refuel with premium protein shakes and post-workout nutrition options without ever leaving the facility.",
    },
  ];

  return (
    <section
      id="join"
      className="py-24 bg-black overflow-hidden relative min-h-screen flex flex-col justify-center"
    >
      {/* Background Large Text - Matches Performance/Capabilities */}
      <h2 className="text-7xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-none opacity-5 absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap select-none pointer-events-none">
        EXPERIENCE
      </h2>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-xs">
              Beyond the Gym Floor
            </span>
          </motion.div>
          <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            WHY <span className="text-orange-600">TFC?</span>
          </h3>
          <div className="h-1 w-24 bg-orange-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group p-[1px] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/10 to-transparent transition-all duration-300"
            >
              {/* Card Body */}
              <div className="bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.4rem] h-full flex flex-col border border-white/5 group-hover:border-orange-500/30 transition-all">
                
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-3xl text-orange-500 mb-8 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-xl">
                  {feature.icon}
                </div>

                {/* Content */}
                <h4 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight mb-4 group-hover:text-orange-500 transition-colors">
                  {feature.title}
                </h4>
                
                <p className="text-zinc-400 text-sm leading-relaxed font-medium uppercase tracking-tight">
                  {feature.description}
                </p>

                {/* Bottom Accents */}
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-px w-8 bg-orange-600" />
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                    Premium Standard
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Gradient */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}