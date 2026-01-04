import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  UserIcon, 
  CodeBracketIcon, 
  WrenchScrewdriverIcon, 
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', icon: HomeIcon, href: '#home', workspace: '1' },
  { name: 'About', icon: UserIcon, href: '#about', workspace: '2' },
  { name: 'Projects', icon: CodeBracketIcon, href: '#projects', workspace: '3' },
  { name: 'Skills', icon: WrenchScrewdriverIcon, href: '#skills', workspace: '4' },
  { name: 'Contact', icon: EnvelopeIcon, href: '#contact', workspace: '5' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());

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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Enhanced Waybar-style Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-ctp-crust/95 backdrop-blur-sm border-b border-ctp-surface0">
        <div className="max-w-full px-3">
          <div className="flex items-center justify-between h-10">
            
            {/* Left Module - Logo */}
            <div className="flex items-center space-x-2">
              <a
                href="#home"
                className="px-3 py-1.5 bg-ctp-surface0 text-ctp-teal hover:bg-ctp-surface1 transition-colors font-mono font-semibold text-sm rounded"
              >
                <span className="text-ctp-subtext0">[</span>
                <span>rajan@neupane</span>
                <span className="text-ctp-subtext0">]</span>
              </a>
            </div>

            {/* Center Module - Workspaces (Desktop) */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-1.5 text-xs font-mono flex items-center space-x-2 transition-all rounded ${
                      isActive
                        ? 'bg-ctp-surface1 text-ctp-teal border border-ctp-surface2'
                        : 'text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0'
                    }`}
                    title={item.name}
                  >
                    <span className={`${isActive ? 'text-ctp-teal' : 'text-ctp-overlay0'}`}>
                      {item.workspace}
                    </span>
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

            {/* Right Module - System Status */}
            <div className="flex items-center space-x-2">
              {/* Time */}
              <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-ctp-surface0 text-ctp-text font-mono text-xs rounded">
                <ClockIcon className="w-3.5 h-3.5 text-ctp-blue" />
                <span>{formatTime(currentTime)}</span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-1.5 bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-text transition-colors rounded"
              >
                {isOpen ? (
                  <XMarkIcon className="w-4 h-4" />
                ) : (
                  <Bars3Icon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-10 left-0 right-0 bg-ctp-mantle/98 backdrop-blur-sm border-b border-ctp-surface0 z-[9999] md:hidden">
            <div className="flex flex-col divide-y divide-ctp-surface0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-mono transition-colors ${
                      isActive
                        ? 'text-ctp-teal bg-ctp-surface0'
                        : 'text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`w-6 text-center ${isActive ? 'text-ctp-teal' : 'text-ctp-overlay0'}`}>
                      {item.workspace}
                    </span>
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}