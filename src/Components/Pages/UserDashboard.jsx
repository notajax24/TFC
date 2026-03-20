import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import DietSection from "./DietSection";
import { useNavigate } from "react-router-dom"; // Add this if missing
import { 
  FiHome, FiCalendar, FiBarChart2, FiSettings, FiBell, FiSearch, FiPlus, FiLogOut 
} from "react-icons/fi";
import { FaRunning, FaDumbbell, FaYinYang, FaCheckCircle, FaRegCircle, FaChevronRight, FaTrophy, FaAppleAlt, FaPlayCircle } from "react-icons/fa";

// === DEFAULT INITIAL DATA ===
const defaultTrackerData = {
  dailyStats: { steps: 8745, calories: 700, activeTime: 165, sleep: 7.45, weight: 80 },
  weeklyHistory: {
    steps: [6000, 7500, 5000, 9000, 8200, 7100, 8745],
    calories: [400, 550, 300, 800, 650, 500, 700],
    activeTime: [90, 120, 60, 180, 150, 110, 165],
  },
  activities: [
    { id: 1, title: "Morning Run", time: "7:00 AM", type: "Alone", color: "bg-blue-600", duration: 45, cals: 320 },
    { id: 2, title: "TFC Gym Session", time: "8:00 PM", type: "With Coach", color: "bg-orange-600", duration: 60, cals: 450 },
  ],
  todaysWorkout: [
    { id: 101, name: "Barbell Deadlifts", sets: "4 Sets", reps: "8-10 Reps", completed: false },
    { id: 102, name: "Bulgarian Split Squats", sets: "3 Sets", reps: "12 Reps / Leg", completed: false },
    { id: 103, name: "Leg Press", sets: "3 Sets", reps: "15 Reps", completed: false },
    { id: 104, name: "Core Finisher (Planks)", sets: "3 Sets", reps: "60 Seconds", completed: false },
  ],
  labCompleted: false,
};

export default function UserDashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  
  // === CORE APP STATE ===
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, lab, courses, diet
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [activityFilter, setActivityFilter] = useState("All");
  
  // Load from Local Storage or use Default
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem('tfc_tracker_data');
    return saved ? JSON.parse(saved) : defaultTrackerData;
  });

  // Save to Local Storage on every change
  useEffect(() => {
    localStorage.setItem('tfc_tracker_data', JSON.stringify(appData));
  }, [appData]);

  // === ADD NEW ACTIVITY STATE ===
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: "", duration: "", cals: "", type: "Alone" });

  // === DYNAMIC HANDLERS ===
  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title || !newActivity.duration || !newActivity.cals) return;
    
    const durationNum = parseInt(newActivity.duration);
    const calsNum = parseInt(newActivity.cals);

    const newAct = {
      id: Date.now(),
      title: newActivity.title,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: newActivity.type,
      color: "bg-zinc-700",
      duration: durationNum,
      cals: calsNum
    };

    // Update state: Add activity, increase daily stats, and update the weekly chart arrays
    setAppData(prev => {
      const newCalories = prev.dailyStats.calories + calsNum;
      const newActiveTime = prev.dailyStats.activeTime + durationNum;
      
      const newCalHistory = [...prev.weeklyHistory.calories];
      newCalHistory[6] = newCalories; // Update today's chart point
      
      const newTimeHistory = [...prev.weeklyHistory.activeTime];
      newTimeHistory[6] = newActiveTime; // Update today's chart point

      return {
        ...prev,
        activities: [...prev.activities, newAct],
        dailyStats: { ...prev.dailyStats, calories: newCalories, activeTime: newActiveTime },
        weeklyHistory: { ...prev.weeklyHistory, calories: newCalHistory, activeTime: newTimeHistory }
      };
    });

    setNewActivity({ title: "", duration: "", cals: "", type: "Alone" });
    setIsAddModalOpen(false);
  };

  const toggleExercise = (id) => {
    setAppData(prev => {
      const updatedWorkout = prev.todaysWorkout.map(ex => 
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      );
      
      const isNowComplete = updatedWorkout.every(ex => ex.completed);
      
      // If they just completed the whole workout, reward them with stats!
      if (isNowComplete && !prev.labCompleted) {
        const newCalories = prev.dailyStats.calories + 300;
        const newActiveTime = prev.dailyStats.activeTime + 45;
        const newCalHistory = [...prev.weeklyHistory.calories];
        newCalHistory[6] = newCalories;
        const newTimeHistory = [...prev.weeklyHistory.activeTime];
        newTimeHistory[6] = newActiveTime;

        return {
          ...prev,
          todaysWorkout: updatedWorkout,
          labCompleted: true,
          dailyStats: { ...prev.dailyStats, calories: newCalories, activeTime: newActiveTime },
          weeklyHistory: { ...prev.weeklyHistory, calories: newCalHistory, activeTime: newTimeHistory }
        };
      }

      return { ...prev, todaysWorkout: updatedWorkout };
    });
  };

  // === HELPERS ===
  const formatTime = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}min`;
  const workoutProgress = (appData.todaysWorkout.filter(ex => ex.completed).length / appData.todaysWorkout.length) * 100;
  const filteredActivities = appData.activities.filter(a => activityFilter === "All" || a.type === activityFilter);

  // Generates precise SVG paths for the charts based on dynamic data arrays
  const generatePath = (data, width, height) => {
    const max = Math.max(...data) * 1.1; // Add 10% padding top
    const min = Math.min(...data) * 0.9;
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    
    return data.map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(" ");
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#111] flex items-center justify-center text-orange-500 font-black animate-pulse">Loading App...</div>;
// Add this inside your UserDashboard.jsx before the return
const MobileBottomNav = () => ( 
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-xl border-t border-white/5 px-6 py-3 z-[200] flex justify-between items-center">
      <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-orange-500' : 'text-zinc-500'}`}>
        <FiHome size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
      </button>
      <button onClick={() => setActiveTab('lab')} className={`flex flex-col items-center gap-1 ${activeTab === 'lab' ? 'text-orange-500' : 'text-zinc-500'}`}>
        <FaDumbbell size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">The Lab</span>
      </button>
      <button onClick={() => setActiveTab('diet')} className={`flex flex-col items-center gap-1 ${activeTab === 'diet' ? 'text-orange-500' : 'text-zinc-500'}`}>
        <FaAppleAlt size={20} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Diet</span>
      </button>
      <button 
  onClick={() => navigate('/')} 
  className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-500 transition-colors"
>
  <FiLogOut size={20} />
  <span className="text-[10px] font-bold uppercase tracking-tighter">Exit</span>
</button>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#141414] text-white flex font-montserrat overflow-hidden pb-28 md:pb-10">
      
      {/* SIDEBAR */}
      <nav className="hidden md:flex flex-col items-center py-8 px-4 bg-[#1a1a1a] border-r border-white/5 w-24 z-20">
        <div className="text-2xl font-black italic text-white mb-12">TFC</div>
        <div className="flex flex-col gap-8 flex-grow">
          <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-2xl transition-colors ${activeTab === 'dashboard' ? 'bg-orange-600/20 text-orange-500' : 'text-zinc-500 hover:text-white'}`}><FiHome size={24} /></button>
          <button onClick={() => setActiveTab('lab')} className={`p-3 rounded-2xl transition-colors ${activeTab === 'lab' ? 'bg-orange-600/20 text-orange-500' : 'text-zinc-500 hover:text-white'}`}><FaDumbbell size={24} /></button>
          <button onClick={() => setActiveTab('courses')} className={`p-3 rounded-2xl transition-colors ${activeTab === 'courses' ? 'bg-orange-600/20 text-orange-500' : 'text-zinc-500 hover:text-white'}`}><FiCalendar size={24} /></button>
          <button onClick={() => setActiveTab('diet')} className={`p-3 rounded-2xl transition-colors ${activeTab === 'diet' ? 'bg-orange-600/20 text-orange-500' : 'text-zinc-500 hover:text-white'}`}><FaAppleAlt size={24} /></button>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-white/10" } }} />
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto hide-scrollbar">
        <div className="max-w-6xl mx-auto">
          
          {/* TOP HEADER */}
          <header className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
  <div className="flex items-center gap-4">
    {/* LOGO LINK TO HOME */}
    <button 
      onClick={() => navigate('/')} 
      className="text-2xl font-black italic text-white hover:text-orange-500 transition-colors"
    >
      TFC
    </button>
    <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
    <div className="hidden md:block">
      <span className="text-orange-500 font-black tracking-[0.4em] uppercase text-[10px]">Athlete Portal</span>
      <h1 className="text-xl font-black italic uppercase text-white leading-none">Command Station</h1>
    </div>
  </div>
  
  <div className="flex items-center gap-4">
    <button onClick={() => navigate('/')} className="hidden md:block text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
      Back to Website
    </button>
    <UserButton afterSignOutUrl="/" />
  </div>
</header>

          <AnimatePresence mode="wait">
            
            {/* =========================================
                TAB 1: MAIN TRACKER DASHBOARD 
            ============================================= */}
            {activeTab === 'dashboard' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {/* TOP GRID: CHARTS & CALENDAR */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                  {/* Physical Activity Charts */}
                  <div className="xl:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-lg font-bold text-white">Live Activity Tracker</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Steps Chart */}
                      <div>
                        <div className="h-20 w-full mb-4 relative">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <path d={generatePath(appData.weeklyHistory.steps, 100, 40)} fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="100" cy={40 - ((appData.dailyStats.steps - Math.min(...appData.weeklyHistory.steps)*0.9) / ((Math.max(...appData.weeklyHistory.steps)*1.1) - Math.min(...appData.weeklyHistory.steps)*0.9)) * 40} r="3" fill="#ea580c" />
                          </svg>
                        </div>
                        <p className="text-zinc-500 text-xs font-bold mb-1">Steps</p>
                        <h3 className="text-3xl font-black text-white">{appData.dailyStats.steps.toLocaleString()}</h3>
                      </div>

                      {/* Calories Chart */}
                      <div>
                        <div className="h-20 w-full mb-4">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <path d={generatePath(appData.weeklyHistory.calories, 100, 40)} fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-zinc-500 text-xs font-bold mb-1">Calories burned</p>
                        <motion.h3 key={appData.dailyStats.calories} initial={{ scale: 1.2, color: '#eab308' }} animate={{ scale: 1, color: '#fff' }} className="text-3xl font-black text-white">
                          {appData.dailyStats.calories}
                        </motion.h3>
                      </div>

                      {/* Activity Time Chart */}
                      <div>
                        <div className="h-20 w-full mb-4">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <path d={generatePath(appData.weeklyHistory.activeTime, 100, 40)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-zinc-500 text-xs font-bold mb-1">Activity time</p>
                        <motion.h3 key={appData.dailyStats.activeTime} initial={{ scale: 1.2, color: '#3b82f6' }} animate={{ scale: 1, color: '#fff' }} className="text-3xl font-black text-white">
                          {formatTime(appData.dailyStats.activeTime)}
                        </motion.h3>
                      </div>
                    </div>
                  </div>

                  {/* Active Days Calendar */}
                  <div className="xl:col-span-1 bg-blue-600 rounded-[2rem] p-8 text-white relative shadow-[0_10px_40px_rgba(37,99,235,0.3)]">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold">Your Active Days</h2>
                      <span className="text-sm font-medium opacity-80 cursor-pointer">November v</span>
                    </div>
                    <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-xs font-bold opacity-70 mb-4">
                      {['M','T','W','T','F','S','S'].map((d,i) => <div key={i}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm font-medium">
                      {[...Array(31)].map((_, i) => {
                        const day = i + 1;
                        const isActive = day === selectedDay;
                        const isLogged = [5,7,8,12,13,14,19,20,21,24,26].includes(day);
                        return (
                          <button key={day} onClick={() => setSelectedDay(day)} className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all ${isActive ? 'bg-orange-400 text-black font-black' : isLogged ? 'bg-black/40 text-white hover:bg-black/60' : 'text-white/50 hover:text-white'}`}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* BOTTOM GRID: SLEEP, WEIGHT & ACTIVITIES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column (Sleep & Weight) */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">Sleep Time</h3>
                        <p className="text-xs text-zinc-500 font-medium mb-4">Goal: 8 hours</p>
                      </div>
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="40" cy="40" r="36" fill="transparent" stroke="#333" strokeWidth="8" />
                          <circle cx="40" cy="40" r="36" fill="transparent" stroke="#ea580c" strokeWidth="8" strokeDasharray="226" strokeDashoffset={226 - (226 * (appData.dailyStats.sleep / 8))} strokeLinecap="round" className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-black text-white">{appData.dailyStats.sleep}h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (My Activities Log) */}
                  <div className="md:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-white">Daily Activities</h2>
                      <div className="bg-black/50 p-1 rounded-full flex gap-1">
                        {['All', 'Alone', 'With Coach'].map(filter => (
                          <button key={filter} onClick={() => setActivityFilter(filter)} className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${activityFilter === filter ? 'bg-orange-500 text-white' : 'text-zinc-500 hover:text-white'}`}>{filter}</button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-auto">
                      <AnimatePresence>
                        {filteredActivities.map((act) => (
                          <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} key={act.id} className={`w-36 h-36 rounded-3xl p-4 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform ${act.color}`}>
                            <div className="flex justify-between items-start text-white">
                              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm"><FaRunning /></div>
                              <span className="text-xs font-bold bg-black/20 px-2 py-1 rounded-full">{act.cals} cal</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm truncate">{act.title}</h4>
                              <p className="text-xs text-white/70 font-medium">{act.duration} mins • {act.time}</p>
                            </div>
                          </motion.div>
                        ))}
                        
                      </AnimatePresence>

                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsAddModalOpen(true)} className="w-36 h-36 rounded-3xl border-2 border-dashed border-white/20 hover:border-orange-500 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors">
                        <FiPlus size={24} />
                        <span className="text-xs font-bold">Log Activity</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================
                TAB 2: THE LAB (WORKOUT LOGGER)
            ============================================= */}
            {activeTab === 'lab' && (
              <motion.div key="lab" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-[#1a1a1a] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                  <motion.div className="h-full bg-orange-500" initial={{ width: 0 }} animate={{ width: `${workoutProgress}%` }} transition={{ duration: 0.5 }} />
                </div>
                <div className="flex justify-between items-end mb-6 mt-2">
                  <div>
                    <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Today's Protocol</h3>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">LOWER BODY <span className="text-orange-600">POWER</span></h2>
                  </div>
                  <span className="text-orange-500 font-black italic text-sm">{Math.round(workoutProgress)}%</span>
                </div>

                <div className="space-y-3">
                {appData.todaysWorkout.map((ex) => (
  <div key={ex.id} className="group flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
    <div className="flex items-center gap-4" onClick={() => toggleExercise(ex.id)}>
      <button className={`text-xl ${ex.completed ? 'text-orange-500' : 'text-zinc-600'}`}>
        {ex.completed ? <FaCheckCircle /> : <FaRegCircle />}
      </button>
      <div>
        <h4 className="font-bold text-white text-sm">{ex.name}</h4>
        <p className="text-xs text-zinc-500">{ex.sets} • {ex.reps}</p>
      </div>
    </div>
    
    {/* NEW: VIEW FORM BUTTON */}
    <button 
      onClick={() => setSelectedExerciseVideo(ex.name)} // Trigger a video modal
      className="p-2 bg-white/5 rounded-lg text-zinc-500 hover:text-orange-500 transition-colors"
    >
      <FaPlayCircle size={18} />
    </button>
  </div>
))}
                </div>

                {appData.labCompleted && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                    <p className="text-green-400 font-black italic uppercase tracking-widest flex items-center justify-center gap-2">
                      <FaTrophy /> Session Complete! (+300 Cal added to tracker)
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
{activeTab === 'diet' && (
  <motion.div key="diet" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <DietSection />
  </motion.div>
)}
          </AnimatePresence>
        </div>
      </div>

      {/* === ADD ACTIVITY MODAL === */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-md relative">
              <h2 className="text-xl font-bold text-white mb-6">Log New Activity</h2>
              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Activity Name</label>
                  <input required type="text" value={newActivity.title} onChange={e => setNewActivity({...newActivity, title: e.target.value})} placeholder="e.g. Cycling, Yoga" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Duration (Mins)</label>
                    <input required type="number" value={newActivity.duration} onChange={e => setNewActivity({...newActivity, duration: e.target.value})} placeholder="45" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Calories Burned</label>
                    <input required type="number" value={newActivity.cals} onChange={e => setNewActivity({...newActivity, cals: e.target.value})} placeholder="300" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</label>
                  <select value={newActivity.type} onChange={e => setNewActivity({...newActivity, type: e.target.value})} className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-orange-500">
                    <option>Alone</option>
                    <option>With Coach</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:bg-orange-700">Save Activity</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MobileBottomNav />
    </div>
  );
}   