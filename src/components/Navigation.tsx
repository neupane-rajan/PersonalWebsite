import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon, 
  CodeBracketIcon, 
  WrenchScrewdriverIcon, 
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', icon: HomeIcon, href: '#home' },
  { name: 'About', icon: UserIcon, href: '#about' },
  { name: 'Projects', icon: CodeBracketIcon, href: '#projects' },
  { name: 'Skills', icon: WrenchScrewdriverIcon, href: '#skills' },
  { name: 'Contact', icon: EnvelopeIcon, href: '#contact' },
];

interface NavigationProps {
  setDarkMode: (darkMode: boolean) => void;
}

export default function Navigation({ setDarkMode }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[10000] p-2.5 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50 transition-colors lg:hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </motion.button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[9998] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 left-0 h-full w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl z-[9999] lg:hidden"
            >
              <div className="flex flex-col items-start p-6 space-y-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 transition-colors ${
                        isActive 
                          ? 'text-primary-500 dark:text-primary-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                      }`}
                      whileHover={{ x: 5 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-6 bg-primary-500 dark:bg-primary-400 rounded-r-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 h-screen z-[9999] hidden lg:block"
      >
        <div className="h-screen w-16 sm:w-20 md:w-24 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-8 p-4 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`p-3 rounded-xl backdrop-blur-sm border transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500/50 dark:border-primary-400/50'
                      : 'bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:border-primary-500/50 dark:hover:border-primary-400/50'
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                      isActive
                        ? 'text-primary-500 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-500 dark:group-hover:text-primary-400'
                    }`} />
                  </div>
                  <span className="absolute left-full ml-4 px-3 py-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                    {item.name}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}