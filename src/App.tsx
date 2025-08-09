import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ThemeToggle from './components/ThemeToggle'
import './App.css'
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
  SiCss3
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
  { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' }
];

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
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

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Navigation />
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="overflow-x-hidden scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
        <HeroSection darkMode={darkMode} />
        <AboutSection darkMode={darkMode} />
        <ProjectsSection />
        
        {/* Skills Section */}
              <section id="skills" className="min-h-screen w-full px-4 sm:px-8 py-20 bg-transparent lg:ml-16 sm:ml-20 md:ml-24">
          <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-8 sm:mb-16">
              <motion.span 
                className="px-3 py-1 bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium rounded-full text-sm inline-block tech-font"
                whileHover={{ scale: 1.05 }}
              >
                SKILLS
              </motion.span>
                    <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mt-4 tech-font">Tools I Love</h2>
            </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                    {skills.map((skill) => {
                      const Icon = skill.icon;
                      return isMobile ? (
                        <div 
                          key={skill.name}
                className="flex flex-col items-center"
                        >
                          <Icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${skill.color} mb-2 sm:mb-3`} />
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        </div>
                      ) : (
              <motion.div 
                          key={skill.name}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, 2, 0]
                }}
                transition={{ 
                  duration: 2.6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                          <Icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${skill.color} mb-2 sm:mb-3`} />
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              </motion.div>
                      );
                    })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
              <section id="contact" className="w-full px-4 sm:px-8 py-20 bg-transparent lg:ml-16 sm:ml-20 md:ml-24 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="w-full max-w-6xl mx-auto relative">
                  <div className="text-center mb-8 sm:mb-16">
              <motion.span 
                className="px-3 py-1 bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium rounded-full text-sm inline-block tech-font"
                whileHover={{ scale: 1.05 }}
              >
                CONTACT
              </motion.span>
                    <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mt-4 tech-font">Get In Touch</h2>
            </div>
            <div className="flex justify-center">
              {/* Contact Info */}
              <motion.div 
                      className="p-4 sm:p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 w-full max-w-2xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-indigo-500/20 to-purple-500/20 blur-xl"></div>
                
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tech-font relative">Let's Connect</h3>
                      <div className="space-y-4 sm:space-y-6 relative">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <a href="mailto:rajanneupane202@gmail.com" className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400">rajanneupane202@gmail.com</a>
                    </div>
                  </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                            <p className="text-sm sm:text-base text-gray-900 dark:text-white">Kathmandu, Nepal</p>
                    </div>
                  </div>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
      <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Social</p>
                            <div className="flex space-x-3 sm:space-x-4 mt-2">
                        <motion.a 
                                href="https://github.com/neupane-rajan" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </motion.a>
                        <motion.a 
                                href="https://www.linkedin.com/in/rajan00" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </motion.a>
                        <motion.a 
                                href="https://www.instagram.com/rajan0___0/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </motion.a>
                        <motion.a 
                                href="https://x.com/neupanehere" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
              <footer className="w-full py-4 sm:py-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <div className="relative">
            <motion.p 
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Made with <span className="text-red-500">❤️</span> by Rajan
            </motion.p>
      </div>
        </footer>
            </motion.div>
          </AnimatePresence>
      </main>
      </div>
      </div>
  )
}

export default App
