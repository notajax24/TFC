import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Cardio Training",
    desc: "Boost your endurance with our state-of-the-art equipment",
    logo: "❤️‍🔥",
  },
  {
    title: "Strength Build",
    desc: "Build muscle mass with expert-guided weight training",
    logo: "💪",
  },
  {
    title: "Fat Loss",
    desc: "Targeted workouts for effective fat burning and weight loss",
    logo: "🔥",
  },
  {
    title: "HIIT Workouts",
    desc: "High-intensity interval training for maximum results and fat loss",
    logo: "⚡",
  },
  {
    title: "Hill Climbing",
    desc: "Simulated elevation training for leg strength",
    logo: "⛰️",
  },
  {
    title: "Flexibility",
    desc: "Yoga and stretching programs for mobility",
    logo: "🧘",
  },
  {
    title: "MMA",
    desc: "MMA/Boxing and technique training",
    logo: "🥊",
  },
];

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id="features" className="relative bg-black py-20 font-montserrat">
      <div className="container mx-auto px-4 ">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 to-white-600  bg-clip-text text-transparent text-center mb-12 mt-25">
          Our Training Programs
        </h2>

        <div className="relative overflow-hidden h-96 ">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "smooth", stiffness: 300 }}
              className="flex gap-8 justify-center items-center absolute inset-0"
            >
              {[currentIndex - 1, currentIndex, currentIndex + 1].map(
                (index) => {
                  const feature =
                    features[(index + features.length) % features.length];
                  const position = index - currentIndex;

                  return (
                    <motion.div
                      key={feature.title}
                      className="w-80 flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 shadow-2xl"
                      animate={{
                        scale: position === 0 ? 1 : 0.9,
                        opacity: position === 0 ? 1 : 0.7,
                        x: position * 300,
                        zIndex: position === 0 ? 10 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex flex-col items-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-4xl">
                          {feature.logo}
                        </div>
                        <h3 className="text-3xl font-bold text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 text-center text-lg">
                          {feature.desc}
                        </p>
                        <button className="px-8 py-3 bg-orange-500 hover:bg-red-600 rounded-full text-white font-semibold transition-all cursor-pointer">
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prevCard}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white text-lg font-semibold transition-all cursor-pointer"
          >
            ← Previous
          </button>
          <button
            onClick={nextCard}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white text-lg font-semibold transition-all cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
