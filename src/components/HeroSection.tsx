import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  InstagramIcon,
  ArrowRight,
  Terminal
} from 'lucide-react';
import MatrixRain from './MatrixRain';
import AudioMotionVisualizer from './AudioMotionVisualizer';
import MusicPlayer from './MusicPlayer';


export default function HeroSection() {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  return (
    <section id="home" className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden pt-14 pb-6">
      {/* Catppuccin Background */}
      <div className="absolute inset-0 bg-ctp-base" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#45475a15_1px,transparent_1px),linear-gradient(to_bottom,#45475a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Main Content - 1x3 Layout: Hero Image Left, Terminals Right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          
          {/* Left Column - Hero Image (spans 2 columns) */}
          <motion.div
            className="lg:col-span-2 flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl  flex flex-col relative group h-full max-h-[380px] lg:max-h-[660px]">
              {/* Hyprland-style animated border glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="absolute inset-0 rounded-lg border-2 border-ctp-mauve/50 animate-pulse" />
                <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(203,166,247,0.3)]" />
              </div>
              
              {/* Window Title Bar */}
              <div className="bg-ctp-crust px-4 py-2 flex items-center justify-between border-b border-ctp-surface0 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-ctp-red"></div>
                  <div className="w-3 h-3 rounded-full bg-ctp-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-ctp-green"></div>
                </div>
                <div className="text-ctp-subtext0 text-xs font-mono">~/images/hero.jpeg</div>
                <div className="w-16 text-right text-ctp-overlay0 text-[10px] font-mono">feh</div>
              </div>

              {/* Image Content */}
              <div className="relative flex-grow bg-ctp-base overflow-hidden">
                <img
                  src="/hero-image.jpeg"
                  alt="Rajan Neupane"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ctp-base/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stacked Terminals */}
          <div className="flex flex-col gap-3">
            
            {/* Terminal Window - Top */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl flex flex-col relative group">
                {/* Hyprland-style animated border glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg border-2 border-ctp-teal/50 animate-pulse" />
                  <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(148,226,213,0.3)]" />
                </div>
                
                {/* Terminal Header */}
                <div className="bg-ctp-crust px-3 py-1.5 flex items-center justify-between border-b border-ctp-surface0 flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-red"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-yellow"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-green"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-ctp-subtext0 text-sm font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>rajan@portfolio:~</span>
                  </div>
                  <div className="w-12 text-right text-ctp-overlay0 text-xs font-mono">bash</div>
                </div>

                {/* Terminal Content - Very Compact */}
                <div className="p-3 space-y-2 font-mono text-xs">
                  {/* whoami */}
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-ctp-green text-sm">❯</span>
                      <span className="text-ctp-text">whoami</span>
                    </div>
                    <div className="pl-3">
                      <p className="text-ctp-teal text-base font-bold">Rajan Neupane</p>
                    </div>
                  </div>

                  {/* cat role */}
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-ctp-green text-sm">❯</span>
                      <span className="text-ctp-text">cat role.txt</span>
                    </div>
                    <div className="pl-3 text-sm">
                      <span className="text-ctp-teal font-semibold">Arch btw</span>
                      <span className="text-ctp-overlay0 mx-2">|</span>
                      <span className="text-ctp-teal font-semibold">Developer</span>
                      <span className="text-ctp-overlay0 mx-2">|</span>
                      <span className="text-ctp-pink font-semibold">Self-learner</span>

                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-ctp-teal hover:bg-ctp-teal/90 text-ctp-base font-mono font-semibold text-[10px] rounded transition-all"
                    >
                      <span>./projects</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-ctp-surface0 hover:bg-ctp-surface1 text-ctp-text font-mono font-semibold text-[10px] rounded border border-ctp-surface1"
                    >
                      <span>./contact</span>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {[
                      { Icon: GithubIcon, href: 'https://github.com/neupane-rajan', color: 'hover:text-ctp-mauve' },
                      { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rajan00', color: 'hover:text-ctp-blue' },
                      { Icon: TwitterIcon, href: 'https://x.com/neupanehere', color: 'hover:text-ctp-sky' },
                      { Icon: InstagramIcon, href: 'https://www.instagram.com/rajan0___0/', color: 'hover:text-ctp-pink' },
                    ].map(({ Icon, href, color }, idx) => (
                      <a
                        key={idx}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 ${color} transition-all hover:scale-110`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Matrix Rain Window - Middle */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl flex flex-col relative group h-[120px]">
                {/* Hyprland-style animated border glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="absolute inset-0 rounded-lg border-2 border-ctp-green/50 animate-pulse" />
                  <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(166,227,161,0.3)]" />
                </div>
                
                {/* Window Title Bar */}
                <div className="bg-ctp-crust px-3 py-1.5 flex items-center justify-between border-b border-ctp-surface0 flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-red"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-yellow"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-green"></div>
                  </div>
                  <div className="text-ctp-subtext0 text-[10px] font-mono">~/scripts/matrix.sh</div>
                  <div className="w-12 text-right text-ctp-overlay0 text-[9px] font-mono">cmatrix</div>
                </div>

                {/* Matrix Rain Content */}
                <div className="relative flex-grow bg-ctp-base overflow-hidden">
                  <MatrixRain />
                </div>
              </div>
            </motion.div>

            {/* Music Player Window - Third */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl flex flex-col relative group h-[140px]">
                {/* Hyprland-style animated border glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="absolute inset-0 rounded-lg border-2 border-ctp-mauve/50 animate-pulse" />
                  <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(203,166,247,0.3)]" />
                </div>
                
                {/* Window Title Bar */}
                <div className="bg-ctp-crust px-3 py-1.5 flex items-center justify-between border-b border-ctp-surface0 flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-red"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-yellow"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-green"></div>
                  </div>
                  <div className="text-ctp-subtext0 text-[10px] font-mono">~/music/player</div>
                  <div className="w-12 text-right text-ctp-overlay0 text-[9px] font-mono">mpd</div>
                </div>

                {/* Music Player Content */}
                <div className="relative flex-grow bg-ctp-base overflow-hidden">
                  <MusicPlayer onAudioReady={setAudioElement} />
                </div>
              </div>
            </motion.div>

            {/* Cava Visualizer Window - Bottom */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl flex flex-col relative group h-[140px]">
                {/* Hyprland-style animated border glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="absolute inset-0 rounded-lg border-2 border-ctp-blue/50 animate-pulse" />
                  <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(137,180,250,0.3)]" />
                </div>
                
                {/* Window Title Bar */}
                <div className="bg-ctp-crust px-3 py-1.5 flex items-center justify-between border-b border-ctp-surface0 flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-red"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-yellow"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-green"></div>
                  </div>
                  <div className="text-ctp-subtext0 text-[10px] font-mono">~/audio/visualizer</div>
                  <div className="w-12 text-right text-ctp-overlay0 text-[9px] font-mono">cava</div>
                </div>

                {/* AudioMotion Visualizer Content */}
                <div className="relative flex-grow bg-ctp-base overflow-hidden">
                  <AudioMotionVisualizer audioElement={audioElement} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
