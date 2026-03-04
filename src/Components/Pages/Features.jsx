import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  {
    title: "Cardio Training",
    desc: "Boost your endurance with state-of-the-art equipment",
    logo: "❤️‍🔥",
    details: ["Improve heart health", "Burn calories efficiently", "Advanced treadmills", "High-stamina focus"],
  },
  {
    title: "Strength Build",
    desc: "Build muscle mass with expert-guided weight training",
    logo: "💪",
    details: ["Hypertrophy programs", "Free weights & machines", "Compound movements", "Progressive overload"],
  },
  {
    title: "Fat Loss",
    desc: "Targeted workouts for effective calorie burning",
    logo: "🔥",
    details: ["High calorie burn", "Metabolism boosting", "Mix of HIIT & Cardio", "Sustainable results"],
  },
  {
    title: "HIIT Workouts",
    desc: "High-intensity interval training for maximum results",
    logo: "⚡",
    details: ["Intense bursts", "EPOC Afterburn effect", "Max efficiency", "Cardio conditioning"],
  },
  {
    title: "MMA / Boxing",
    desc: "Striking and technique training for full-body power",
    logo: "🥊",
    details: ["Striking basics", "Self-defense skills", "Discipline focus", "High-intensity drills"],
  },
];

const infiniteFeatures = [...features, ...features, ...features];

const FeatureCard = ({ feature }) => {
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
          <div className="h-full w-full p-10 flex flex-col items-center justify-center text-center relative">
             <div className="absolute top-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
             
             <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-5xl mb-8 shadow-xl">
               {feature.logo}
             </div>

            <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed px-4">
              {feature.desc}
            </p>
            
            <div className="absolute bottom-8 flex items-center gap-2 text-orange-500/50 text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                Tap for benefits
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full rounded-[2.5rem] bg-zinc-950 border-2 border-orange-600/30 p-10 flex flex-col justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <h4 className="text-orange-500 font-black italic uppercase text-xl mb-6 border-b border-white/10 pb-2">Advantages</h4>
          <ul className="space-y-4">
            {feature.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-zinc-300">
                <FaCheckCircle className="text-orange-600 mt-1 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default function Features() {
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
    <section id="features" className="py-24 bg-black overflow-hidden relative min-h-screen flex flex-col justify-center">
      {/* Background Large Text */}
      <h2 className="text-7xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-none opacity-10 absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap select-none pointer-events-none">
        CAPABILITIES
      </h2>

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-xs">Our Core Expertise</span>
        <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">PREMIUM <span className="text-orange-600">PROGRAMS</span></h3>
      </div>

      {/* Navigation Buttons */}
      <div className="hidden lg:block">
        <button onClick={() => handleScroll("left")} className="absolute left-10 top-1/2 -translate-y-1/2 z-50 p-6 rounded-full bg-white/5 hover:bg-orange-600 border border-white/10 transition-all group">
          <svg className="w-6 h-6 text-white group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={() => handleScroll("right")} className="absolute right-10 top-1/2 -translate-y-1/2 z-50 p-6 rounded-full bg-white/5 hover:bg-orange-600 border border-white/10 transition-all group">
          <svg className="w-6 h-6 text-white group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-24 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Cinematic Side Fades */}
        <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="text-center opacity-40">
         <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.6em]">
           Swipe to navigate specialized training
         </p>
      </div>
    </section>
  );
}