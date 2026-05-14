import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTrash, FaEdit, FaSpinner, FaUsers, FaHistory, FaDumbbell, FaRegCalendarAlt } from "react-icons/fa";
import { supabase } from "../../supabaseClient";

// Helpers
const daysLeft = (ex) => Math.max(0, Math.ceil((new Date(ex) - new Date()) / 86400000));

function StatusBadge({ expiry }) {
  if (!expiry) return <span className="text-zinc-500">No Expiry</span>;
  
  const d = daysLeft(expiry);
  let status = "Active";
  let classes = "bg-green-600/10 text-green-600 dark:text-green-400 border-green-500/20";

  if (d <= 0) {
    status = "Expired";
    classes = "bg-red-600/10 text-red-600 dark:text-red-400 border-red-500/20";
  } else if (d <= 7) {
    status = "Expiring Soon";
    classes = "bg-yellow-600/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
  }

  return (
    <span className={`text-[10px] sm:text-[11px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border ${classes}`}>
      {status}
    </span>
  );
}

export default function AthleteDatabase() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('joined', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching members:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return;
    try {
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (error) throw error;
      setMembers(members.filter(m => m.id !== id));
    } catch (error) {
      alert("Error deleting member: " + error.message);
    }
  };

  const handleQuickRenew = async (member) => {
    if (!window.confirm(`Renew ${member.name} for 30 Days?`)) return;
    try {
      const baseDate = new Date(member.expiry) > new Date() ? new Date(member.expiry) : new Date();
      baseDate.setDate(baseDate.getDate() + 30);
      const newExpiry = baseDate.toISOString().split("T")[0];

      const { error } = await supabase.from('members').update({ expiry: newExpiry }).eq('id', member.id);
      if (error) throw error;
      setMembers(members.map(m => m.id === member.id ? { ...m, expiry: newExpiry } : m));
    } catch (error) {
      alert("Error renewing: " + error.message);
    }
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || (m.phone && m.phone.includes(search));
    const d = daysLeft(m.expiry);
    if (filter === "Active") return matchesSearch && d > 7;
    if (filter === "Expiring") return matchesSearch && d > 0 && d <= 7;
    if (filter === "Expired") return matchesSearch && d <= 0;
    return matchesSearch; 
  });

  return (
    <div className="max-w-[90rem] mx-auto w-full pb-10">
      
      {/* ─── HEADER & CONTROLS ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-zinc-200 dark:border-white/5 pb-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-zinc-900 dark:text-white tracking-tighter">Athlete <span className="text-red-600">Database</span></h2>
          <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-zinc-500 mt-1">Total: {members.length} Registered Records</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600" size={14}/>
            <input 
              type="text" 
              placeholder="Search name or phone..." 
              value={search} 
              onChange={e=>setSearch(e.target.value)}
              className="w-full bg-white dark:bg-[#161616] border border-zinc-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all shadow-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex bg-white dark:bg-[#161616] border border-zinc-200 dark:border-white/10 rounded-2xl p-1.5 overflow-x-auto hide-scrollbar w-full sm:w-auto shadow-sm">
            {["All", "Active", "Expiring", "Expired"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  filter === f ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-white"
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── LOADING STATE ─── */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32 text-zinc-400 dark:text-zinc-600">
          <FaSpinner className="animate-spin mb-6 text-red-500" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest">Syncing with Cloud Database...</p>
        </div>
      )}

      {/* ─── EMPTY STATE ─── */}
      {!isLoading && filteredMembers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/5 rounded-3xl mt-4">
          <FaUsers size={48} className="text-zinc-200 dark:text-zinc-800 mb-6" />
          <p className="text-base font-bold text-zinc-900 dark:text-white mb-2">No athletes found</p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest max-w-sm px-4">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* ─── ATHLETE LIST ─── */}
      {!isLoading && filteredMembers.length > 0 && (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMembers.map((m, i) => (
              <motion.div 
                key={m.id} 
                layout 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-5 md:items-center bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/5 rounded-[1.5rem] p-6 sm:p-7 group transition-all hover:shadow-xl hover:border-red-500/20 dark:hover:border-white/10 border-l-4 border-l-transparent hover:border-l-red-500"
              >
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 items-center flex-1">
                  {/* Identity */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-black text-lg flex-shrink-0 group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-zinc-900 dark:text-white text-base leading-tight truncate">{m.name}</p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold tracking-widest mt-1 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{m.phone}</p>
                    </div>
                  </div>

                  {/* Plan */}
                  <div className="flex items-center gap-3">
                    <FaDumbbell className="text-zinc-300 dark:text-zinc-600 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{m.plan}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Plan Details</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-3">
                    <FaRegCalendarAlt className="text-zinc-300 dark:text-zinc-600 flex-shrink-0" size={16} />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="text-zinc-400 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest">Joined:</span> 
                        {m.joined}
                      </span>
                      <span className={`text-xs flex items-center gap-2 ${daysLeft(m.expiry) <= 7 ? 'text-red-500 font-bold' : 'text-zinc-500'}`}>
                        <span className="text-zinc-400 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest">Expiry:</span> 
                        {m.expiry}
                      </span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right xl:text-center">
                    <StatusBadge expiry={m.expiry} />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-zinc-100 dark:border-white/5 md:pt-0 md:border-t-0 md:pl-6 md:border-l md:border-zinc-200 dark:md:border-white/5 flex items-center justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleQuickRenew(m)} className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300 hover:text-white hover:bg-red-600 transition-colors shadow-sm">
                    <FaHistory size={11} /> Renew
                  </button>
                  <button onClick={() => handleDelete(m.id, m.name)} className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-500 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center shadow-sm">
                    <FaTrash size={13} />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}   