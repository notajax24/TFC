import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const exercises = [
  {
    name: "Deadlifts",
    img: "https://plus.unsplash.com/premium_photo-1661962651326-b0ea0501cf46?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Squats",
    img: "https://images.unsplash.com/photo-1612957824445-f0c090ff1af0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bench Press",
    img: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pull-Ups",
    img: "https://images.unsplash.com/photo-1598971475122-95a9004e2922?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lunges",
    img: "https://plus.unsplash.com/premium_photo-1664299888383-a1ba33510b91?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Push-Ups",
    img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Overhead Press",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rows",
    img: "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2018/06/800-barbellreversegriprow.jpg?auto=format&fit=crop&w=800&q=80",
  },

  {
    name: "Plank",
    img: "https://hips.hearstapps.com/hmg-prod/images/hdm119918mh15842-1545237096.png?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Exercises() {
  const containerRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = direction === "left" ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Update button visibility
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  return (
    <section
      id="excercise"
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4 relative"
    >
      <div className="max-w-7xl mx-auto cursor-pointer">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-500 to-balck-600 bg-clip-text text-transparent mb-6">
            Train Smarter,
            <span className="block mt-2">Unleash Your Potential</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Transform your workouts with science-backed exercises and expert
            guidance
          </p>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            className="overflow-x-auto pb-8 hide-scrollbar"
            onScroll={() => {
              const { scrollLeft, scrollWidth, clientWidth } =
                containerRef.current;
              setShowLeft(scrollLeft > 0);
              setShowRight(scrollLeft + clientWidth < scrollWidth);
            }}
          >
            <div className="flex gap-8 w-max mx-auto px-4">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.name}
                  whileHover={{ scale: 1.05 }}
                  className="w-72 h-96 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={exercise.img}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">
                      {exercise.name}
                    </h3>
                    <p className="text-gray-300 mt-2">3 Variations</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Buttons */}
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 p-4 rounded-full shadow-xl backdrop-blur-sm transition-all z-20 cursor-pointer"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 p-4 rounded-full shadow-xl backdrop-blur-sm transition-all z-20 cursor-pointer"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
