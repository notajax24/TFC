import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiCheckCircle, FiCircle, FiInfo, FiTarget } from "react-icons/fi";
import { dietPlans } from "../../data/dietData";

export default function DietSection() {
  const [setup, setSetup] = useState(() => {
    const saved = localStorage.getItem("tfc_diet_setup");
    return saved ? JSON.parse(saved) : null;
  });

  const [completedMeals, setCompletedMeals] = useState(() => {
    const saved = localStorage.getItem("tfc_diet_progress");
    return saved ? JSON.parse(saved) : {};
  });

  const [currentDay, setCurrentDay] = useState(
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]
  );

  useEffect(() => {
    localStorage.setItem("tfc_diet_setup", JSON.stringify(setup));
    localStorage.setItem("tfc_diet_progress", JSON.stringify(completedMeals));
  }, [setup, completedMeals]);

  const handleToggleMeal = (mealKey) => {
    const key = `${currentDay}-${mealKey}`;
    setCompletedMeals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Setup Wizard Component
  if (!setup) {
    return (
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 text-center">
        <FiTarget className="text-5xl text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black italic uppercase text-white mb-2">Initialize Diet Lab</h2>
        <p className="text-zinc-500 text-sm mb-8 font-medium">Select your parameters for a custom fuel plan.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select id="goal" className="bg-black/50 border border-white/10 p-4 rounded-2xl text-white outline-none">
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintenance</option>
          </select>
          <select id="gender" className="bg-black/50 border border-white/10 p-4 rounded-2xl text-white outline-none">
            <option>Male</option>
            <option>Female</option>
          </select>
          <select id="type" className="bg-black/50 border border-white/10 p-4 rounded-2xl text-white outline-none">
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>
        </div>

        <button 
          onClick={() => setSetup({
            goal: document.getElementById('goal').value,
            gender: document.getElementById('gender').value,
            type: document.getElementById('type').value
          })}
          className="px-12 py-4 bg-orange-600 text-white font-black italic uppercase tracking-widest rounded-2xl hover:bg-orange-700 transition-all"
        >
          Generate Plan
        </button>
      </div>
    );
  }

  const plan = dietPlans[setup.goal]?.[setup.gender]?.[setup.type];
  const todaysMeals = plan?.meals[currentDay];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-orange-600 rounded-[2rem] p-8 shadow-xl">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
            {setup.goal} <span className="text-black/50">PROTCOL</span>
          </h2>
          <p className="text-white/80 font-bold text-xs uppercase tracking-[0.2em] mt-1">
            {setup.gender} • {setup.type} • {plan?.calories} Kcal / Day
          </p>
        </div>
        <button onClick={() => setSetup(null)} className="mt-4 md:mt-0 text-[10px] font-black uppercase tracking-widest bg-black/20 px-4 py-2 rounded-full hover:bg-black/40">
          Reset Plan
        </button>
      </div>

      {/* Week Navigation */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <button 
            key={day}
            onClick={() => setCurrentDay(day)}
            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              currentDay === day ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-500 border border-white/5'
            }`}
          >
            {day.substring(0, 3)}
          </button>
        ))}
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(todaysMeals || {}).map(([key, meal]) => {
          const isDone = completedMeals[`${currentDay}-${key}`];
          const labels = { b: "Breakfast", l: "Lunch", d: "Dinner", s: "Snack" };
          
          return (
            <motion.div 
              whileTap={{ scale: 0.98 }}
              key={key}
              onClick={() => handleToggleMeal(key)}
              className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between ${
                isDone ? 'bg-green-500/10 border-green-500/30' : 'bg-zinc-900/40 border-white/5 hover:border-orange-500/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`text-2xl ${isDone ? 'text-green-500' : 'text-zinc-600'}`}>
                  {isDone ? <FiCheckCircle /> : <FiCircle />}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{labels[key]}</span>
                  <h4 className={`text-lg font-bold italic uppercase tracking-tight ${isDone ? 'text-zinc-400 line-through' : 'text-white'}`}>
                    {meal}
                  </h4>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nutrition Tip */}
      <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2rem] flex gap-4 items-center">
        <FiInfo className="text-blue-500 text-2xl flex-shrink-0" />
        <p className="text-sm text-blue-200/80 font-medium">
          Remember to drink at least 3.5L of water today. Consistency in meal timing is just as important as the food itself.
        </p>
      </div>
    </div>
  );
}