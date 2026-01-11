import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bg from "../../assets/bg.jpg";
import bgvideo from "../../assets/bgvideo.mp4";

import {
  FaDumbbell,
  FaUserFriends,
  FaChartLine,
  FaFire,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Home() {

  // const [countdown, setCountdown] = useState({ days: 0, hours: 0 });

  // // Set target date to January 26th
  // const getTargetDate = () => {
  //   const now = new Date();
  //   const target = new Date();
  //   target.setMonth(0); // January (0-indexed)
  //   target.setDate(26);
  //   target.setHours(23, 59, 59, 999); // End of day
    
  //   // If January 26th has passed this year, set it to next year
  //   if (target < now) {
  //     target.setFullYear(now.getFullYear() + 1);
  //   } else {
  //     target.setFullYear(now.getFullYear());
  //   }
    
  //   return target;
  // };

  // useEffect(() => {
  //   const targetDate = getTargetDate();
    
  //   const updateCountdown = () => {
  //     const now = new Date().getTime();
  //     const target = targetDate.getTime();
  //     const difference = target - now;

  //     if (difference > 0) {
  //       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //       setCountdown({ days, hours });
  //     } else {
  //       setCountdown({ days: 0, hours: 0 });
  //     }
  //   };

  //   updateCountdown();
  //   const interval = setInterval(updateCountdown, 1000 * 60); // Update every minute

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <section   id="home" className="relative min-h-screen bg-gradient-to-b from-black/80 via-black/60 to-black/80">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover -z-10 hidden md:block"
        onLoadedData={(e) => {
          // Ensure video plays after loading
          e.target.play().catch(() => {});
        }}
        style={{ willChange: 'auto' }}
      >
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Image for Mobile */}
      <div className="absolute inset-0 w-full h-full -z-10 md:hidden">
        <img
          src={bg}
          alt="Gym background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center md:justify-center pt-20 md:pt-0 pb-8 md:pb-0">
        {/* Countdown Timer */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-28 sm:top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r from-orange-600/30 via-red-600/30 to-orange-600/30 backdrop-blur-md text-white text-center py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg border border-orange-500/20 w-[90%] md:w-auto max-w-md md:max-w-none"
        >
          <p className="text-[10px] sm:text-xs md:text-base font-semibold leading-tight md:leading-normal">
            <span className="hidden sm:inline">Pre-launch Offer Ends in: </span>
            <span className="sm:hidden">Offer Ends: </span>
            <span className="font-bold text-orange-300 text-xs sm:text-sm md:text-lg lg:text-xl">
              {String(countdown.days).padStart(2, "0")} Days {String(countdown.hours).padStart(2, "0")} Hrs
            </span>
          </p>
        </motion.div> */}

        {/* Main Content */}
        <div className="text-center relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 leading-tight">
            <span className="text-slate-200">We Don&apos;t Just </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            Train
            </span>
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            We
            </span>
            <span className="text-slate-200"> Fuel</span>
          </h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            &quot;Nashik&apos;s Premier Luxury Gym &amp; Fitness Club&quot;
          </motion.p>

          <motion.button
            onClick={() => {
              window.location.href = "https://ramp3.ndforce.com/qrhome?company=U2FsdGVkX19cqbJcOKVxbinc%2BrQCCZY9u2APB0eCJrnDqpnBgmK0iaGo%2BEdaW8DeHWhkZcRlU0yyHd1wXb1oWDp58PHQGeuMplA6JwYUai8%3D";
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-500 to-red-200 hover:from-slate-400 hover:to-black text-grey-900 hover:text-white font-bold text-base sm:text-lg rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            Join Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Stats (Below main content) */}
        <div className="md:hidden w-full mt-8 px-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "150+", label: "Members", icon: <FaUserFriends /> },
              { value: "10+", label: "Trainers", icon: <FaDumbbell /> },
              { value: "10+", label: "Amenities", icon: <FaMapMarkerAlt /> },
              { value: "98%", label: "Success", icon: <FaChartLine /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="text-yellow-400">{stat.icon}</div>
                  <div>
                    <div className="text-lg font-bold text-gray-100">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Stats (Original Position) */}
        <div className="hidden md:block absolute left-4 xl:left-20 bottom-1/3 space-y-8">
          {[
            {
              value: "150+",
              label: "Members",
              icon: <FaUserFriends className="w-6 h-6 text-yellow-400" />,
              color: "from-yellow-400/20",
            },
            {
              value: "10+",
              label: "Trainers",
              icon: <FaDumbbell className="w-6 h-6 text-orange-500" />,
              color: "from-orange-500/20",
            },
            {
              value: "10+",
              label: "Amenities",
              icon: <FaMapMarkerAlt className="w-6 h-6 text-blue-400" />,
              color: "from-blue-400/20",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className={`bg-gradient-to-r ${stat.color} to-transparent p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700/50 w-36 sm:w-48 flex items-center gap-2 sm:gap-4`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-lg sm:text-xl"
              >
                {stat.icon}
              </motion.div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-gray-100">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="hidden md:block absolute right-4 xl:right-20 bottom-1/3 space-y-8">
          {[
            {
              value: "98%",
              label: "Success Rate",
              icon: <FaChartLine className="w-6 h-6 text-green-400" />,
              color: "from-green-400/20",
            },
            {
              value: "1M+",
              label: "Calories Burned",
              icon: <FaFire className="w-6 h-6 text-red-500" />,
              color: "from-red-500/20",
            },
            {
              value: "24/7",
              label: "Support",
              icon: <FaClock className="w-6 h-6 text-purple-400" />,
              color: "from-purple-400/20",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className={`bg-gradient-to-l ${stat.color} to-transparent p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700/50 w-36 sm:w-48 flex items-center gap-2 sm:gap-4`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-lg sm:text-xl"
              >
                {stat.icon}
              </motion.div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-gray-100">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
