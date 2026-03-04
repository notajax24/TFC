import { motion, AnimatePresence } from "framer-motion";

const monthlyPackages = [
  {
    name: "IGNITION PACK",
    duration: "1 Month",
    price: "2,499",
    idealFor: "Testing the waters",
    services: ["Gym Floor Access", "General Trainer Support", "Locker & Shower", "Steam Room Access", { text: "1 MMA Session", bonus: true }],
    color: "from-slate-800/40 to-slate-950/90",
    borderColor: "border-slate-700/50",
    buttonText: "Start Trial",
  },
  {
    name: "SILVER PACK",
    duration: "3 Months",
    price: "5,999",
    originalPrice: "6,999",
    savings: "1,000",
    idealFor: "Building a base habit",
    services: ["All Gym Access", "Free BMI Analysis", "General Trainer Support" , "Steam Room Access", { text: "3 FREE MMA Sessions", bonus: true }],
    color: "from-slate-800/40 to-slate-950/90",
    borderColor: "border-slate-700/50",
    buttonText: "Get 3 Months",
  },
  {
    name: "GOLD PACK",
    duration: "6 Months",
    price: "9,999",
    originalPrice: "10,999",
    savings: "1,500",
    recommended: true,
    idealFor: "Visible physical changes",
    services: ["All Gym Access", "1 Month Freeze Option", "General Trainer Support" ,"Steam Room Access", { text: "6 MMA Sessions", bonus: true }],
    color: "from-slate-800/60 to-black",
    borderColor: "border-orange-500/30",
    buttonText: "Join Tribe",
  },
];

const annualPackage = {
  name: "THE PRO ANNUAL ELITE",
  duration: "1 Year",
  price: "14,999",
  originalPrice: "17,999",
  savings: "3,000",
  idealFor: "The Ultimate Lifestyle Transformation",
  services: [
    "Unlimited Gym Access",
    "Strength / Cardio / Meditation",
    "Posing Room Access",
    "Personalized Workout Blueprint",
    { text: "KickBoxing - 3x Monthly", bonus: true },
    { text: "Steam Bath 1x/Week", bonus: true },
    { text: "Gaming Zone Access", bonus: true },
  ],
  buttonText: "Go Pro - Save ₹3,000",
};

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-[#020202] text-white overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase">
            Membership <span className="text-orange-500">Levels</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
            From beginners to pro athletes, we have a plan tailored for your evolution.
          </p>
        </div>

        {/* Monthly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {monthlyPackages.map((pkg, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b ${pkg.borderColor.replace('border-', 'from-')}/50 to-transparent`}
            >
              <div className={`bg-gradient-to-br ${pkg.color} backdrop-blur-xl p-8 rounded-[23px] h-full flex flex-col border border-white/5`}>
                <h3 className="text-xl font-bold mb-1 tracking-tight text-gray-200 uppercase italic">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black tracking-tight">₹{pkg.price}</span>
                  <span className="text-gray-500 text-sm italic"> /{pkg.duration}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.services.map((s, idx) => {
                    const isBonus = typeof s === "object" && s.bonus;
                    return (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                         <span className={`mt-1 text-xs ${isBonus ? 'text-green-400' : 'text-orange-500'}`}>
                           {isBonus ? '✦' : '●'}
                         </span> 
                         <span className={isBonus ? "text-green-400 font-semibold" : "text-gray-400"}>
                           {typeof s === "string" ? s : s.text}
                         </span>
                      </li>
                    );
                  })}
                </ul>
                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold text-xs tracking-widest uppercase">
                  {pkg.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Annual Featured Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          {/* Animated Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-[#080808] rounded-[30px] border border-orange-500/30 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Side: Pricing Info */}
              <div className="lg:w-2/5 p-8 lg:p-12 bg-gradient-to-br from-orange-600/10 to-transparent border-b lg:border-b-0 lg:border-r border-orange-500/20">
                <div className="inline-flex items-center gap-2 bg-orange-600 text-[10px] font-black px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
                  <span>★</span> Best Value Plan
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-3 leading-tight uppercase italic">{annualPackage.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl md:text-6xl font-black text-orange-500 tracking-tighter">₹{annualPackage.price}</span>
                  <span className="text-gray-400 font-bold italic">/Year</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{annualPackage.idealFor}</p>
                <div className="inline-block bg-green-500/10 text-green-400 font-bold text-xs py-2 px-4 rounded-lg border border-green-500/20">
                  SAVE ₹{annualPackage.savings} INSTANTLY
                </div>
              </div>

              {/* Right Side: Features */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between bg-white/[0.01]">
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Premium Features Included:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 mb-10">
                    {annualPackage.services.map((service, idx) => {
                      const isBonus = typeof service === 'object' && service.bonus;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className={`w-5 h-5 flex-shrink-0 ${isBonus ? 'text-green-400' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm leading-tight ${isBonus ? 'text-green-300 font-bold' : 'text-gray-300'}`}>
                            {typeof service === 'string' ? service : service.text}
                            {isBonus && <span className="ml-2 text-[10px] bg-green-500/20 px-1.5 py-0.5 rounded uppercase tracking-tighter">Bonus</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <button className="w-full lg:w-max px-14 py-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl font-black text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:scale-[1.02] active:scale-95 transition-all">
                  {annualPackage.buttonText}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Guarantee */}
        <p className="text-center mt-12 text-gray-500 text-[10px] font-bold tracking-[0.4em] uppercase opacity-50">
          No hidden fees • Instant activation • cancel anytime
        </p>
      </div>
    </section>
  );
}