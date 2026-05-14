import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp, FiAlertCircle, FiDollarSign, FiCalendar } from "react-icons/fi";
import { supabase } from "../../supabaseClient";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/5 p-6 rounded-[2rem] shadow-sm dark:shadow-2xl"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {trend && <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">+{trend}% This Month</span>}
    </div>
    <div className="mt-5">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">{title}</p>
      <h3 className="text-3xl font-black italic uppercase text-zinc-900 dark:text-white mt-1">{value}</h3>
    </div>
  </motion.div>
);

export default function AdminOverview() {
  const [stats, setStats] = useState({ total: 0, active: 0, expiring: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const { data } = await supabase.from('members').select('*');
      if (data) {
        const today = new Date();
        const active = data.filter(m => new Date(m.expiry) > today).length;
        const expiring = data.filter(m => {
          const diff = (new Date(m.expiry) - today) / (1000 * 60 * 60 * 24);
          return diff > 0 && diff <= 7;
        }).length;
        const revenue = data.reduce((acc, m) => acc + (m.price || 0), 0);

        setStats({ total: data.length, active, expiring, revenue });
      }
      setLoading(false);
    };
    getStats();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1,2,3,4].map(i => <div key={i} className="h-40 bg-zinc-200 dark:bg-zinc-900 rounded-[2rem]" />)}
    </div>
  </div>;

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black italic uppercase text-zinc-900 dark:text-white tracking-tighter">Command <span className="text-red-600">Center</span></h2>
        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mt-1">Real-time Performance Metrics</p>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Athletes" value={stats.total} icon={FiUsers} color="bg-blue-500" trend="12" />
        <StatCard title="Active Members" value={stats.active} icon={FiTrendingUp} color="bg-green-500" trend="8" />
        <StatCard title="Expiring Soon" value={stats.expiring} icon={FiAlertCircle} color="bg-yellow-500" />
        <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString('en-IN')}`} icon={FiDollarSign} color="bg-red-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT ACTIVITY PLACEHOLDER */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/5 p-8 rounded-[2.5rem]">
          <h4 className="text-sm font-black uppercase italic mb-6 flex items-center gap-2">
            <FiCalendar className="text-red-600" /> Admission Growth
          </h4>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className="bg-zinc-100 dark:bg-zinc-800 group-hover:bg-red-600 rounded-t-xl transition-all" />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Day {i+1}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-6 text-center">New Admissions (Last 7 Days)</p>
        </div>

        {/* QUICK ACTION BOX */}
        <div className="bg-red-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-red-900/20">
          <div>
            <h4 className="text-xl font-black italic uppercase leading-tight">Ready to expand <br/> the tribe?</h4>
            <p className="text-xs font-medium opacity-80 mt-2 tracking-wide">Add a new athlete to the TFC roster today.</p>
          </div>
          <button className="bg-white text-red-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform">
            Quick Registration
          </button>
        </div>
      </div>
    </div>
  );
}