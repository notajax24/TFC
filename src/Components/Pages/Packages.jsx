import { motion } from "framer-motion";
// Ensure packageImage is correctly imported from your assets
import packageImage from "../../assets/packageimage.jpg"; 

const monthlyPackages = [
  {
    name: "1 MONTH PACKAGE",
    duration: "Month",
    price: "2,499",
    originalPrice: "3,499",
    savings: "1,000",
    idealFor: "Testing The Waters",
    services: [
      "All Equipment Access",
      "Meditation Room Access",
      "Daily Shower Access",
      "Certified Trainer Guidance",
    ],
    borderColor: "border-white/10",
    buttonText: "Start Trial",
  },
  {
    name: "3 MONTHS PACKAGE",
    duration: "3 Months",
    price: "5,999",
    originalPrice: "6,999",
    savings: "1,000",
    idealFor: "Building A Base Habit",
    services: [
      "All Equipment Access",
      "Meditation Room Access",
      "Daily Shower Access",
      "Certified Trainer Guidance",
      { text: "2 Steam Sessions / Month", bonus: true },
      { text: "Gaming Zone: 10min / Day", bonus: true },
    ],
    borderColor: "border-white/10",
    buttonText: "Get 3 Months",
  },
  {
    name: "6 MONTHS PACKAGE",
    duration: "6 Months",
    price: "9,999",
    originalPrice: "10,999",
    savings: "1,000",
    recommended: true,
    idealFor: "Visible Physical Changes",
    services: [
      "All Equipment Access",
      "Meditation Room Access",
      "Daily Shower Access",
      "Certified Trainer Guidance",
      { text: "3 Steam Sessions / Month", bonus: true },
      { text: "Gaming Zone: 10min / Day", bonus: true },
      { text: "1 MMA Session / Month", bonus: true },
      { text: "1 Self-Defense Session / Month", bonus: true },
    ],
    borderColor: "border-orange-500/50",
    buttonText: "Join the Tribe",
  },
];

const annualPackage = {
  name: "YEARLY PACKAGE",
  duration: "Year",
  price: "14,999",
  originalPrice: "17,999",
  savings: "3,000",
  idealFor: "Elite Lifestyle Commitment",
  image: packageImage,
  services: [
    "All Equipment Access",
    "Meditation Room Access",
    "Daily Shower Access",
    "Certified Trainer Guidance",
    { text: "Weekly Steam Sessions", bonus: true },
    { text: "Gaming Zone: 20min / Day", bonus: true },
    { text: "2 MMA Sessions / Month", bonus: true },
    { text: "2 Self-Defense Sessions / Month", bonus: true },
  ],
  buttonText: "Go Pro - Save ₹3,000",
};

export default function Packages() {
  const inquiryLink = "https://ramp3.ndforce.com/qrhome?company=U2FsdGVkX19cqbJcOKVxbinc%2BrQCCZY9u2APB0eCJrnDqpnBgmK0iaGo%2BEdaW8DeHWhkZcRlU0yyHd1wXb1oWDp58PHQGeuMplA6JwYUai8%3D";

  const renderCard = (pkg, index, isYearly = false) => (
    <motion.div
      key={pkg.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`relative p-[1px] rounded-[2.5rem] overflow-hidden flex flex-col h-full ${
        pkg.recommended || isYearly ? "bg-gradient-to-b from-orange-500 to-red-600 shadow-[0_0_40px_rgba(234,88,12,0.15)]" : "bg-zinc-800"
      }`}
    >
      {/* Ensure internal container is flex-col and h-full */}
      <div className={`bg-zinc-950 rounded-[2.4rem] h-full flex flex-col ${isYearly ? 'lg:flex-row items-stretch' : ''} border ${pkg.borderColor} transition-colors duration-300 relative overflow-hidden`}>
        
        {/* TEXT CONTENT AREA */}
        <div className={`p-6 md:p-10 flex flex-col flex-1 ${isYearly ? 'lg:w-3/5 lg:pr-4' : 'w-full'}`}>
          {pkg.recommended && (
            <span className="absolute top-6 right-8 bg-orange-600 text-[10px] font-black px-3 py-1 rounded-full italic uppercase tracking-widest text-white z-20">
              Most Popular
            </span>
          )}
          
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">
              {pkg.name}
            </h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              {pkg.idealFor}
            </p>
          </div>
          
          <div className="mb-8">
            <div className="text-zinc-500 line-through text-sm font-bold opacity-70">₹{pkg.originalPrice}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">₹{pkg.price}</span>
              <span className="text-zinc-500 text-xs font-bold italic">/{pkg.duration}</span>
            </div>
            <div className="mt-2 inline-block bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-green-500/20">
              Save ₹{pkg.savings} Instantly
            </div>
          </div>

          {/* flex-grow here pushes the button down */}
          <ul className={`grid ${isYearly ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-3 mb-10 flex-grow`}>
            {pkg.services.map((s, idx) => {
              const isBonus = typeof s === "object" && s.bonus;
              const text = typeof s === "string" ? s : s.text;
              return (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className={`mt-1 text-xs ${isBonus ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-orange-500'}`}>
                    {isBonus ? '✦' : '●'}
                  </span>
                  <span className={isBonus ? "text-green-300 font-bold" : "text-zinc-400 font-medium"}>
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Button is now anchored to the bottom by the flex-grow list above */}
          <div className="mt-auto">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(inquiryLink, "_blank")}
              className={`w-full max-w-sm py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden group ${
                pkg.recommended || isYearly 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                  : 'bg-white text-black hover:bg-orange-600 hover:text-white'
              }`}
            >
              <span className="relative z-10">{pkg.buttonText}</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
            </motion.button>
          </div>
        </div>

        {/* IMAGE AREA: RIGHT SIDE */}
        {isYearly && pkg.image && (
          <div className="hidden lg:block lg:w-2/5 relative overflow-hidden border-l border-white/5">
            <motion.img 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              src={pkg.image} 
              alt="Elite Package" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="packages" className="py-24 bg-black relative overflow-hidden">
      <h2 className="text-6xl md:text-[12rem] font-black text-white italic uppercase tracking-tighter leading-none opacity-5 absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap select-none pointer-events-none">
        MEMBERSHIPS
      </h2>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-xs">Choose Your Level</span>
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mt-2">
            SELECT A <span className="text-orange-600">PLAN</span>
          </h2>
          <div className="h-1 w-24 bg-orange-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Standard Grid with items-stretch to keep cards same height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {monthlyPackages.map((pkg, i) => renderCard(pkg, i))}
        </div>

        {/* Elite Yearly Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            {renderCard(annualPackage, 4, true)}
          </div>
        </motion.div>
      </div>

     
    </section>
  );
}