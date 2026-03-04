import { useState, useRef, useEffect } from "react";
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
];

// Tripling the array for infinite-feeling manual scroll
const infiniteExercises = [...exercises, ...exercises, ...exercises];

const ExerciseCard = ({ exercise }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-[300px] md:w-[380px] h-[450px] md:h-[520px] flex-shrink-0 snap-center perspective-1000">
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
          <img src={exercise.img} className="w-full h-full object-cover opacity-60" alt={exercise.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 w-full text-left">
            <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase bg-black/50 backdrop-blur-md px-3 py-1 rounded-full mb-4 inline-block border border-orange-500/30">
              {exercise.muscle}
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{exercise.name}</h3>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full rounded-[2.5rem] bg-zinc-950 border-2 border-orange-600/30 p-10 flex flex-col justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <h4 className="text-orange-500 font-black italic uppercase text-xl mb-6">Form Guide</h4>
          <ul className="space-y-4">
            {exercise.guide.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-zinc-300">
                <span className="text-orange-600 font-bold">/</span> {step}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default function Exercises() {
  const scrollRef = useRef(null);

  // Center the scroll on load
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 380 + 32; // card width + gap
      const centerPosition = (scrollRef.current.scrollWidth / 2) - (window.innerWidth / 2) + (cardWidth / 2);
      scrollRef.current.scrollLeft = centerPosition;
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 412; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="exercises" className="py-24 bg-black overflow-hidden relative min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-7xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-none opacity-20 absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap select-none">
          PERFORMANCE
        </h2>
        <div className="relative z-10">
          <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-xs">The Movement Archive</span>
          <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">ELITE <span className="text-orange-600">LAB</span></h3>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="hidden lg:block">
        <button onClick={() => handleScroll("left")} className="absolute left-10 top-1/2 -translate-y-1/2 z-50 p-6 rounded-full bg-white/5 hover:bg-orange-600 border border-white/10 transition-all">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={() => handleScroll("right")} className="absolute right-10 top-1/2 -translate-y-1/2 z-50 p-6 rounded-full bg-white/5 hover:bg-orange-600 border border-white/10 transition-all">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-24 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteExercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>

        {/* Massive Side Fades */}
        <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="text-center opacity-40">
         <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.6em]">
           Explore the infinite library
         </p>
      </div>
    </section>
  );
}