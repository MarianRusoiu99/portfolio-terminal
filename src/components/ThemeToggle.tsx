import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2.5 rounded-full bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/50 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: theme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-4 h-4" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? -180 : 0, scale: theme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-4 h-4" />
      </motion.div>
    </motion.button>
  );
};