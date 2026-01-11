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
      icon: <FaDumbbell className="w-12 h-12" />,
      title: "The Iron Standard",
      description:
        "A dedicated heavy-lifting zone featuring Olympic platforms, calibrated plates, and heavy dumbbells up to [insert max weight]kg. No waiting for racks.",
    },
    {
      icon: <FaHeartbeat className="w-12 h-12" />,
      title: "Smart Cardio",
      description:
        "Endurance equipment that tracks your stats in real-time. From HIIT sprints to steady-state recovery, our cardio deck is designed for heart health and fat loss.",
    },
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: 'The "Trishul" Support System',
      description:
        "Our floor trainers aren't just guards; they are certified coaches. We maintain a strict member-to-trainer ratio so your form is always corrected, and your motivation never drops.",
    },
    {
      icon: <FaShower className="w-12 h-12" />,
      title: "Total Recovery",
      description:
        "Recovery is where growth happens. Access our premium steam and shower facilities to relax muscles and detoxify after a heavy session.",
    },
    {
      icon: <FaFistRaised className="w-12 h-12" />,
      title: "MMA Training Zone",
      description:
        "Step into our professional MMA training area equipped with heavy bags, speed bags, and a full-size octagon. Train with certified MMA coaches and learn various combat disciplines.",
    },
    {
      icon: <FaCoffee className="w-12 h-12" />,
      title: "In-Gym Cafe",
      description:
        "Refuel and recharge at our on-site cafe. Enjoy premium protein shakes, healthy snacks, and post-workout nutrition options without leaving the gym.",
    },
  ];

  return (
    <section
      id="join"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 px-2"
        >
          <span className="text-white">WHY </span>
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            TFC?
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 md:p-8 hover:border-orange-500/50 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="mb-3 sm:mb-4 text-orange-500"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors duration-300 px-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 px-2">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
