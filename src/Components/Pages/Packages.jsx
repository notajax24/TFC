import { motion, AnimatePresence } from "framer-motion";

const monthlyPackages = [
  {
    name: "THE IGNITION PACK",
    duration: "1 Month",
    price: "2,499",
    idealFor: "Testing the waters",
    services: [
      "Gym Floor Access (Weights & Cardio)",
      "General Trainer Support",
      "Locker & Shower Access",
      { text: "1 MMA Session ", bonus: true, bigBonus: true },
    ],
    color: "from-slate-700 to-black",
    borderColor: "border-gray-600",
    buttonText: "Start My Trial",
  },
  {
    name: "THE SILVER PACK ",
    duration: "3 Months",
    price: "5,999",
    originalPrice: "6,999",
    savings: "1,000",
    idealFor: "Building a base habit",
    services: [
      "All Gym Access (Weights, Cardio, Steam)",
      "Free BMI & Body Composition Analysis",
      "General Trainer Support",
      { text: "3 FREE MMA Sessions (Try the combat zone)", bonus: true },
    ],
    color: "from-slate-700 to-black",
    borderColor: "border-gray-600",
    buttonText: "Get 3 Months",
  },
  {
    name: "THE GOLD PACK",
    duration: "6 Months",
    price: "9,999",    originalPrice: "10,999",
    savings: "1,500",


    idealFor: "Visible physical changes",
    services: [
      "All Gym Access (Weights, Cardio, Steam)",
      "1 Month Freeze Option (Travel/Sick Leave)",
      "Diet Chart Consultation",
      { text: "6 MMA Session ", bonus: true, bigBonus: true },
      
      { text: "Free TFC T-Shirt", bonus: true },
    ],
  
    recommended: true,
    buttonText: "Join the Tribe",
  },
];

const annualPackages = [
  {
    name: "Basic",
    duration: "1 Year",
    price: "14,999",
    
    idealFor: "Year-round commitment",
    services: [
      "Basic Gym Access",
      "Locker Facility",
      "Group Classes",
      "Shower Access",
      "KickBoxing - 3x/Monthly",
      "Strength / Cardio / Meditation",
      { text: "Free TFC T-Shirt", bonus: true  },
    ],
    buttonText: "Choose Plan",
    annual: true,
  },
  {
    name: "Pro",
    duration: "1 Year",
    price: "17,999",
    idealFor: "Complete fitness journey",
    services: [
      "All Basic Benefits",
      "Free Drinks - 3 Months",
      "Steam Bath 3x/Month",
      "Yoga/Zumba/Dance - 3 Months",
      "Nutrition Plan",
      "MMA Training - 3x/Monthly",
      { text: "Free TFC T-Shirt", bonus: true },
    ],
    buttonText: "Choose Plan",
    annual: true,
    annualRecommended: true,
  },
  {
    name: "Elite",
    duration: "1 Year",
    price: "21,999",
    idealFor: "Premium experience",
    services: [
      "All Basic Benefits",
      "Private Locker",
      "Free Meals - 3 Months",
      "MMA Training - 5x/Monthly",
      "Steam Bath 5x/Month",
      "Game Zone Access 2x/Week",
      { text: "Free TFC T-Shirt", bonus: true },
    ],
    buttonText: "Choose Plan",
    annual: true,
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-20 font-montserrat"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-200 to-balck-600 bg-clip-text text-transparent text-center mb-12 md:mb-16">
          Membership Packages
        </h2>

        {/* Monthly Packages */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-300 text-center mb-6 md:mb-8">
            Monthly Plans
          </h3>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <AnimatePresence>
              {monthlyPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                className="relative"
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                   POPULAR
                  </div>
                )}

                <div
                  className={`bg-gradient-to-br ${pkg.color} rounded-2xl p-4 md:p-5 lg:p-6 h-full flex flex-col border-2 ${pkg.borderColor} ${pkg.recommended ? 'ring-2 ring-orange-500/50' : ''} ${pkg.annual ? 'ring-4 ring-orange-500/60 shadow-2xl shadow-orange-500/20' : ''}`}
                >
                  {pkg.annual && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                      ⭐ BEST VALUE
                    </div>
                  )}
                  <div className="text-center space-y-2 md:space-y-3 flex flex-col h-full">
                    <div>
                      <h3 className={`${pkg.annual ? 'text-xl md:text-2xl' : 'text-xl md:text-2xl'} font-bold bg-gradient-to-r from-slate-200 to-gray-400 mb-1`}>
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-gray-400 italic">{pkg.idealFor}</p>
                    </div>
                    
                    <div className="space-y-1">
                      {pkg.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          ₹ {pkg.originalPrice}
                        </div>
                      )}
                      <div                       className={`${pkg.annual ? 'text-3xl md:text-4xl' : 'text-3xl'} font-bold ${pkg.annual ? 'text-orange-300' : 'text-slate-200'}`}>
                        ₹ {pkg.price}
                        <span className="text-base md:text-lg text-gray-400">/{pkg.duration.toLowerCase()}</span>
                      </div>
                      {pkg.savings && (
                        <div className="text-xs text-green-400 font-semibold">
                          You save ₹{pkg.savings}
                        </div>
                      )}
                      {pkg.annual && (
                        <div className="text-xs text-orange-300 font-semibold">
                          Best Annual Deal
                        </div>
                      )}
                    </div>

                    <ul className="space-y-2 my-3 md:my-4 flex-1 text-left text-sm">
                      {pkg.services.map((service, idx) => {
                        const serviceText = typeof service === 'string' ? service : service.text;
                        const isBonus = typeof service === 'object' && service.bonus;
                        const isBigBonus = typeof service === 'object' && service.bigBonus;
                        
                        return (
                          <li
                            key={idx}
                            className={`flex items-start ${isBonus ? (isBigBonus ? 'text-green-300 font-bold' : 'text-green-400') : 'text-gray-200'}`}
                          >
                            <svg
                              className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${isBonus ? 'text-green-400' : pkg.annual ? 'text-orange-400' : 'text-green-400'}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className={`${isBigBonus ? 'text-xs md:text-sm' : 'text-xs md:text-sm'} ${pkg.annual ? 'text-gray-100' : ''}`}>
                              {isBonus && <span className="mr-1">🎁</span>}
                              {serviceText}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <button 
                      onClick={() => {
                        window.location.href = "https://ramp3.ndforce.com/qrhome?company=U2FsdGVkX19cqbJcOKVxbinc%2BrQCCZY9u2APB0eCJrnDqpnBgmK0iaGo%2BEdaW8DeHWhkZcRlU0yyHd1wXb1oWDp58PHQGeuMplA6JwYUai8%3D";
                      }} 
                      className={`w-full py-2.5 md:py-3 text-sm font-bold rounded-lg transition-all mt-auto cursor-pointer ${
                        pkg.annual
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30'
                          : pkg.recommended 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                          : 'bg-slate-200 hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      {pkg.buttonText}
                    </button>
                  </div>
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Annual Packages */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-orange-400 text-center mb-3 md:mb-4">
            Annual Plans
          </h3>
          <p className="text-center text-gray-400 text-sm mb-6 md:mb-8">Best Value - Save More with Yearly Commitment</p>
          <div className="grid md:grid-cols-3 pt-6 gap-4 md:gap-6 max-w-5xl mx-auto">
            <AnimatePresence>
              {annualPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (index + monthlyPackages.length) * 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.3)",
                  }}
                  className="relative"
                >
                 
                  {pkg.annualRecommended && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-xs font-bold z-10 shadow-lg">
                      MOST POPULAR
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${pkg.color} rounded-2xl p-4 md:p-5 lg:p-6 h-full flex flex-col border-2 ${pkg.borderColor} ring-4 ring-orange-500/60 shadow-2xl shadow-orange-500/20`}
                  >
                    <div className="text-center space-y-2 md:space-y-3 flex flex-col h-full">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-200 to-orange-400 mb-1">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-gray-300 italic">{pkg.idealFor}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-3xl md:text-4xl font-bold text-orange-300">
                          ₹ {pkg.price}
                          <span className="text-base md:text-lg text-gray-400">/{pkg.duration.toLowerCase()}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 my-3 md:my-4 flex-1 text-left text-sm">
                        {pkg.services.map((service, idx) => {
                          const serviceText = typeof service === 'string' ? service : service.text;
                          
                          return (
                            <li
                              key={idx}
                              className="flex items-start text-gray-100"
                            >
                              <svg
                                className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-orange-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-xs md:text-sm">
                                {serviceText}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <button 
                        onClick={() => {
                          window.location.href = "https://ramp3.ndforce.com/qrhome?company=U2FsdGVkX19cqbJcOKVxbinc%2BrQCCZY9u2APB0eCJrnDqpnBgmK0iaGo%2BEdaW8DeHWhkZcRlU0yyHd1wXb1oWDp58PHQGeuMplA6JwYUai8%3D";
                        }} 
                        className="w-full py-2.5 md:py-3 text-sm font-bold rounded-lg transition-all mt-auto cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30"
                      >
                        {pkg.buttonText}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
