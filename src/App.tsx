import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import './App.css'
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { FaTerminal } from 'react-icons/fa';
import { 
  SiDjango, 
  SiFlask, 
  SiFastapi,
  SiMysql,
  SiPostman,
  SiGnubash,
  SiJavascript,
  SiReact,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiLinux,
  SiHtml5,
  SiCss3,
  SiArchlinux,
  SiNeovim,
  SiVim
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const skills: Skill[] = [
  { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-[#F7DF1E]' },
  { name: 'HTML5', icon: SiHtml5, color: 'text-[#E34F26]' },
  { name: 'CSS3', icon: SiCss3, color: 'text-[#1572B6]' },
  { name: 'Python', icon: SiPython, color: 'text-[#3776AB]' },
  { name: 'Django', icon: SiDjango, color: 'text-[#092E20]' },
  { name: 'Flask', icon: SiFlask, color: 'text-[#000000]' },
  { name: 'FastAPI', icon: SiFastapi, color: 'text-[#009688]' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#336791]' },
  { name: 'MySQL', icon: SiMysql, color: 'text-[#4479A1]' },
  { name: 'Linux', icon: SiLinux, color: 'text-black dark:text-white' },
  { name: 'Git', icon: SiGit, color: 'text-[#F05032]' },
  { name: 'Bash', icon: SiGnubash, color: 'text-black dark:text-white' },
  { name: 'Shell', icon: FaTerminal, color: 'text-[#4D4D4D]' },
  { name: 'Postman', icon: SiPostman, color: 'text-[#FF6C37]' },
  { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
  { name: 'Arch Linux', icon: SiArchlinux, color: 'text-[#1793D1]' },
  { name: 'Neovim', icon: SiNeovim, color: 'text-[#57A143]' },
  { name: 'Vim', icon: SiVim, color: 'text-[#019733]' }
];

function App() {
  // Enforce dark mode
  const darkMode = true;
  const currentSection = 'home'
  const progressBarRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  // Handle scroll progress with RAF
  useEffect(() => {
    const updateProgress = () => {
      if (!progressBarRef.current) return

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalScroll) * 100
      progressBarRef.current.style.width = `${progress}%`
      
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    const startProgress = () => {
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    startProgress()

    // Force dark mode class
    document.documentElement.classList.add('dark');

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])



  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Optimized Scroll Progress Bar */}
      <div className="progress-container">
        <div ref={progressBarRef} className="progress-bar" />
      </div>
      
      <div className="min-h-screen">
        <Navigation />
        
        <main className="overflow-x-hidden scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        
        {/* Skills Section */}
        <section id="skills" className="w-full px-4 sm:px-8 py-12">
          <div className="w-full max-w-7xl mx-auto">
            {/* Skills Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl relative group"
            >
              {/* Hyprland-style animated border glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-lg border-2 border-ctp-blue/50 animate-pulse" />
                <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(137,180,250,0.3)]" />
              </div>

              {/* Window Title Bar */}
              <div className="bg-ctp-crust px-4 py-2 flex items-center justify-between border-b border-ctp-surface0">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-ctp-red"></div>
                  <div className="w-3 h-3 rounded-full bg-ctp-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-ctp-green"></div>
                </div>
                <div className="text-ctp-subtext0 text-xs font-mono">~/skills/tech-stack.sh</div>
                <div className="w-16 text-right text-ctp-overlay0 text-[10px] font-mono">bash</div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono">
                {/* Command */}
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-ctp-green">❯</span>
                  <span className="text-ctp-text">cat tech-stack.txt</span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex flex-col items-center p-3 bg-ctp-surface0 hover:bg-ctp-surface1 rounded border border-ctp-surface1 hover:border-ctp-teal/50 transition-all group/skill"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${skill.color} mb-2`} />
                        <span className="text-xs text-ctp-subtext0 group-hover/skill:text-ctp-text transition-colors text-center">{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Output message */}
                <div className="mt-6 flex items-center space-x-2 text-sm">
                  <span className="text-ctp-green">✓</span>
                  <span className="text-ctp-subtext0">{skills.length} tools loaded successfully</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
            </motion.div>
          </AnimatePresence>
      </main>
      </div>
      </div>
  )
}

export default App
