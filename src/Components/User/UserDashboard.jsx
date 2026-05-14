import { useState, useEffect, useRef } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// FIXED: Added FiSettings here
import {
  FiHome, FiLogOut, FiTrendingUp, FiZap, FiTarget, FiAward, FiSettings
} from "react-icons/fi";

// FIXED: Removed the accidental FiHome from this list
import {
  FaDumbbell, FaAppleAlt, FaRunning, FaFire, FaBed, FaWeight,
  FaPlus, FaTimes, FaCheckCircle, FaRegCircle, FaTrophy, 
  FaMedal, FaChartBar, FaPlayCircle, FaHeart, FaBolt, FaCalendarAlt
} from "react-icons/fa";


// ── Default State — all empty, user fills everything ──────────────────────
const defaultData = {
  profile: { weight: "", height: "", age: "", goal: "Muscle Gain", name: "" },
  dailyStats: { steps: 0, caloriesBurned: 0, caloriesConsumed: 0, activeTime: 0, sleep: 0, water: 0 },
  weeklyHistory: {
    steps:      [0, 0, 0, 0, 0, 0, 0],
    calories:   [0, 0, 0, 0, 0, 0, 0],
    activeTime: [0, 0, 0, 0, 0, 0, 0],
  },
  activities: [],
  todaysWorkout: [],
  personalRecords: [],
  meals: [],
  streak: 0,
  labCompleted: false,
  membership: { plan: "—", expiry: "—", daysLeft: 0 },
};

// ── Helpers ────────────────────────────────────────────────────────────────
const formatTime = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

function SparkLine({ data, color, w = 120, h = 40 }) {
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.9;
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const lx = ((data.length - 1) / (data.length - 1)) * w;
  const ly = h - ((data.at(-1) - min) / range) * (h - 4);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="3.5" fill={color} />
    </svg>
  );
}

function Ring({ value, max, color, size = 64, strokeWidth = 7, label }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="relative flex flex-col items-center gap-1">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="transparent" stroke="#333" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="transparent" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-black text-white" style={{ color }}>
          {Math.round(pct * 100)}%
        </span>
      </div>
      {label && <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{label}</p>}
    </div>
  );
}

// ── AI Meal Plan (Claude-powered) ──────────────────────────────────────────
function AIMealPlan({ goal: defaultGoal, weight: defaultWeight }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    weight: defaultWeight || 75,
    height: 175,
    age: 25,
    gender: "Male",
    goal: defaultGoal || "Muscle Gain",
    activityLevel: "Moderately Active",
    dietType: "Non-Vegetarian",
    mealsPerDay: 4,
    allergies: "",
  });

  const GOALS = ["Muscle Gain", "Weight Loss", "Fat Loss", "Maintain Weight", "Strength", "Endurance", "Lean Bulk"];
  const ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Athlete"];
  const DIET_TYPES = ["Non-Vegetarian", "Vegetarian", "Vegan", "Keto", "High Protein"];

  const generate = async () => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    try {
      const prompt = `Create a ${form.mealsPerDay}-meal plan for:
- Weight: ${form.weight}kg, Height: ${form.height}cm, Age: ${form.age}, Gender: ${form.gender}
- Goal: ${form.goal}
- Activity Level: ${form.activityLevel}
- Diet Type: ${form.dietType}
${form.allergies ? `- Allergies/Avoid: ${form.allergies}` : ""}

Respond with ONLY a JSON object, no markdown, no explanation. Structure:
{
  "totalCalories": number,
  "totalProtein": number,
  "totalCarbs": number,
  "totalFat": number,
  "meals": [
    { "time": "7:00 AM", "name": "meal name", "type": "Breakfast", "items": ["item 1","item 2","item 3"], "calories": number, "protein": number }
  ],
  "tips": ["tip1", "tip2", "tip3"]
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
              thinkingConfig: { thinkingBudget: 0 },
            }
          })
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      if (!data.candidates?.[0]) throw new Error("No response from Gemini");
      const raw = data.candidates[0].content.parts[0].text;
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("Invalid JSON response");
      setPlan(JSON.parse(raw.slice(start, end + 1)));
    } catch (err) {
      console.error("Meal plan error:", err);
      setPlan({ error: true, message: err.message });
    }
    setLoading(false);
  };

  const Field = ({ label, children }) => (
    <div>
      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );

  const inputCls = "w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors";

  // ── FORM VIEW ──
  if (!plan && !loading) return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="Weight (kg)">
          <input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}
            className={inputCls} min={30} max={200} />
        </Field>
        <Field label="Height (cm)">
          <input type="number" value={form.height} onChange={e => setForm({ ...form, height: e.target.value })}
            className={inputCls} min={100} max={250} />
        </Field>
        <Field label="Age">
          <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
            className={inputCls} min={10} max={90} />
        </Field>
        <Field label="Gender">
          <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className={inputCls}>
            {["Male", "Female", "Other"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Primary Goal">
        <div className="flex flex-wrap gap-2 mt-1">
          {GOALS.map(g => (
            <button key={g} onClick={() => setForm({ ...form, goal: g })}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wide border transition-all ${
                form.goal === g
                  ? "bg-orange-600 border-orange-600 text-white"
                  : "border-white/10 text-zinc-500 hover:text-white hover:border-white/20"
              }`}>{g}</button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Activity Level">
          <select value={form.activityLevel} onChange={e => setForm({ ...form, activityLevel: e.target.value })} className={inputCls}>
            {ACTIVITY.map(a => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Diet Type">
          <select value={form.dietType} onChange={e => setForm({ ...form, dietType: e.target.value })} className={inputCls}>
            {DIET_TYPES.map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Meals Per Day">
          <div className="flex gap-2 mt-1">
            {[3, 4, 5, 6].map(n => (
              <button key={n} onClick={() => setForm({ ...form, mealsPerDay: n })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-black border transition-all ${
                  form.mealsPerDay === n
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-white/10 text-zinc-500 hover:text-white"
                }`}>{n}</button>
            ))}
          </div>
        </Field>
        <Field label="Allergies / Foods to Avoid">
          <input type="text" value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })}
            placeholder="e.g. peanuts, dairy, gluten" className={inputCls} />
        </Field>
      </div>

      {/* Summary pill */}
      <div className="flex flex-wrap gap-2 p-4 bg-zinc-900/60 rounded-2xl border border-white/5">
        {[
          { label: form.weight + "kg",          color: "#f97316" },
          { label: form.goal,                   color: "#3b82f6" },
          { label: form.activityLevel,           color: "#22c55e" },
          { label: form.dietType,               color: "#a855f7" },
          { label: form.mealsPerDay + " meals", color: "#eab308" },
        ].map(p => (
          <span key={p.label} className="text-[10px] font-black px-3 py-1 rounded-full"
            style={{ background: p.color + "18", color: p.color }}>{p.label}</span>
        ))}
      </div>

      <button onClick={generate}
        className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black italic uppercase tracking-widest rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2">
        <FiZap size={16} /> Generate My Personalized Plan
      </button>
    </motion.div>
  );

  // ── LOADING ──
  if (loading) return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map(i => (
          <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
        ))}
      </div>
      <p className="text-zinc-400 text-sm font-bold">Building your {form.goal} plan...</p>
      <p className="text-zinc-600 text-xs">{form.dietType} · {form.activityLevel} · {form.mealsPerDay} meals/day</p>
    </div>
  );

  // ── ERROR ──
  if (plan?.error) return (
    <div className="space-y-4 py-4">
      <p className="text-red-400 text-sm text-center">Failed to generate plan.</p>
      {plan.message && <p className="text-zinc-600 text-xs text-center">{plan.message}</p>}
      <button onClick={() => setPlan(null)}
        className="w-full py-3 bg-zinc-800 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors">
        ← Back to Form
      </button>
    </div>
  );

  // ── PLAN RESULT ──
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

      {/* Header recap */}
      <div className="flex items-center justify-between p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">Your Plan</p>
          <p className="text-white font-bold text-sm">{form.goal} · {form.dietType} · {form.activityLevel}</p>
        </div>
        <button onClick={() => setPlan(null)}
          className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-orange-500 transition-colors">
          ← Edit
        </button>
      </div>

      {/* Macro strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">        {[
          { label: "Calories", value: plan.totalCalories, unit: "kcal", color: "#f97316" },
          { label: "Protein",  value: plan.totalProtein,  unit: "g",    color: "#3b82f6" },
          { label: "Carbs",    value: plan.totalCarbs,    unit: "g",    color: "#22c55e" },
          { label: "Fat",      value: plan.totalFat,      unit: "g",    color: "#eab308" },
        ].map(m => (
          <div key={m.label} className="bg-black/40 rounded-2xl p-3 text-center">
            <p className="text-lg font-black" style={{ color: m.color }}>{m.value}</p>
            <p className="text-[8px] text-zinc-600 font-bold uppercase">{m.unit}</p>
            <p className="text-[9px] text-zinc-500 font-bold">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Meals */}
      {plan.meals?.map((meal, i) => (
        <div key={i} className="bg-black/30 border border-white/5 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">{meal.type} · {meal.time}</span>
              <h4 className="font-bold text-white leading-tight">{meal.name}</h4>
            </div>
            <div className="text-right flex-shrink-0 ml-3">
              <p className="text-sm font-black text-white">{meal.calories} kcal</p>
              <p className="text-[10px] text-zinc-500">{meal.protein}g protein</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {meal.items?.map((item, j) => (
              <span key={j} className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{item}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Tips */}
      {plan.tips?.length > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4 space-y-1.5">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2">Coach Tips</p>
          {plan.tips.map((tip, i) => (
            <p key={i} className="text-zinc-400 text-sm leading-relaxed">• {tip}</p>
          ))}
        </div>
      )}

      <button onClick={() => setPlan(null)}
        className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-orange-500 border border-white/5 rounded-xl transition-colors">
        ← Edit Preferences & Regenerate
      </button>
    </motion.div>
  );
}

// ── AI Coach Chat ──────────────────────────────────────────────────────────
function AICoachChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey athlete! I'm your TFC AI Coach. Ask me anything about training, nutrition, recovery, or form tips." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Gemini uses "contents" array with role "user" / "model"
    // Skip the first assistant greeting from history (Gemini doesn't accept assistant-first)
    const allMsgs = [...messages, userMsg];
    const geminiHistory = allMsgs
      .filter(m => !(m.role === "assistant" && allMsgs.indexOf(m) === 0)) // drop greeting from contents
      .map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      }));

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: "You are TFC AI Coach — a knowledgeable, motivating fitness coach for TFC Nashik gym. Keep responses concise (2-4 sentences). Be direct, practical, and encouraging. Focus on actionable advice." }]
            },
            contents: geminiHistory,
            generationConfig: { temperature: 0.8, maxOutputTokens: 400 }
          })
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const reply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Coach chat error:", err);
      setMessages(prev => [...prev, { role: "assistant", text: `Connection error: ${err.message}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1" style={{ scrollbarWidth: "none" }}>
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-orange-600 text-white"
                : "bg-zinc-800 text-zinc-200"
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 rounded-2xl px-4 py-3 flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask your coach anything..."
          className="flex-1 bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors" />
        <button type="submit" disabled={loading || !input.trim()}
          className="px-4 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 disabled:opacity-40 transition-colors">
          <FiZap size={16} />
        </button>
      </form>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function UserDashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [appData, setAppData] = useState(() => {
    const s = localStorage.getItem("tfc_user_data_v3");
    return s ? JSON.parse(s) : defaultData;
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activityFilter, setActivityFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: "", duration: "", cals: "", type: "Cardio" });
  const [activeDietTab, setActiveDietTab] = useState("log");

  // Profile setup modal
  const [showProfileSetup, setShowProfileSetup] = useState(() => {
    const s = localStorage.getItem("tfc_user_data_v3");
    if (!s) return true;
    const d = JSON.parse(s);
    return !d.profile.weight;
  });
  const [profileForm, setProfileForm] = useState({
    weight: "", height: "", age: "", goal: "Muscle Gain",
    membership: "", expiry: "",
  });

  // Daily stats modal
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [statsForm, setStatsForm] = useState({ steps: "", sleep: "" });

  // Workout modal
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [newExercise, setNewExercise] = useState({ name: "", sets: "", reps: "", weight: "" });

  // PR modal
  const [showPRModal, setShowPRModal] = useState(false);
  const [newPR, setNewPR] = useState({ exercise: "", weight: "" });

  // Meal log modal
  const [showMealModal, setShowMealModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", type: "Breakfast", cals: "", protein: "" });

  useEffect(() => {
    localStorage.setItem("tfc_user_data_v3", JSON.stringify(appData));
  }, [appData]);

  // Derived
  const workoutProgress = appData.todaysWorkout.length === 0 ? 0
    : appData.todaysWorkout.filter(e => e.completed).length / appData.todaysWorkout.length;
  const bmi = appData.profile.weight && appData.profile.height
    ? (appData.profile.weight / ((appData.profile.height / 100) ** 2)).toFixed(1)
    : "—";
  const calorieBalance = appData.dailyStats.caloriesConsumed - appData.dailyStats.caloriesBurned;
  const filteredActivities = appData.activities.filter(a =>
    activityFilter === "All" || a.type === activityFilter
  );

  const toggleExercise = (id) => {
    setAppData(prev => {
      const updated = prev.todaysWorkout.map(ex => ex.id === id ? { ...ex, completed: !ex.completed } : ex);
      const allDone = updated.every(e => e.completed);
      if (allDone && !prev.labCompleted) {
        const cals = prev.dailyStats.caloriesBurned + 280;
        const time = prev.dailyStats.activeTime + 50;
        const newCals = [...prev.weeklyHistory.calories]; newCals[6] = cals;
        const newTime = [...prev.weeklyHistory.activeTime]; newTime[6] = time;
        return { ...prev, todaysWorkout: updated, labCompleted: true, streak: prev.streak + 1,
          dailyStats: { ...prev.dailyStats, caloriesBurned: cals, activeTime: time },
          weeklyHistory: { ...prev.weeklyHistory, calories: newCals, activeTime: newTime } };
      }
      return { ...prev, todaysWorkout: updated };
    });
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    const dur = parseInt(newActivity.duration);
    const cals = parseInt(newActivity.cals);
    const colors = { Cardio: "#3b82f6", Weights: "#f97316", Yoga: "#a855f7", Sports: "#22c55e" };
    setAppData(prev => {
      const c = prev.dailyStats.caloriesBurned + cals;
      const t = prev.dailyStats.activeTime + dur;
      const nc = [...prev.weeklyHistory.calories]; nc[6] = c;
      const nt = [...prev.weeklyHistory.activeTime]; nt[6] = t;
      return { ...prev,
        activities: [...prev.activities, { id: Date.now(), ...newActivity, duration: dur, cals,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          color: colors[newActivity.type] || "#6b7280" }],
        dailyStats: { ...prev.dailyStats, caloriesBurned: c, activeTime: t },
        weeklyHistory: { ...prev.weeklyHistory, calories: nc, activeTime: nt } };
    });
    setNewActivity({ title: "", duration: "", cals: "", type: "Cardio" });
    setIsAddModalOpen(false);
  };

  const updateWater = (delta) => {
    setAppData(prev => ({ ...prev, dailyStats: { ...prev.dailyStats,
      water: Math.max(0, Math.min(15, prev.dailyStats.water + delta)) } }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const months = { "1 Month": 1, "3 Months": 3, "6 Months": 6, "Yearly Pro Elite": 12 };
    let expiry = profileForm.expiry;
    if (!expiry && profileForm.membership) {
      const d = new Date();
      d.setMonth(d.getMonth() + (months[profileForm.membership] || 1));
      expiry = d.toISOString().split("T")[0];
    }
    const today = new Date();
    const exp = new Date(expiry);
    const daysLeft = Math.max(0, Math.round((exp - today) / 86400000));
    setAppData(prev => ({
      ...prev,
      profile: { weight: parseFloat(profileForm.weight), height: parseFloat(profileForm.height),
        age: parseInt(profileForm.age), goal: profileForm.goal },
      membership: { plan: profileForm.membership || "—", expiry: expiry || "—", daysLeft },
    }));
    setShowProfileSetup(false);
  };

  const saveStats = (e) => {
    e.preventDefault();
    const steps = parseInt(statsForm.steps) || 0;
    const sleep = parseFloat(statsForm.sleep) || 0;
    setAppData(prev => {
      const newSteps = [...prev.weeklyHistory.steps]; newSteps[6] = steps;
      return { ...prev,
        dailyStats: { ...prev.dailyStats, steps, sleep },
        weeklyHistory: { ...prev.weeklyHistory, steps: newSteps },
      };
    });
    setShowStatsModal(false);
    setStatsForm({ steps: "", sleep: "" });
  };

  const addExercise = (e) => {
    e.preventDefault();
    setAppData(prev => ({
      ...prev,
      todaysWorkout: [...prev.todaysWorkout, {
        id: Date.now(),
        name: newExercise.name,
        sets: parseInt(newExercise.sets) || 3,
        reps: newExercise.reps,
        weight: newExercise.weight,
        completed: false,
      }],
      labCompleted: false,
    }));
    setNewExercise({ name: "", sets: "", reps: "", weight: "" });
    setShowWorkoutModal(false);
  };

  const deleteExercise = (id) => {
    setAppData(prev => ({ ...prev, todaysWorkout: prev.todaysWorkout.filter(e => e.id !== id) }));
  };

  const addPR = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    setAppData(prev => ({
      ...prev,
      personalRecords: [...prev.personalRecords, { ...newPR, date: today }],
    }));
    setNewPR({ exercise: "", weight: "" });
    setShowPRModal(false);
  };

  const deletePR = (i) => {
    setAppData(prev => ({ ...prev, personalRecords: prev.personalRecords.filter((_, idx) => idx !== i) }));
  };

  const addMeal = (e) => {
    e.preventDefault();
    const cals = parseInt(newMeal.cals) || 0;
    const protein = parseInt(newMeal.protein) || 0;
    setAppData(prev => ({
      ...prev,
      meals: [...prev.meals, { id: Date.now(), ...newMeal, cals, protein }],
      dailyStats: { ...prev.dailyStats, caloriesConsumed: prev.dailyStats.caloriesConsumed + cals },
    }));
    setNewMeal({ name: "", type: "Breakfast", cals: "", protein: "" });
    setShowMealModal(false);
  };

  const deleteMeal = (id) => {
    setAppData(prev => {
      const meal = prev.meals.find(m => m.id === id);
      return {
        ...prev,
        meals: prev.meals.filter(m => m.id !== id),
        dailyStats: { ...prev.dailyStats, caloriesConsumed: Math.max(0, prev.dailyStats.caloriesConsumed - (meal?.cals || 0)) },
      };
    });
  };

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center text-orange-500 font-black text-xl animate-pulse tracking-widest">
      LOADING ATHLETE PORTAL...
    </div>
  );

  const TABS = [
    { id: "dashboard",  icon: <FiHome size={18} />,     label: "Home" },
    { id: "lab",        icon: <FaDumbbell size={16} />,  label: "The Lab" },
    { id: "diet",       icon: <FaAppleAlt size={16} />,  label: "Diet" },
    { id: "stats",      icon: <FaChartBar size={16} />,  label: "Stats" },
    { id: "coach",      icon: <FiZap size={18} />,       label: "AI Coach" },
  ];

  return (
    <div className="min-h-screen bg-[#111] text-white font-montserrat">
      {/* Ambient bg */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-orange-700/5 rounded-full blur-[200px] pointer-events-none" />

     {/* === SIDEBAR (DESKTOP) === */}
     <nav className="hidden md:flex flex-col items-center py-8 px-4 bg-[#1a1a1a] border-r border-white/5 w-24 z-20 fixed top-0 left-0 h-screen">  <div className="text-2xl font-black italic text-white mb-12">TFC</div>
  <div className="flex flex-col gap-8 flex-grow">
    <button onClick={() => setActiveTab('dashboard')} className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl"><FiHome size={24} /></button>
    
    {/* ADMIN PANEL ACCESS BUTTON - ONLY FOR ADMINS */}
    {user?.publicMetadata?.role === "admin" && (
      <button 
        onClick={() => navigate('/admin')} 
        className="p-3 bg-red-600/10 text-red-500 rounded-2xl border border-red-500/20 hover:bg-red-600 hover:text-white transition-all group relative"
        title="Admin Command Center"
      >
        <FiSettings size={24} className="group-hover:rotate-90 transition-transform" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
      </button>
    )}

    <button onClick={() => setActiveTab('lab')} className="p-3 text-zinc-500 hover:text-white transition-colors"><FaDumbbell size={24} /></button>
    {/* ... other buttons ... */}
  </div>
</nav>

      {/* Main */}
      <div className="md:pl-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 pb-32 md:pb-10">

          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <p className="text-orange-500 font-black tracking-[0.4em] uppercase text-[9px]">Athlete Portal</p>
              <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                Welcome, {user?.firstName || "Athlete"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <FaFire className="text-orange-500" size={12} />
                <span className="text-orange-400 font-black text-[11px]">{appData.streak} day streak</span>
              </div>
              {/* Membership badge */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-full">
                <FaMedal className="text-yellow-500" size={12} />
                <span className="text-zinc-400 font-bold text-[11px]">{appData.membership.plan}</span>
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">

          {/* ========================================================
              DASHBOARD TAB
          ========================================================= */}
          {activeTab === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>

              {/* Daily stats strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Steps",       value: appData.dailyStats.steps ? appData.dailyStats.steps.toLocaleString() : "—", icon: <FaRunning />, color: "#f97316", spark: appData.weeklyHistory.steps },
                  { label: "Cal Burned",  value: appData.dailyStats.caloriesBurned || "—", icon: <FaFire />,   color: "#ef4444", spark: appData.weeklyHistory.calories },
                  { label: "Active Time", value: appData.dailyStats.activeTime ? formatTime(appData.dailyStats.activeTime) : "—", icon: <FaBolt />, color: "#3b82f6", spark: appData.weeklyHistory.activeTime },
                  { label: "Sleep",       value: appData.dailyStats.sleep ? `${appData.dailyStats.sleep}h` : "—", icon: <FaBed />, color: "#a855f7", spark: [0,0,0,0,0,0, appData.dailyStats.sleep] },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 relative group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm" style={{ color: stat.color }}>{stat.icon}</span>
                      {stat.spark.some(v => v > 0)
                        ? <SparkLine data={stat.spark.map(v => v || 0.1)} color={stat.color} w={70} h={28} />
                        : <span className="text-[9px] text-zinc-700 font-bold">No data</span>}
                    </div>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
                    {i === 0 && (
                      <button onClick={() => setShowStatsModal(true)}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-orange-500">
                        <FaPlus size={10} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
              {/* Log today's stats CTA */}
              {!appData.dailyStats.steps && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setShowStatsModal(true)}
                  className="w-full mb-6 py-3 border border-dashed border-zinc-700 hover:border-orange-500/40 rounded-2xl text-zinc-600 hover:text-orange-500 text-sm font-bold transition-colors flex items-center justify-center gap-2">
                  <FaPlus size={12} /> Log today's steps & sleep
                </motion.button>
              )}

              {/* Main grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Workout progress */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 md:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Today's Protocol</p>
                      <h3 className="text-lg font-black italic uppercase text-white">Workout Progress</h3>
                    </div>
                    <span className="text-2xl font-black text-orange-500">{Math.round(workoutProgress * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-6">
                    <motion.div animate={{ width: `${workoutProgress * 100}%` }}
                      className="h-full bg-orange-500 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Completed", value: appData.todaysWorkout.filter(e => e.completed).length },
                      { label: "Remaining", value: appData.todaysWorkout.filter(e => !e.completed).length },
                      { label: "Exercises",  value: appData.todaysWorkout.length },
                    ].map(s => (
                      <div key={s.label} className="bg-black/40 rounded-xl p-3 text-center">
                        <p className="text-xl font-black text-white">{s.value}</p>
                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("lab")}
                    className="w-full py-3 bg-orange-600/10 border border-orange-600/30 text-orange-500 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600/20 transition-colors">
                    Go to The Lab →
                  </button>
                </div>

                {/* Body metrics & water */}
                <div className="space-y-4">
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Body Metrics</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Ring value={appData.profile.weight} max={120} color="#f97316" label="Weight" size={60} strokeWidth={6} />
                      <Ring value={parseFloat(bmi)} max={35} color="#3b82f6" label="BMI" size={60} strokeWidth={6} />
                      <Ring value={appData.profile.age} max={60} color="#22c55e" label="Age" size={60} strokeWidth={6} />
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 text-center">
                      <div><p className="text-sm font-black text-white">{appData.profile.weight}kg</p></div>
                      <div><p className="text-sm font-black text-white">{bmi}</p></div>
                      <div><p className="text-sm font-black text-white">{appData.profile.age}y</p></div>
                    </div>
                  </div>

                  {/* Water tracker */}
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Hydration</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-blue-400">{appData.dailyStats.water}L</span>
                      <span className="text-zinc-600 text-xs">Goal: 3L</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${
                          i < appData.dailyStats.water * (10 / 3) ? "bg-blue-500" : "bg-zinc-800"
                        }`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateWater(-1)} className="flex-1 py-2 bg-zinc-800 rounded-xl text-sm font-black text-zinc-400 hover:text-white transition-colors">−</button>
                      <button onClick={() => updateWater(1)} className="flex-1 py-2 bg-blue-600/20 border border-blue-600/30 rounded-xl text-sm font-black text-blue-400 hover:bg-blue-600/30 transition-colors">+ 500ml</button>
                    </div>
                  </div>
                </div>

                {/* Activities log */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-5">
  <h3 className="text-lg font-black italic uppercase text-white">Daily Activities</h3>
  <div className="w-full md:w-auto overflow-x-auto hide-scrollbar pb-1">
    <div className="bg-black/50 p-1 rounded-full inline-flex gap-1 min-w-max">
                      <div className="bg-black/50 p-1 rounded-full flex gap-1">
                        {["All","Cardio","Weights","Yoga","Sports"].map(f => (
                          <button key={f} onClick={() => setActivityFilter(f)}
                            className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${
                              activityFilter === f ? "bg-orange-500 text-white" : "text-zinc-500 hover:text-white"
                            }`}>{f}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 md:gap-4">
                    <AnimatePresence>
                      {filteredActivities.map(act => (
                        <motion.div key={act.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="w-36 h-36 rounded-3xl p-4 flex flex-col justify-between cursor-pointer hover:scale-[1.03] transition-transform"
                          style={{ background: `${act.color}22`, borderColor: `${act.color}44`, border: "1px solid" }}>
                          <div className="flex justify-between items-start">
                            <div className="p-1.5 rounded-full" style={{ background: `${act.color}33` }}>
                              <FaRunning style={{ color: act.color }} size={14} />
                            </div>
                            <span className="text-[10px] font-black" style={{ color: act.color }}>{act.cals}cal</span>
                          </div>
                          <div>
                            <h4 className="font-black text-white text-sm leading-tight">{act.title}</h4>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{act.duration}m · {act.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setIsAddModalOpen(true)}
                      className="w-36 h-36 rounded-3xl border-2 border-dashed border-white/10 hover:border-orange-500/40 flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-orange-500 transition-colors">
                      <FaPlus size={20} />
                      <span className="text-[10px] font-bold">Log Activity</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              THE LAB TAB
          ========================================================= */}
          {activeTab === "lab" && (
            <motion.div key="lab" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Workout list */}
                <div className="md:col-span-2 bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                  {/* Progress bar top */}
                  <div className="absolute top-0 left-0 h-1 bg-zinc-800 w-full">
                    <motion.div className="h-full bg-orange-500" animate={{ width: `${workoutProgress * 100}%` }} />
                  </div>
                  <div className="flex justify-between items-end mb-6 mt-2">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Today's Protocol</p>
                      <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                        {appData.todaysWorkout.length > 0 ? "Workout Session" : "No Workout Yet"}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-orange-500 font-black text-lg">{Math.round(workoutProgress * 100)}%</span>
                      <button onClick={() => setShowWorkoutModal(true)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-orange-700 transition-colors">
                        <FaPlus size={10} /> Add
                      </button>
                    </div>
                  </div>

                  {appData.todaysWorkout.length === 0 ? (
                    <button onClick={() => setShowWorkoutModal(true)}
                      className="w-full py-12 border-2 border-dashed border-zinc-800 hover:border-orange-500/30 rounded-2xl flex flex-col items-center gap-3 text-zinc-700 hover:text-orange-500 transition-colors">
                      <FaDumbbell size={28} />
                      <p className="font-bold text-sm">Add your first exercise</p>
                      <p className="text-xs">Tap + Add to build today's workout</p>
                    </button>
                  ) : (
                  <div className="space-y-2">
                    {appData.todaysWorkout.map(ex => (
                      <motion.div key={ex.id} layout
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${
                          ex.completed
                            ? "bg-orange-500/10 border-orange-500/20"
                            : "bg-black/40 border-white/5 hover:border-white/10"
                        }`}>
                        <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleExercise(ex.id)}>
                          <span className={`text-xl ${ex.completed ? "text-orange-500" : "text-zinc-700"}`}>
                            {ex.completed ? <FaCheckCircle /> : <FaRegCircle />}
                          </span>
                          <div>
                            <h4 className={`font-bold text-sm ${ex.completed ? "text-zinc-400 line-through" : "text-white"}`}>{ex.name}</h4>
                            <p className="text-[10px] text-zinc-600">{ex.sets} sets · {ex.reps} reps{ex.weight ? ` · ${ex.weight}` : ""}</p>
                          </div>
                        </div>
                        <button onClick={() => deleteExercise(ex.id)} className="ml-3 text-zinc-700 hover:text-red-500 transition-colors">
                          <FaTimes size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  )}

                  {appData.labCompleted && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-center">
                      <p className="text-green-400 font-black italic uppercase tracking-widest flex items-center justify-center gap-2">
                        <FaTrophy /> Workout Complete! Streak: {appData.streak} days 🔥
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Personal Records */}
                <div className="space-y-4">
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">All Time</p>
                        <h3 className="text-lg font-black italic uppercase text-white">Personal Records</h3>
                      </div>
                      <button onClick={() => setShowPRModal(true)}
                        className="p-2 bg-zinc-800 rounded-xl text-zinc-400 hover:text-orange-500 transition-colors">
                        <FaPlus size={12} />
                      </button>
                    </div>
                    {appData.personalRecords.length === 0 ? (
                      <button onClick={() => setShowPRModal(true)}
                        className="w-full py-6 border border-dashed border-zinc-800 hover:border-orange-500/30 rounded-2xl text-zinc-700 hover:text-orange-500 text-xs font-bold transition-colors">
                        + Log your first PR
                      </button>
                    ) : (
                    <div className="space-y-2">
                      {appData.personalRecords.map((pr, i) => (
                        <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/5 group">
                          <div>
                            <p className="text-sm font-bold text-white">{pr.exercise}</p>
                            <p className="text-[10px] text-zinc-600">{pr.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaTrophy className="text-yellow-500" size={12} />
                            <span className="text-orange-400 font-black text-sm">{pr.weight}</span>
                            <button onClick={() => deletePR(i)}
                              className="text-zinc-800 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 ml-1">
                              <FaTimes size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>

                  {/* Membership card */}
                  <div className="bg-gradient-to-br from-orange-900/60 to-red-900/60 border border-orange-500/20 rounded-3xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-orange-300">TFC Membership</p>
                      <FaMedal className="text-yellow-400" size={18} />
                    </div>
                    <p className="text-lg font-black italic uppercase text-white">{appData.membership.plan}</p>
                    <p className="text-orange-300 text-xs mt-1">Expires {appData.membership.expiry}</p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-xs font-bold text-zinc-400">
                        <span>{appData.membership.daysLeft} days left</span>
                        <span>Active ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              DIET TAB
          ========================================================= */}
          {activeTab === "diet" && (
            <motion.div key="diet" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Sub-tabs */}
              <div className="flex gap-2 mb-6 bg-zinc-900/40 p-1.5 rounded-2xl border border-white/5 w-fit">
                {["log", "aiplan"].map(t => (
                  <button key={t} onClick={() => setActiveDietTab(t)}
                    className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeDietTab === t ? "bg-orange-600 text-white" : "text-zinc-500 hover:text-white"
                    }`}>
                    {t === "log" ? "Meal Log" : "AI Meal Plan"}
                  </button>
                ))}
              </div>

              {activeDietTab === "log" ? (
                <div className="space-y-4">
                  {/* Calorie summary */}
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    {[
                      { label: "Consumed",  value: appData.dailyStats.caloriesConsumed, color: "#f97316" },
                      { label: "Burned",    value: appData.dailyStats.caloriesBurned,   color: "#ef4444" },
                      { label: "Net",       value: calorieBalance, color: calorieBalance >= 0 ? "#22c55e" : "#ef4444" },
                    ].map(m => (
                      <div key={m.label} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black" style={{ color: m.color }}>{m.value || 0}</p>
                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider font-bold">{m.label} kcal</p>
                      </div>
                    ))}
                  </div>

                  {/* Add meal button */}
                  <button onClick={() => setShowMealModal(true)}
                    className="w-full py-3 border border-dashed border-zinc-700 hover:border-orange-500/40 rounded-2xl text-zinc-600 hover:text-orange-500 text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    <FaPlus size={12} /> Log a meal
                  </button>

                  {/* Meals */}
                  {appData.meals.length === 0 ? (
                    <div className="text-center py-10 text-zinc-700">
                      <FaAppleAlt size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="font-bold">No meals logged today</p>
                      <p className="text-xs mt-1">Tap "Log a meal" above to start tracking</p>
                    </div>
                  ) : appData.meals.map((meal) => (
                    <div key={meal.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center justify-between group">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">{meal.type}</span>
                        <p className="font-bold text-white">{meal.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-black text-white">{meal.cals} kcal</p>
                          <p className="text-[10px] text-zinc-500">{meal.protein}g protein</p>
                        </div>
                        <button onClick={() => deleteMeal(meal.id)}
                          className="text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <FaTimes size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 md:p-8">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Powered by Claude AI</p>
                    <h3 className="text-2xl font-black italic uppercase text-white">
                      Personalized <span className="text-orange-500">Nutrition</span>
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1">
                      Goal: {appData.profile.goal} · Weight: {appData.profile.weight}kg
                    </p>
                  </div>
                  <AIMealPlan goal={appData.profile.goal} weight={appData.profile.weight} />
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================
              STATS TAB
          ========================================================= */}
          {activeTab === "stats" && (
            <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weekly bars */}
                {[
                  { label: "Weekly Steps",       data: appData.weeklyHistory.steps,      color: "#f97316", unit: "steps" },
                  { label: "Calories Burned",    data: appData.weeklyHistory.calories,   color: "#ef4444", unit: "kcal" },
                  { label: "Active Time (mins)", data: appData.weeklyHistory.activeTime, color: "#3b82f6", unit: "mins" },
                ].map(chart => (
                  <div key={chart.label} className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">7-Day Trend</p>
                    <h3 className="text-lg font-black italic uppercase text-white mb-4">{chart.label}</h3>
                    <div className="flex items-end gap-2 h-24">
                      {chart.data.map((v, i) => {
                        const pct = v / Math.max(...chart.data);
                        return (
                          <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${pct * 100}%` }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            className="flex-1 rounded-t-sm"
                            style={{ background: chart.color, opacity: 0.5 + pct * 0.5 }} />
                        );
                      })}
                    </div>
                    <div className="flex mt-2">
                      {["M","T","W","T","F","S","S"].map((d, i) => (
                        <p key={i} className="flex-1 text-center text-[9px] text-zinc-700 font-bold">{d}</p>
                      ))}
                    </div>
                    <p className="mt-3 text-xl font-black text-white">
                      {chart.data.reduce((a, b) => a + b, 0).toLocaleString()} {chart.unit} total
                    </p>
                  </div>
                ))}

                {/* Streak & achievements */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Achievements</p>
                  <h3 className="text-lg font-black italic uppercase text-white mb-4">Milestones</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <FaFire />,    label: `${appData.streak} Day Streak`, color: "#f97316" },
                      { icon: <FaTrophy />,  label: "3 PRs Set",          color: "#eab308" },
                      { icon: <FaHeart />,   label: "12 Labs Done",       color: "#ef4444" },
                      { icon: <FaRunning />, label: "10k Steps × 5",      color: "#3b82f6" },
                    ].map((a, i) => (
                      <div key={i} className="p-3 rounded-2xl" style={{ background: `${a.color}15` }}>
                        <span style={{ color: a.color }}>{a.icon}</span>
                        <p className="text-xs font-bold text-white mt-2">{a.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              AI COACH TAB
          ========================================================= */}
          {activeTab === "coach" && (
            <motion.div key="coach" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center">
                      <FiZap className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-orange-500">Powered by Claude AI</p>
                      <h3 className="text-xl font-black italic uppercase text-white">TFC AI Coach</h3>
                    </div>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold">Online</span>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm">
                    Get real-time coaching advice, form tips, nutrition guidance, and workout programming.
                  </p>
                </div>
                <AICoachChat />
              </div>
            </motion.div>
          )}

          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#161616]/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 z-50 flex justify-between">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex flex-col items-center gap-1 ${activeTab === t.id ? "text-orange-500" : "text-zinc-600"}`}>
            {t.icon}
            <span className="text-[9px] font-bold uppercase tracking-tight">{t.label}</span>
          </button>
        ))}
        <button onClick={() => navigate("/")} className="flex flex-col items-center gap-1 text-zinc-600">
          <FiLogOut size={18} />
          <span className="text-[9px] font-bold uppercase tracking-tight">Exit</span>
        </button>
      </div>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black italic uppercase text-white">Log Activity</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-600 hover:text-white"><FaTimes /></button>
              </div>
              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Activity Name</label>
                  <input required type="text" value={newActivity.title}
                    onChange={e => setNewActivity({ ...newActivity, title: e.target.value })}
                    placeholder="e.g. Cycling, Yoga, HIIT"
                    className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</label>
                  <select value={newActivity.type} onChange={e => setNewActivity({ ...newActivity, type: e.target.value })}
                    className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500">
                    {["Cardio","Weights","Yoga","Sports","Other"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duration (mins)</label>
                    <input required type="number" value={newActivity.duration}
                      onChange={e => setNewActivity({ ...newActivity, duration: e.target.value })}
                      placeholder="45"
                      className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Calories</label>
                    <input required type="number" value={newActivity.cals}
                      onChange={e => setNewActivity({ ...newActivity, cals: e.target.value })}
                      placeholder="300"
                      className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors">Cancel</button>
                  <button type="submit"
                    className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-orange-700 transition-colors">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── PROFILE SETUP MODAL ── */}
      <AnimatePresence>
        {showProfileSetup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <p className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-1">Welcome to TFC</p>
              <h2 className="text-2xl font-black italic uppercase text-white mb-6">Set Up <span className="text-orange-500">Your Profile</span></h2>
              <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Weight (kg)", key: "weight", placeholder: "75" },
                    { label: "Height (cm)", key: "height", placeholder: "175" },
                    { label: "Age",         key: "age",    placeholder: "25" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{f.label}</label>
                      <input required type="number" placeholder={f.placeholder}
                        value={profileForm[f.key]} onChange={e => setProfileForm({ ...profileForm, [f.key]: e.target.value })}
                        className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Fitness Goal</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Muscle Gain","Weight Loss","Fat Loss","Strength","Endurance","Maintain"].map(g => (
                      <button key={g} type="button" onClick={() => setProfileForm({ ...profileForm, goal: g })}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide border transition-all ${
                          profileForm.goal === g ? "bg-orange-600 border-orange-600 text-white" : "border-white/10 text-zinc-500 hover:text-white"
                        }`}>{g}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Membership Plan</label>
                  <select value={profileForm.membership} onChange={e => setProfileForm({ ...profileForm, membership: e.target.value })}
                    className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 text-sm">
                    <option value="">— Select plan —</option>
                    {["1 Month","3 Months","6 Months","Yearly Pro Elite"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <button type="submit"
                  className="w-full py-4 bg-orange-600 text-white font-black italic uppercase tracking-widest rounded-xl hover:bg-orange-700 transition-colors mt-2">
                  Let's Go →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LOG STATS MODAL ── */}
      <AnimatePresence>
        {showStatsModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-sm max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black italic uppercase text-white">Log Today's Stats</h2>
                <button onClick={() => setShowStatsModal(false)} className="text-zinc-600 hover:text-white"><FaTimes /></button>
              </div>
              <form onSubmit={saveStats} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Steps Today</label>
                  <input type="number" value={statsForm.steps} onChange={e => setStatsForm({ ...statsForm, steps: e.target.value })}
                    placeholder="e.g. 8000" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sleep Last Night (hours)</label>
                  <input type="number" step="0.5" value={statsForm.sleep} onChange={e => setStatsForm({ ...statsForm, sleep: e.target.value })}
                    placeholder="e.g. 7.5" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowStatsModal(false)} className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-orange-700 transition-colors">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ADD EXERCISE MODAL ── */}
      <AnimatePresence>
        {showWorkoutModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black italic uppercase text-white">Add Exercise</h2>
                <button onClick={() => setShowWorkoutModal(false)} className="text-zinc-600 hover:text-white"><FaTimes /></button>
              </div>
              <form onSubmit={addExercise} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Exercise Name</label>
                  <input required type="text" value={newExercise.name} onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
                    placeholder="e.g. Bench Press" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sets</label>
                    <input required type="number" value={newExercise.sets} onChange={e => setNewExercise({ ...newExercise, sets: e.target.value })}
                      placeholder="4" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Reps</label>
                    <input required type="text" value={newExercise.reps} onChange={e => setNewExercise({ ...newExercise, reps: e.target.value })}
                      placeholder="8-10" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Weight</label>
                    <input type="text" value={newExercise.weight} onChange={e => setNewExercise({ ...newExercise, weight: e.target.value })}
                      placeholder="80kg" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowWorkoutModal(false)} className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-orange-700 transition-colors">Add</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ADD PR MODAL ── */}
      <AnimatePresence>
        {showPRModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black italic uppercase text-white">Log <span className="text-yellow-500">PR</span></h2>
                <button onClick={() => setShowPRModal(false)} className="text-zinc-600 hover:text-white"><FaTimes /></button>
              </div>
              <form onSubmit={addPR} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Exercise</label>
                  <input required type="text" value={newPR.exercise} onChange={e => setNewPR({ ...newPR, exercise: e.target.value })}
                    placeholder="e.g. Deadlift" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Weight / Record</label>
                  <input required type="text" value={newPR.weight} onChange={e => setNewPR({ ...newPR, weight: e.target.value })}
                    placeholder="e.g. 140kg or 10 pullups" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowPRModal(false)} className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-yellow-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-yellow-700 transition-colors">Save PR</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── LOG MEAL MODAL ── */}
      <AnimatePresence>
        {showMealModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black italic uppercase text-white">Log Meal</h2>
                <button onClick={() => setShowMealModal(false)} className="text-zinc-600 hover:text-white"><FaTimes /></button>
              </div>
              <form onSubmit={addMeal} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Meal Description</label>
                  <input required type="text" value={newMeal.name} onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                    placeholder="e.g. Chicken rice + veggies" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Meal Type</label>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {["Breakfast","Lunch","Dinner","Snack","Pre-Workout","Post-Workout"].map(t => (
                      <button key={t} type="button" onClick={() => setNewMeal({ ...newMeal, type: t })}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wide border transition-all ${
                          newMeal.type === t ? "bg-orange-600 border-orange-600 text-white" : "border-white/10 text-zinc-500 hover:text-white"
                        }`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Calories</label>
                    <input required type="number" value={newMeal.cals} onChange={e => setNewMeal({ ...newMeal, cals: e.target.value })}
                      placeholder="500" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protein (g)</label>
                    <input type="number" value={newMeal.protein} onChange={e => setNewMeal({ ...newMeal, protein: e.target.value })}
                      placeholder="40" className="w-full mt-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowMealModal(false)} className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-black uppercase tracking-wider hover:bg-zinc-700 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-orange-700 transition-colors">Log Meal</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}