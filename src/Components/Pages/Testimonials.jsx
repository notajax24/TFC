// import { motion } from "framer-motion";
// import { FaStar, FaQuoteLeft } from "react-icons/fa";

// const testimonials = [
//   {
//     name: "Aditya Patil",
//     role: "Body Transformation",
//     image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
//     review: "I joined TFC with zero knowledge about lifting. In 6 months, I've not only lost 12kgs but built muscle I didn't know I could have. The trainers actually care about your form.",
//     rating: 5,
//     memberSince: "2023",
//   },
//   {
//     name: "Sneha Deshmukh",
//     role: "Zumba & Cardio",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
//     review: "The energy here is unmatched! The group classes are the highlight of my day. It doesn't feel like a workout, it feels like a party where you burn calories.",
//     rating: 5,
//     memberSince: "2024",
//   },
//   {
//     name: "Rohan Mehta",
//     role: "Strength Training",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
//     review: "Best equipment in Nashik, hands down. The lifting platforms are professional grade and the vibe pushes you to hit PRs. Highly recommend the Annual Pro plan.",
//     rating: 5,
//     memberSince: "2022",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Weight Loss",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
//     review: "TFC changed my relationship with food and fitness. The diet consultation included in the Gold Pack was a game changer for me. Down 8kg and feeling stronger!",
//     rating: 4,
//     memberSince: "2023",
//   },
//   {
//     name: "Vikram Singh",
//     role: "MMA Enthusiast",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
//     review: "Finally a gym that takes combat sports seriously. The MMA zone is spacious and the instructors know their stuff. Great community of fighters here.",
//     rating: 5,
//     memberSince: "2024",
//   },
//   {
//     name: "Anjali Kulkarni",
//     role: "General Fitness",
//     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
//     review: "Clean hygiene, great crowd, and safe environment for women. I come here at 6 AM and the staff is always energetic and helpful.",
//     rating: 5,
//     memberSince: "2023",
//   },
// ];

// const TestimonialCard = ({ data, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -10 }}
//       className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl relative group hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
//     >
//       {/* Decorative Quote Icon */}
//       <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
//         <FaQuoteLeft className="text-6xl text-orange-500" />
//       </div>

//       {/* Header: Image & Name */}
//       <div className="flex items-center gap-4 mb-6 relative z-10">
//         <div className="relative">
//             <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500/50 group-hover:border-orange-500 transition-colors">
//             <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
//             </div>
//         </div>
//         <div>
//           <h4 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
//             {data.name}
//           </h4>
//           <p className="text-xs text-gray-400 uppercase tracking-wider">
//             {data.role}
//           </p>
//         </div>
//       </div>

//       {/* Rating Stars */}
//       <div className="flex gap-1 mb-4 text-orange-500 text-sm">
//         {[...Array(5)].map((_, i) => (
//           <FaStar key={i} className={i < data.rating ? "opacity-100" : "opacity-30"} />
//         ))}
//       </div>

//       {/* Review Text */}
//       <p className="text-gray-300 leading-relaxed text-sm mb-6 relative z-10">
//         "{data.review}"
//       </p>

//       {/* Footer: Member Since */}
//       <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
//         <span>Verified Member</span>
//         <span>Since {data.memberSince}</span>
//       </div>
//     </motion.div>
//   );
// };

// export default function Testimonials() {
//   return (
//     <section id="testimonials" className="min-h-screen bg-black py-24 font-montserrat relative overflow-hidden">
//       {/* Background Gradients */}
//       <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-800/20 rounded-full blur-[120px] pointer-events-none" />

//       <div className="container mx-auto px-6 max-w-7xl relative z-10">
//         {/* Header */}
//         <div className="text-center mb-16 space-y-4">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
//           >
//             Stories of <span className="text-orange-500">Transformation</span>
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-400 max-w-2xl mx-auto"
//           >
//             Real results from real members. Join the community that celebrates every milestone.
//           </motion.p>
//         </div>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((item, index) => (
//             <TestimonialCard key={index} data={item} index={index} />
//           ))}
//         </div>

//         {/* Call to Action */}
//         <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-20 text-center"
//         >
//             <p className="text-gray-400 mb-6">Ready to write your own success story?</p>
//             <button 
//                 onClick={() => document.getElementById("packages").scrollIntoView({ behavior: 'smooth'})}
//                 className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
//             >
//                 Start Your Journey Today
//             </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }