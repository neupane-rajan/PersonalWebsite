import { motion } from 'framer-motion';
import { Terminal, User } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-4 sm:px-8 py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* About Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl relative group"
        >
          {/* Hyprland-style animated border glow */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-lg border-2 border-ctp-pink/50 animate-pulse" />
            <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(245,194,231,0.3)]" />
          </div>

          {/* Window Title Bar */}
          <div className="bg-ctp-crust px-4 py-2 flex items-center justify-between border-b border-ctp-surface0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-ctp-red"></div>
              <div className="w-3 h-3 rounded-full bg-ctp-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-ctp-green"></div>
            </div>
            <div className="text-ctp-subtext0 text-xs font-mono">~/about/journey.md</div>
            <div className="w-16 text-right text-ctp-overlay0 text-[10px] font-mono">nvim</div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 sm:p-8 font-mono">
            {/* Command */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-ctp-green">❯</span>
              <span className="text-ctp-text">cat about.txt</span>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left - Text Content */}
              <div className="space-y-4 text-sm text-ctp-subtext0">
                <p className="leading-relaxed">
                  My journey in tech began with self-learning and pursuing my passion for programming. 
                  The first year and a half was challenging - I found myself stuck in tutorial hell, jumping from one course to another without making real progress.
                </p>
                <p className="leading-relaxed">
                  The turning point came when I decided to build real projects instead of just following tutorials. 
                  I started with small scripts, then moved to web applications, and gradually built my confidence.
                </p>
                <p className="leading-relaxed">
                  Today, I'm proud of how far I've come. Every challenge I faced taught me something valuable, and every 
                  project I built made me a better developer. When I'm not coding, you can find me playing the ukulele, 
                  exploring philosophical concepts, or diving into new technologies.
                </p>
              </div>

              {/* Right - Image and Stats */}
              <div className="space-y-4">
                {/* Image Window */}
                <div className="bg-ctp-surface0 border border-ctp-surface1 rounded overflow-hidden">
                  <div className="bg-ctp-crust px-3 py-1.5 flex items-center justify-between border-b border-ctp-surface1">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-ctp-red"></div>
                      <div className="w-2 h-2 rounded-full bg-ctp-yellow"></div>
                      <div className="w-2 h-2 rounded-full bg-ctp-green"></div>
                    </div>
                    <div className="text-ctp-overlay0 text-[9px] font-mono">~/images/pic.png</div>
                  </div>
                  <img 
                    src="/pic.png" 
                    alt="Rajan Neupane" 
                    className="w-full aspect-square object-cover"
                  />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-ctp-surface0 border border-ctp-surface1 rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-ctp-teal" />
                      <span className="text-[10px] text-ctp-overlay0">ROLE</span>
                    </div>
                    <p className="text-sm font-semibold text-ctp-text">Self-Learner</p>
                  </div>
                  <div className="p-3 bg-ctp-surface0 border border-ctp-surface1 rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <Terminal className="w-4 h-4 text-ctp-mauve" />
                      <span className="text-[10px] text-ctp-overlay0">FOCUS</span>
                    </div>
                    <p className="text-sm font-semibold text-ctp-text">Problem Solver</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Box */}
            <div className="mt-6 p-4 bg-ctp-surface0 border-l-4 border-ctp-teal rounded">
              <p className="text-sm italic text-ctp-subtext0">
                "The only true wisdom is in knowing you know nothing."
              </p>
              <p className="text-xs text-ctp-overlay0 mt-2 text-right">- Socrates</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}