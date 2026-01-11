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
      { text: "1 MMA Session", bonus: true, bigBonus: true },
    ],
    color: "from-slate-700 to-black",
    borderColor: "border-gray-600",
    buttonText: "Start My Trial",
  },
  {
    name: "THE SILVER PACK",
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
    price: "9,999",
    originalPrice: "10,999",
    savings: "1,500",
    idealFor: "Visible physical changes",
    services: [
      "All Gym Access (Weights, Cardio, Steam)",
      "1 Month Freeze Option (Travel/Sick Leave)",
      "Diet Chart Consultation",
      { text: "6 MMA Session", bonus: true, bigBonus: true },
      { text: "Free TFC T-Shirt", bonus: true },
    ],
    recommended: true,
    color: "from-slate-700 to-black",
    borderColor: "border-gray-600",
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
      "Strength / Cardio / Meditation",
      { text:  "KickBoxing - 3x/Monthly", bonus: true },
      { text: "Free TFC T-Shirt", bonus: true },
    ],
    buttonText: "Start My Year",
    annual: true,
    color: "from-slate-800 to-black", // Slightly darker base
    borderColor: "border-orange-500/50", // Distinct border
  },
  {
    name: "Pro",
    duration: "1 Year",
    price: "17,999",
    idealFor: "Complete fitness journey",
    services: [
      "All Basic Benefits",
      "Nutrition Plan",
      "Steam Bath 3x/Month",
      "MMA Training - 3x/Monthly",
      { text: "Free Drinks - 3 Months", bonus: true },
      { text: "Yoga/Zumba/Dance - 3 Months", bonus: true },
      { text: "Free TFC T-Shirt", bonus: true },
    ],
    buttonText: "Go Pro Today",
    annual: true,
    annualRecommended: true,
    color: "from-slate-800 to-black",
    borderColor: "border-orange-500",
  },
  {
    name: "Elite",
    duration: "1 Year",
    price: "23,999",
    idealFor: "Premium experience",
    services: [
      "All Basic Benefits",
      "Private Locker",
      "Steam Bath 5x/Month",
      { text: "Free Meals - 3 Months", bonus: true },
      { text:"MMA Training - 5x/Monthly", bonus: true},
       {text:"Game Zone Access 2x/Week" ,bonus: true},
      { text: "Free TFC T-Shirt", bonus: true },
    ],
    buttonText: "Get Elite Access",
    annual: true,
    color: "from-slate-800 to-black",
    borderColor: "border-orange-500/50",
  },
];

export default function Packages() {
  // Helper function to render a single card (used for both monthly and annual to ensure identical design)
  const renderCard = (pkg, index) => {
    return (
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
        className="relative h-full"
      >
        {/* Badges for Recommended/Popular */}
        {(pkg.recommended || pkg.annualRecommended) && (
          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-bold z-10 shadow-lg whitespace-nowrap">
            {pkg.annualRecommended ? "MOST POPULAR" : "POPULAR"}
          </div>
        )}

        {/* Card Container */}
        <div
          className={`
            bg-gradient-to-br ${pkg.color || "from-slate-700 to-black"} 
            rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 h-full flex flex-col border-2 
            ${pkg.borderColor || "border-gray-600"}
            ${pkg.recommended ? "ring-2 ring-orange-500/50" : ""} 
            ${pkg.annual ? "shadow-2xl shadow-orange-500/10" : ""}
            ${pkg.annualRecommended ? "ring-2 sm:ring-4 ring-orange-500/60 shadow-orange-500/20" : ""}
          `}
        >
          {/* Best Value Badge for Annual */}
          {pkg.annual && (
            <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold z-10 shadow-lg">
              ⭐ BEST VALUE
            </div>
          )}

          <div className="text-center space-y-2 md:space-y-3 flex flex-col h-full">
            {/* Header */}
            <div>
              <h3
                className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 px-1 ${
                  pkg.annual
                    ? "bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-slate-200 to-gray-400"
                }`}
              >
                {pkg.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 italic px-2">{pkg.idealFor}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              {pkg.originalPrice && (
                <div className="text-[10px] sm:text-xs text-gray-500 line-through">
                  ₹ {pkg.originalPrice}
                </div>
              )}
              <div
                className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                  pkg.annual ? "text-orange-300" : "text-slate-200"
                }`}
              >
                ₹ {pkg.price}
                <span className="text-sm sm:text-base md:text-lg text-gray-400">
                  /{pkg.duration.toLowerCase()}
                </span>
              </div>
              {pkg.savings && (
                <div className="text-[10px] sm:text-xs text-green-400 font-semibold">
                  You save ₹{pkg.savings}
                </div>
              )}
            </div>

            {/* Services List */}
            <ul className="space-y-1.5 sm:space-y-2 my-3 md:my-4 flex-1 text-left text-xs sm:text-sm px-1">
              {pkg.services.map((service, idx) => {
                const serviceText =
                  typeof service === "string" ? service : service.text;
                const isBonus = typeof service === "object" && service.bonus;
                const isBigBonus =
                  typeof service === "object" && service.bigBonus;

                return (
                  <li
                    key={idx}
                    className={`flex items-start ${
                      isBonus
                        ? isBigBonus
                          ? "text-green-300 font-bold"
                          : "text-green-400"
                        : "text-gray-200"
                    }`}
                  >
                    <svg
                      className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0 ${
                        isBonus
                          ? "text-green-400"
                          : pkg.annual
                          ? "text-orange-400"
                          : "text-green-400"
                      }`}
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
                    <span className="leading-tight sm:leading-normal">
                      {isBonus && <span className="mr-1">🎁</span>}
                      {serviceText}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => {
                window.location.href =
                  "https://ramp3.ndforce.com/qrhome?company=U2FsdGVkX19cqbJcOKVxbinc%2BrQCCZY9u2APB0eCJrnDqpnBgmK0iaGo%2BEdaW8DeHWhkZcRlU0yyHd1wXb1oWDp58PHQGeuMplA6JwYUai8%3D";
              }}
              className={`w-full py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-bold rounded-lg transition-all mt-auto cursor-pointer ${
                pkg.annual || pkg.recommended
                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30"
                  : "bg-slate-200 hover:bg-gray-100 text-gray-900"
              }`}
            >
              {pkg.buttonText}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="packages"
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16 md:py-20 font-montserrat"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-200 to-gray-600 bg-clip-text text-transparent text-center mb-8 sm:mb-12 md:mb-16 px-2">
          Membership Packages
        </h2>

        {/* Monthly Packages */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 text-center mb-4 sm:mb-6 md:mb-8 px-2">
            Monthly Plans
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
            <AnimatePresence>
              {monthlyPackages.map((pkg, index) => renderCard(pkg, index))}
            </AnimatePresence>
          </div>
        </div>

        {/* Annual Packages */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 text-center mb-2 sm:mb-3 md:mb-4 px-2">
            Annual Plans
          </h3>
          <p className="text-center text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 px-4">
            Best Value - Save More with Yearly Commitment
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4 sm:pt-6 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
            <AnimatePresence>
              {annualPackages.map((pkg, index) => renderCard(pkg, index))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}