import { motion } from "framer-motion";

export default function Join() {
  return (
    <section
      id="join"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-gradient-to-br from-gray-800 to-gray-700 rounded-[2rem] p-8 md:p-12 lg:px-16 shadow-2xl space-y-8"
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-400 to-orange-400 bg-clip-text text-transparent">
            Transform Your Fitness Journey
          </h2>

          <p className="text-gray-300 text-lg md:text-xl">
            Join our community of 1000+ members and get exclusive access to
            personalized workout plans, nutrition guides, and expert support.
          </p>

          <div className="mt-8 w-full">
            <div className="flex flex-col items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-xs md:max-w-none px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 text-white placeholder-gray-400 text-center md:text-left"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-xs md:w-40 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl text-lg cursor-pointer"
              >
                Join Now
              </motion.button>
            </div>

            <p className="text-center text-gray-400 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
