import { useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FiUserPlus, FiUsers, FiDollarSign, FiCheckSquare, FiSettings, FiActivity } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../common/ThemeToggle";
import AdminOverview from "./AdminOverview";
// IMPORT YOUR COMPONENTS
import NewAdmission from "./NewAdmission";
import AthleteDatabase from "./AthleteDatabase"; 

export default function AdminDashboard() {
  const { isLoaded } = useUser();
  const navigate = useNavigate();

  // State to manage the active tab. Default is 'overview'
  const [activeTab, setActiveTab] = useState("overview");

  if (!isLoaded) return <div className="min-h-screen bg-[#050505]" />;

  const TABS = [
    { id: "overview", label: "Overview", icon: <FiActivity size={18} /> },
    { id: "admission", label: "New Admission", icon: <FiUserPlus size={18} /> },
    { id: "database", label: "Athlete Database", icon: <FiUsers size={18} /> },
    { id: "finance", label: "Finances", icon: <FiDollarSign size={18} /> },
    { id: "attendance", label: "Attendance", icon: <FiCheckSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white font-montserrat flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
    
    {/* Background Glow - only visible in dark mode */}
    <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-red-700/5 rounded-full blur-[180px] pointer-events-none z-0 dark:block hidden"/>

    {/* ─── ADMIN SIDEBAR ─── */}
    <nav className="w-full md:w-72 bg-white dark:bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/5 flex flex-col z-20 h-auto md:h-screen transition-colors duration-300">
      
      <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between md:justify-start gap-4">
        {/* ... TFC Logo Section ... */}
        <div className="flex items-center gap-3">
           <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none text-red-600">TFC</h2>
           {/* MOBILE THEME TOGGLE */}
           <div className="md:hidden">
             <ThemeToggle />
           </div>
        </div>
      </div>

        <div className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto md:overflow-visible hide-scrollbar flex-1">
          {TABS.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-red-600/10 text-red-500 border border-red-500/20" 
                  : "text-zinc-500 border border-transparent hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex p-6 border-t border-white/5 items-center gap-4 mt-auto">
          <UserButton afterSignOutUrl="/" appearance={{elements:{avatarBox:"w-10 h-10 border-2 border-red-600/60"}}}/>
          <div>
            <p className="text-xs font-bold text-white">System Admin</p>
            <p className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Online</p>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 relative z-10 h-[calc(100vh-80px)] md:h-screen overflow-y-auto w-full max-w-[100vw]">
      <div className="p-4 md:p-8 w-full text-zinc-900 dark:text-white">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-8 w-full"
          >
            {/* 1. REGISTRATION TAB */}
            {activeTab === "admission" && <NewAdmission onBack={() => setActiveTab("overview")} />}
            
            {/* 2. DATABASE TAB */}
            {activeTab === "database" && <AthleteDatabase />}

            {/* 3. OVERVIEW DEMO */}
            {activeTab === "overview" && <AdminOverview />}

            {/* 4. FINANCE DEMO */}
            {activeTab === "finance" && (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <FiDollarSign size={48} className="text-zinc-800 mb-4" />
                <h2 className="text-2xl font-black text-zinc-500 italic uppercase">Finance Module</h2>
                <p className="text-zinc-600 text-sm mt-2">Coming soon...</p>
              </div>
            )}

            {/* 5. ATTENDANCE DEMO */}
            {activeTab === "attendance" && (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                <FiCheckSquare size={48} className="text-zinc-800 mb-4" />
                <h2 className="text-2xl font-black text-zinc-500 italic uppercase">Live Attendance</h2>
                <p className="text-zinc-600 text-sm mt-2">Coming soon...</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
        </div>
      </main>
    </div>
  );
}