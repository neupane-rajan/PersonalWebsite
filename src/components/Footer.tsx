import { motion } from 'framer-motion';
import { GitBranch, Heart, Wifi, Battery, Clock, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };



  return (
    <footer className="w-full py-6 flex justify-center items-center pointer-events-none sticky bottom-4 z-50 px-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 pointer-events-auto"
      >
        {/* Module: Workspaces (Decorative) */}
        <div className="flex items-center bg-ctp-mantle/80 backdrop-blur-md border border-ctp-surface0 rounded-2xl px-3 py-1.5 shadow-lg gap-2">
          <div className="flex gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === 0 ? 'bg-ctp-mauve w-4' : 'bg-ctp-surface2 hover:bg-ctp-overlay0'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Module: Git Branch */}
        <div className="hidden sm:flex items-center gap-2 bg-ctp-mantle/80 backdrop-blur-md border border-ctp-surface0 rounded-2xl px-3 py-1.5 shadow-lg group hover:border-ctp-mauve/50 transition-colors">
          <GitBranch className="w-3.5 h-3.5 text-ctp-mauve" />
          <span className="text-xs font-mono text-ctp-subtext0 font-semibold">main</span>
        </div>

        {/* Module: Host Info */}
        <div className="hidden sm:flex items-center gap-2 bg-ctp-mantle/80 backdrop-blur-md border border-ctp-surface0 rounded-2xl px-3 py-1.5 shadow-lg group hover:border-ctp-blue/50 transition-colors">
          <Monitor className="w-3.5 h-3.5 text-ctp-blue" />
          <span className="text-xs font-mono text-ctp-subtext0">rajan@portfolio</span>
        </div>

        {/* Module: Made With */}
        <div className="flex items-center gap-2 bg-ctp-mantle/80 backdrop-blur-md border border-ctp-surface0 rounded-2xl px-3 py-1.5 shadow-lg group hover:border-ctp-red/50 transition-colors">
            <span className="text-xs font-mono text-ctp-subtext0">made_with = </span>
            <Heart className="w-3.5 h-3.5 text-ctp-red animate-pulse" fill="currentColor" />
        </div>

        {/* Module: Copyright */}
        <div className="flex items-center bg-ctp-mantle/80 backdrop-blur-md border border-ctp-surface0 rounded-2xl px-3 py-1.5 shadow-lg">
          <span className="text-xs font-mono text-ctp-overlay1">© 2026</span>
        </div>

        {/* Module: System Status (Right side indicators) */}
        <div className="hidden sm:flex items-center gap-3 bg-ctp-mantle/80 backdrop-blur-md border border-ctp-surface0 rounded-2xl px-3 py-1.5 shadow-lg">
           <div className="flex items-center gap-1.5 text-ctp-green">
              <Wifi className="w-3.5 h-3.5" />
           </div>
           
           <div className="flex items-center gap-1.5 text-ctp-teal pl-2 border-l border-ctp-surface0">
              <Battery className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-bold">100%</span>
           </div>

           <div className="flex items-center gap-1.5 text-ctp-peach pl-2 border-l border-ctp-surface0">
             <Clock className="w-3.5 h-3.5" />
             <span className="text-[10px] font-mono font-bold">
               {formatTime(time)}
             </span>
           </div>
        </div>
      </motion.div>
    </footer>
  );
}
