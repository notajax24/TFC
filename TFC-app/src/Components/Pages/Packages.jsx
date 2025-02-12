import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const packages = [
  {
    name: "Basic",
    price: "12,000",
    services: [
      "Basic Gym Access",
      "Locker Facility",
      "Group Classes",
      "Shower Access",
    ],
    color: "from-slate-700 to-black",
  },
  {
    name: "Pro",
    price: "15,000",
    services: [
      "All Silver Benefits",
      "Personal Trainer (2x/week)",
      "Sauna Access",
      "Nutrition Plan",
      "24/7 Access",
    ],
    color: "from-slate-700 to-black",
    recommended: true,
  },
  {
    name: "Elite",
    price: "20000",
    services: [
      "All Gold Benefits",
      "Unlimited Personal Training",
      "Massage Therapy",
      "Private Locker",
      "Supplement Pack",
      "VIP Access",
    ],
    color: "from-slate-700 to-black",
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 font-montserrat"
    >
      <div className="container mx-auto px-4 py-15 cursor-pointer">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-200 to-balck-600 bg-clip-text text-transparent text-center mb-16">
          Membership Packages
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatePresence>
            {packages.map((pkg, index) => (
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div
                  className={`bg-gradient-to-br ${pkg.color} rounded-3xl p-8 h-full flex flex-col`}
                >
                  <div className="text-center space-y-6 flex flex-col h-full">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-200 to-balck-600">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-bold text-slate-200 ">
                      ₹ {pkg.price}
                      <span className="text-xl">/year</span>
                    </div>

                    <ul className="space-y-4 my-8 flex-1">
                      {pkg.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-center text-gray-200"
                        >
                          <svg
                            className="w-5 h-5 mr-2 text-green-400"
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
                          {service}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full py-3 bg-slate-200 hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-all mt-auto cursor-pointer">
                      Choose Plan
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
