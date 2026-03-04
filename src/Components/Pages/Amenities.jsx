import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const amenityList = [
  "Strength Training", "Cardio Zone", "CrossFit Area", "MMA Octagon", "Kickboxing",
  "Meditation Room", "Posing Room", "In-House Cafe", "Steam Bath", "Shower Room",
  "Dance Studio", "Zumba Classes", "Yoga Sanctuary", "Gaming Area", "Private Lockers",
  "Changing Rooms", "Fully Air-Conditioned"
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Watermark */}
      <h2 className="text-7xl md:text-[12rem] font-black text-white italic uppercase tracking-tighter leading-none opacity-5 absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap select-none pointer-events-none">
        LIFESTYLE
      </h2>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-[10px] md:text-xs">
            World-Class Facilities
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mt-2 leading-none">
            OUR <span className="text-orange-600">AMENITIES</span>
          </h2>
          <div className="h-1.5 w-24 bg-orange-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Using Flexbox with justify-center allows the last row 
            to center automatically if it's incomplete.
        */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {amenityList.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(234, 88, 12, 0.15)",
                borderColor: "rgba(234, 88, 12, 0.4)" 
              }}
              // Responsive widths: 
              // mobile: ~2 per row | md: ~3 per row | lg: ~4 per row
              className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] 
                         min-w-[160px] bg-zinc-900/40 backdrop-blur-xl border border-white/5 
                         p-5 md:p-6 rounded-2xl flex items-center gap-4 group transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <FaBolt className="text-orange-500 group-hover:text-white transition-colors animate-pulse" size={14} />
              </div>
              <span className="text-zinc-300 group-hover:text-white font-black italic uppercase tracking-tight text-sm md:text-base leading-tight transition-colors">
                {amenity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}