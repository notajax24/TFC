import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all 
                 bg-zinc-100 dark:bg-zinc-900 
                 border border-zinc-200 dark:border-white/10 
                 text-zinc-600 dark:text-zinc-400 
                 hover:text-red-600 dark:hover:text-white 
                 hover:border-red-500/50 shadow-sm"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {/* Dynamic Icon Switch */}
      {theme === "dark" ? (
        <FaSun size={14} className="animate-pulse" />
      ) : (
        <FaMoon size={14} />
      )}
    </button>
  );
}