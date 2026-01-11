import { useState } from "react";
import { motion } from "framer-motion";

const exercises = [
  {
    name: "Deadlifts",
    img: "https://plus.unsplash.com/premium_photo-1661962651326-b0ea0501cf46?auto=format&fit=crop&w=800&q=80",
    muscle: "Back & Legs",
    guide: ["Keep back flat & chest up", "Drive through heels", "Bar close to shins", "Squeeze glutes at top"],
  },
  {
    name: "Squats",
    img: "https://images.unsplash.com/photo-1612957824445-f0c090ff1af0?auto=format&fit=crop&w=800&q=80",
    muscle: "Quads & Glutes",
    guide: ["Feet shoulder-width apart", "Break at hips first", "Keep knees out", "Chest up, core tight"],
  },
  {
    name: "Bench Press",
    img: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=800&q=80",
    muscle: "Chest & Triceps",
    guide: ["Retract shoulder blades", "Arch lower back slightly", "Elbows at 45 degrees", "Drive bar up in J-path"],
  },
  {
    name: "Pull-Ups",
    img: "https://images.unsplash.com/photo-1598971475122-95a9004e2922?auto=format&fit=crop&w=800&q=80",
    muscle: "Lats & Biceps",
    guide: ["Full hang at bottom", "Engage lats first", "Pull chest to bar", "Control the descent"],
  },
  {
    name: "Lunges",
    img: "https://plus.unsplash.com/premium_photo-1664299888383-a1ba33510b91?auto=format&fit=crop&w=800&q=80",
    muscle: "Legs & Core",
    guide: ["Step forward, torso upright", "Back knee near ground", "Front knee behind toe", "Push back to start"],
  },
  {
    name: "Push-Ups",
    img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80",
    muscle: "Upper Body",
    guide: ["Hands under shoulders", "Body in straight line", "Elbows tucked in", "Full range of motion"],
  },
  {
    name: "Overhead Press",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    muscle: "Shoulders",
    guide: ["Core tight, glutes squeezed", "Head moves back slightly", "Press bar vertically", "Lock out at top"],
  },
];

// Duplicate for infinite loop
const carouselExercises = [...exercises, ...exercises];

// Individual Card Component to handle Flip State
const ExerciseCard = ({ exercise }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-56 sm:w-64 md:w-80 h-72 sm:h-80 md:h-96 flex-shrink-0 cursor-pointer group perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(false)} // Auto flip back when mouse leaves
    >
      <motion.div
        className="relative w-full h-full duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* === FRONT SIDE === */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-gray-800 bg-gray-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={exercise.img}
            alt={exercise.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-4 sm:p-5 md:p-6 w-full">
            <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 mb-1 sm:mb-2 text-[10px] sm:text-xs font-bold tracking-wider text-orange-400 uppercase bg-orange-500/10 rounded-full border border-orange-500/20 backdrop-blur-md">
              {exercise.muscle}
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{exercise.name}</h3>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 flex items-center gap-1 group-hover:text-orange-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
              </svg>
              Tap for Technique
            </p>
          </div>
        </div>

        {/* === BACK SIDE (Details) === */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-gray-900 border border-orange-500/30 p-6 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-95" />
          
          <div className="relative z-10 text-center">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-orange-400 mb-3 sm:mb-4 uppercase tracking-widest border-b border-gray-700 pb-1 sm:pb-2">
              Technique Guide
            </h3>
            <ul className="text-left space-y-2 sm:space-y-3">
              {exercise.guide.map((step, idx) => (
                <li key={idx} className="flex items-start text-gray-300 text-xs sm:text-sm">
                  <span className="text-orange-500 mr-1.5 sm:mr-2 mt-0.5">✓</span>
                  {step}
                </li>
              ))}
            </ul>
            <div className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-500 italic">
              Tap to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Exercises() {
  return (
    <section
      id="exercises"
      className="min-h-screen bg-black py-20 relative overflow-hidden font-montserrat flex flex-col justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 mb-8 sm:mb-10 md:mb-12">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 space-y-3 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 px-2"
          >
            Train Smarter,
            <span className="block mt-1 sm:mt-2 text-orange-500">Unleash Potential</span>
          </motion.h2>
          <p className="text-gray-400 text-sm sm:text-base px-4">Tap on any card to view the technique guide.</p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full border-y border-gray-800/50 bg-gray-900/20 backdrop-blur-sm py-8 sm:py-10 md:py-12">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ width: "max-content" }}
          >
            {carouselExercises.map((exercise, index) => (
              <ExerciseCard key={`${exercise.name}-${index}`} exercise={exercise} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}