import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-[9998] p-3 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border border-gray-200/50 dark:border-gray-700/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {darkMode ? (
        <FaSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </motion.button>
  );
} 