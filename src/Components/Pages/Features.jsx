import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  {
    title: "Cardio Training",
    desc: "Boost your endurance with our state-of-the-art equipment",
    logo: "❤️‍🔥",
    details: [
      "Improve heart health",
      "Burn calories efficiently",
      "Increase overall stamina",
      "Advanced treadmills & ellipticals",
    ],
  },
  {
    title: "Strength Build",
    desc: "Build muscle mass with expert-guided weight training",
    logo: "💪",
    details: [
      "Hypertrophy focused programs",
      "Free weights & machines",
      "Compound movement mastery",
      "Progressive overload guidance",
    ],
  },
  {
    title: "Fat Loss",
    desc: "Targeted workouts for effective fat burning and weight loss",
    logo: "🔥",
    details: [
      "High caloric expenditure",
      "Metabolism boosting circuits",
      "Mix of resistance & cardio",
      "Sustainable results focus",
    ],
  },
  {
    title: "HIIT Workouts",
    desc: "High-intensity interval training for maximum results",
    logo: "⚡",
    details: [
      "Short, intense bursts",
      "Maximum calorie burn",
      "Improved cardiovascular fitness",
      "Afterburn effect (EPOC)",
    ],
  },
  {
    title: "Hill Climbing",
    desc: "Simulated elevation training for leg strength",
    logo: "⛰️",
    details: [
      "Build serious leg strength",
      "Simulate real-world terrain",
      "Low-impact high resistance",
      "Great for glute development",
    ],
  },
  {
    title: "Flexibility",
    desc: "Yoga and stretching programs for mobility",
    logo: "🧘",
    details: [
      "Improve range of motion",
      "Reduce risk of injury",
      "Better posture & alignment",
      "Active recovery sessions",
    ],
  },
  {
    title: "MMA",
    desc: "MMA/Boxing and technique training",
    logo: "🥊",
    details: [
      "Striking & grappling basics",
      "Full-body conditioning",
      "Self-defense skills",
      "High-focus discipline",
    ],
  },
];

// Duplicate for infinite loop
const carouselFeatures = [...features, ...features];

// === Individual Flip Card Component ===
const FeatureCard = ({ feature }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-64 sm:w-72 md:w-80 h-80 sm:h-88 md:h-96 flex-shrink-0 relative cursor-pointer group perspective-1000 z-0 hover:z-10"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(false)} // Auto flip back when mouse leaves
    >
      <motion.div
        className="w-full h-full relative duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ========= FRONT SIDE ========= */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-1 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-orange-500 group-hover:to-red-600 transition-colors duration-300 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="bg-gray-900 h-full w-full rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-gray-800/20 to-transparent pointer-events-none" />

            {/* Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 md:mb-6 shadow-xl group-hover:scale-110 group-hover:border-orange-500/50 transition-all duration-300">
              {feature.logo}
            </div>

            {/* Text */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors px-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 px-2">
              {feature.desc}
            </p>

            {/* Tap Indicator */}
            <div className="mt-auto pt-4 opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-orange-500 font-semibold uppercase tracking-wider">
              <span>Tap for details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 animate-pulse"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========= BACK SIDE (Details) ========= */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-1 bg-gradient-to-bl from-orange-600 to-red-800 shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="bg-gray-900/95 h-full w-full rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 md:p-8 flex flex-col relative overflow-hidden backdrop-blur-sm">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-orange-400 mb-4 sm:mb-5 md:mb-6 pb-2 border-b border-orange-500/30 tracking-wider uppercase text-center">
              Key Benefits
            </h3>
            
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 flex-1 flex flex-col justify-center">
              {feature.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-3 text-left">
                  <FaCheckCircle className="text-orange-500 mt-0.5 sm:mt-1 flex-shrink-0" size={14} />
                  <span className="text-gray-200 text-xs sm:text-sm font-medium leading-snug">{detail}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto pt-4 text-center text-xs text-gray-500 italic">
              Tap to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// === Main Component ===
export default function Features() {
  return (
    <section
      id="features"
      className="min-h-[85vh] bg-black py-20 relative overflow-hidden font-montserrat flex flex-col justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 mb-8 sm:mb-10 md:mb-12">
        {/* Heading Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 px-2"
          >
            Our Training
            <span className="block mt-1 sm:mt-2 text-orange-500">Programs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4"
          >
            Tap on any card to explore the benefits of our diverse training modules.
          </motion.p>
        </div>
      </div>

      {/* Infinite Scroll Container Outer Wrapper */}
      <div className="relative w-full border-y border-gray-800/50 bg-gray-900/20 backdrop-blur-sm">
        {/* Faded edges mask */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Moving Track Container */}
        <div className="flex overflow-hidden py-8 sm:py-12 md:py-16">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 items-center"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ width: "max-content" }}
          >
            {carouselFeatures.map((feature, index) => (
              <FeatureCard key={`${feature.title}-${index}`} feature={feature} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}