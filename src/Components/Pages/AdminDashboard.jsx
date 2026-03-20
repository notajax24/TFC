import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUsers, 
  FaChartLine, 
  FaDumbbell, 
  FaPlus, 
  FaSearch, 
  FaTrash,
  FaExchangeAlt,
  FaTimes
} from "react-icons/fa";

// Default data for first load
const initialMembers = [
  { id: 1, name: "Rahul Sharma", plan: "Yearly Pro Elite", price: 14999, joined: "Today", status: "Active" },
  { id: 2, plan: "3 Months Package", name: "Priya Patel", price: 5999, joined: "Yesterday", status: "Active" },
];

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  
  // === REAL-TIME STATE MANAGEMENT ===
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('tfc_members');
    return saved ? JSON.parse(saved) : initialMembers;
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", plan: "1 Month Package", price: 2499 });

  // Save to Local Storage whenever members change
  useEffect(() => {
    localStorage.setItem('tfc_members', JSON.stringify(members));
  }, [members]);

  // === DYNAMIC CALCULATIONS ===
  const activeCount = members.filter(m => m.status === "Active").length;
  const totalRevenue = members.filter(m => m.status === "Active").reduce((sum, m) => sum + m.price, 0);
  
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gymStats = [
    { label: "Active Members", value: activeCount, trend: "Live Data", icon: <FaUsers />, color: "text-orange-500" },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, trend: "Live Data", icon: <FaChartLine />, color: "text-green-400" },
    { label: "Active Programs", value: "8", trend: "System Default", icon: <FaDumbbell />, color: "text-white" },
  ];

  // === ACTIONS ===
  const handleAddMember = (e) => {
    e.preventDefault();
    const joinedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const memberToAdd = { 
      ...newMember, 
      id: Date.now(), 
      joined: joinedDate, 
      status: "Active" 
    };
    setMembers([memberToAdd, ...members]);
    setIsModalOpen(false);
    setNewMember({ name: "", plan: "1 Month Package", price: 2499 });
  };

  const toggleStatus = (id) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, status: m.status === "Active" ? "Pending" : "Active" } : m
    ));
  };

  const deleteMember = (id) => {
    if(window.confirm("Are you sure you want to remove this athlete?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    let price = 2499;
    if(plan === "3 Months Package") price = 5999;
    if(plan === "6 Months Package") price = 9999;
    if(plan === "Yearly Pro Elite") price = 14999;
    setNewMember({ ...newMember, plan, price });
  };

  if (!isLoaded) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-black animate-pulse">Accessing Command Center...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10 font-montserrat relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-red-500/20">
          <div>
            <span className="text-red-500 font-black tracking-[0.4em] uppercase text-[10px]">Authorized Personnel Only</span>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">COMMAND <span className="text-red-600">CENTER</span></h1>
          </div>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-12 h-12 border-2 border-red-600" } }} />
        </header>

        {/* DYNAMIC STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {gymStats.map((stat, idx) => (
            <div key={idx} className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>{stat.icon}</div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.trend}</span>
              </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">{stat.value}</h3>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* MAIN AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Member Directory */}
          <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Member Directory</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Manage active athletes</p>
              </div>
              <div className="relative w-full sm:w-auto">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search athletes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 bg-black/50 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-black uppercase tracking-widest text-zinc-500">
                    <th className="pb-4 pl-2">Athlete Name</th>
                    <th className="pb-4">Active Plan</th>
                    <th className="pb-4 text-center">Status</th>
                    <th className="pb-4 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8 text-zinc-500">No athletes found.</td></tr>
                  ) : filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 pl-2 font-bold text-white text-sm">{member.name}</td>
                      <td className="py-4 text-sm text-zinc-400 font-medium">{member.plan}</td>
                      <td className="py-4 text-center">
                        <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border ${
                          member.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <button onClick={() => toggleStatus(member.id)} className="p-2 text-zinc-500 hover:text-orange-500 transition-colors" title="Toggle Status">
                          <FaExchangeAlt />
                        </button>
                        <button onClick={() => deleteMember(member.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors" title="Remove Member">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-3xl flex items-center justify-between group shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1"
            >
              <div className="text-left">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white group-hover:scale-105 transition-transform origin-left">Add Athlete</h3>
                <p className="text-xs font-medium text-white/70 mt-1">Register new member</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:rotate-90 transition-transform duration-300">
                <FaPlus className="text-white text-xl" />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* === ADD MEMBER MODAL === */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-white/10 rounded-3xl p-8 w-full max-w-md relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
                <FaTimes size={20} />
              </button>
              
              <h2 className="text-2xl font-black italic uppercase text-white mb-6">Register <span className="text-red-600">Athlete</span></h2>
              
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                  <input 
                    required type="text" 
                    value={newMember.name} 
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500" 
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Membership Plan</label>
                  <select 
                    value={newMember.plan} 
                    onChange={handlePlanChange}
                    className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                  >
                    <option>1 Month Package</option>
                    <option>3 Months Package</option>
                    <option>6 Months Package</option>
                    <option>Yearly Pro Elite</option>
                  </select>
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-red-600 text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors">
                  Confirm Registration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}