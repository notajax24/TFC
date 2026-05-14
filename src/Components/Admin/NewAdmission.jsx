import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaCamera, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { UserButton } from "@clerk/clerk-react";
import { supabase } from "../../supabaseClient";

const todayStr = () => new Date().toISOString().split("T")[0];

const PLANS = [
  { name: "1 Day Trial", price: 0, days: 1 },
  { name: "1 Month", price: 2499, days: 30 },
  { name: "3 Months", price: 5999, days: 90 },
  { name: "6 Months", price: 9999, days: 180 },
  { name: "Yearly Pro Elite", price: 14999, days: 365 },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

export default function NewAdmission({ onBack }) {
  const initialForm = {
    name: "", phone: "", birthday: "", bloodGroup: "Unknown",
    healthCondition: "", plan: "1 Month", admissionDate: todayStr(),
    paymentMethod: "Cash", screenshot: null,
  };

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedPlan = PLANS.find(p => p.name === formData.plan);
      const expiry = new Date(formData.admissionDate);
      expiry.setDate(expiry.getDate() + selectedPlan.days);

      const newMember = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        birthday: formData.birthday,
        blood_group: formData.bloodGroup,
        health_condition: formData.healthCondition,
        plan: formData.plan,
        price: selectedPlan.price,
        joined: formData.admissionDate,
        expiry: expiry.toISOString().split("T")[0],
        payment_method: formData.paymentMethod,
        has_screenshot: !!formData.screenshot,
        status: "Active"
      };

      const { error } = await supabase.from('members').insert([newMember]);
      if (error) throw error;

      setSuccessMsg(`${formData.name} successfully registered!`);
      setFormData(initialForm);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (error) {
      alert("Error saving member: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ADAPTIVE UI CLASSES
  const inputCls = "w-full bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all";
  const labelCls = "block text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 ml-1";
  const sectionTitleCls = "text-sm font-black italic uppercase text-zinc-800 dark:text-white mb-6 flex items-center gap-3";

  return (
    <div className="max-w-4xl mx-auto w-full pb-10">
      
      {/* ─── HEADER ─── */}
      <header className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200 dark:border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-red-600 dark:hover:text-white transition-all group shadow-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-0.5 transition-transform"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <p className="text-red-600 font-black tracking-[0.4em] uppercase text-[8px] mb-1">TFC Management</p>
            <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none text-zinc-900 dark:text-white">New Admission</h1>
          </div>
        </div>
        <UserButton afterSignOutUrl="/" appearance={{elements:{avatarBox:"w-9 h-9 border-2 border-red-600/60"}}}/>
      </header>

      {/* ─── SUCCESS NOTIFICATION ─── */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} 
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400">
            <FaCheckCircle size={18} />
            <p className="font-bold text-sm tracking-wide">{successMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FORM ─── */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#111] border border-zinc-200 dark:border-white/5 rounded-[2rem] p-5 sm:p-8 md:p-10 space-y-10 shadow-xl dark:shadow-2xl transition-colors duration-300">
        
        {/* SECTION 1: Personal Details */}
        <div>
          <h3 className={sectionTitleCls}>
            <span className="text-red-600">1.</span> Personal Details
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent ml-2"></div>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="e.g. Ajay Jachak" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input required type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder="e.g. 9876543210" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Birthday *</label>
              <input required type="date" value={formData.birthday} onChange={e=>setFormData({...formData, birthday: e.target.value})} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Blood Group (Optional)</label>
              <select value={formData.bloodGroup} onChange={e=>setFormData({...formData, bloodGroup: e.target.value})} className={inputCls}>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Health Conditions / Past Injuries (Optional)</label>
              <input type="text" value={formData.healthCondition} onChange={e=>setFormData({...formData, healthCondition: e.target.value})} placeholder="e.g. Lower back pain, Asthma, None" className={inputCls} />
            </div>
          </div>
        </div>

        {/* SECTION 2: Gym Plan */}
        <div>
          <h3 className={sectionTitleCls}>
            <span className="text-red-600">2.</span> Gym Plan
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent ml-2"></div>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className={labelCls}>Select Plan *</label>
              <select value={formData.plan} onChange={e=>setFormData({...formData, plan: e.target.value})} className={inputCls}>
                {PLANS.map(p => <option key={p.name} value={p.name}>{p.name} — ₹{p.price}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Admission Date</label>
              <input type="date" value={formData.admissionDate} onChange={e=>setFormData({...formData, admissionDate: e.target.value})} className={inputCls} />
            </div>
          </div>
        </div>

        {/* SECTION 3: Payment */}
        {formData.plan !== "1 Day Trial" && (
          <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
            <h3 className={sectionTitleCls}>
              <span className="text-red-600">3.</span> Payment
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-white/10 to-transparent ml-2"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Premium Segmented Toggle */}
              <div>
                <label className={labelCls}>Payment Method *</label>
                <div className="flex bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl p-1.5">
                  {["Cash", "Online / UPI"].map(method => (
                    <button type="button" key={method} onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                        formData.paymentMethod === method 
                        ? "bg-red-600 text-white shadow-md" 
                        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                      }`}>
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {formData.paymentMethod === "Online / UPI" && (
                <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}}>
                  <label className={labelCls}>Upload Screenshot</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="screenshot-upload" />
                  <label htmlFor="screenshot-upload" className={`flex items-center justify-center gap-2 w-full border border-dashed rounded-xl py-3.5 cursor-pointer text-xs font-black uppercase tracking-widest transition-colors ${
                    formData.screenshot 
                    ? 'border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400' 
                    : 'border-zinc-300 dark:border-white/20 bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-400 hover:border-red-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}>
                    {formData.screenshot ? <><FaCheckCircle size={14} /> Uploaded</> : <><FaCamera size={14} /> Attach File</>}
                  </label>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button type="submit" disabled={isSubmitting} 
            className="w-full py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-black italic uppercase tracking-widest rounded-xl hover:from-red-500 hover:to-red-600 transition-all shadow-lg dark:shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] flex justify-center items-center gap-3 disabled:opacity-50 disabled:shadow-none">
            {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaUserPlus size={16} />}
            {isSubmitting ? "Processing..." : `Register Athlete — ₹${PLANS.find(p=>p.name===formData.plan)?.price}`}
          </button>
        </div>
        
      </form>
    </div>
  );
}