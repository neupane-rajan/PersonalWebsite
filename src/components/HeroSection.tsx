import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  InstagramIcon 
} from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
}

const typewriterColors = [
  'text-primary-600',
  'text-rose-500',
  'text-violet-500',
  'text-sky-500',
  'text-emerald-500',
];

function Typewriter({ words, speed = 120, loop = true }: { words: string[], speed?: number, loop?: boolean }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    if (index >= words.length) {
      if (loop) {
        setIndex(0);
        setSubIndex(0);
        setReverse(false);
        setColorIdx((prev) => (prev + 1) % typewriterColors.length);
      }
      return;
    }
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      setColorIdx((prev) => (prev + 1) % typewriterColors.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, loop]);

  if (!words || words.length === 0 || index >= words.length) return null;

  return (
    <span className={`transition-colors duration-300 font-semibold ${typewriterColors[colorIdx]}`}>
      {`${words[index].substring(0, subIndex)}`}
      <span className="border-r-2 border-primary-600 animate-pulse ml-1" style={{ color: 'inherit' }} />
    </span>
  );
}

export default function HeroSection({ darkMode }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-8">
      {/* Modern gradient background with subtle animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-purple-50/30 dark:from-primary-900/20 dark:to-purple-900/20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br ${
              darkMode 
                ? i % 2 === 0 ? 'from-blue-400/10 to-indigo-500/10' : 'from-purple-400/10 to-pink-500/10'
                : i % 2 === 0 ? 'from-blue-300/20 to-indigo-400/20' : 'from-purple-300/20 to-pink-400/20'
            }`}
            style={{
              width: (i * 40) + 20,
              height: (i * 40) + 20,
              x: Math.sin(i) * 200,
              y: Math.cos(i) * 200,
              left: `${25 + (i * 15)}%`,
              top: `${20 + (i * 15)}%`,
              filter: 'blur(8px)',
            }}
            animate={{
              x: [0, i % 2 === 0 ? 40 : -40, 0],
              y: [0, i % 2 === 0 ? -40 : 40, 0],
              opacity: [0.7, 0.4, 0.7],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Text content - takes 3 columns on lg screens */}
        <motion.div 
          className="flex flex-col items-start text-left w-full order-2 lg:order-1 lg:col-span-3 pl-4 sm:pl-6 lg:pl-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <motion.span 
              className="px-3 py-1 sm:px-4 sm:py-1.5 bg-primary-100/80 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 font-medium rounded-full text-xs sm:text-sm inline-block"
              whileHover={{ scale: 1.05 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hi, I'm <span className="text-primary-600 dark:text-primary-400 relative inline-block">
              Rajan
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-primary-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light min-h-[2.5rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typewriter 
              words={[
                "Self-learner", 
                "A deep thinker", 
                "A bit of a philosopher", 
                "Programmer", 
                "Ukulele player"
              ]} 
            />
          </motion.p>

          <motion.div
            className="text-lg text-gray-500 dark:text-gray-400 mb-8 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            "I think, therefore I code"
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Social Media Icons */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.a
                href="https://github.com/neupane-rajan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <GithubIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/rajan00"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedinIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com/neupanehere"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <TwitterIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/rajan0___0/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <InstagramIcon className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Modern 3D avatar - takes 2 columns on lg screens */}
        <motion.div 
          className="flex justify-center items-center order-1 lg:order-2 lg:col-span-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
            {/* Modern 3D Avatar */}
            <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Gradients */}
                <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={darkMode ? "#fbbf24" : "#fcd34d"} />
                  <stop offset="100%" stopColor={darkMode ? "#f59e0b" : "#fbbf24"} />
                </linearGradient>
                
                <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={darkMode ? "#3b82f6" : "#60a5fa"} />
                  <stop offset="100%" stopColor={darkMode ? "#1d4ed8" : "#3b82f6"} />
                </linearGradient>
                
                <linearGradient id="bgGradient" gradientTransform="rotate(45)">
                  <stop offset="0%" stopColor={darkMode ? "#1e293b" : "#e0f2fe"} />
                  <stop offset="100%" stopColor={darkMode ? "#0f172a" : "#bfdbfe"} />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Background glow effect */}
              <motion.circle 
                cx="200" 
                cy="200" 
                r="180" 
                fill="url(#bgGradient)"
                filter="url(#glow)"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              />
              
              {/* Character body */}
              <g>
                {/* Modern floating elements */}
                <motion.circle 
                  cx="100" 
                  cy="120" 
                  r="15" 
                  fill={darkMode ? "#8b5cf6" : "#a78bfa"} 
                  opacity="0.8"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.8, 0.6, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <motion.circle 
                  cx="320" 
                  cy="150" 
                  r="12" 
                  fill={darkMode ? "#ec4899" : "#f472b6"} 
                  opacity="0.8"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.8, 0.6, 0.8]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <motion.rect 
                  x="290" 
                  cy="250" 
                  width="20" 
                  height="20" 
                  rx="4"
                  fill={darkMode ? "#f59e0b" : "#fbbf24"} 
                  opacity="0.8"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 30, 0],
                    opacity: [0.8, 0.6, 0.8]
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <motion.polygon 
                  points="80,280 100,260 120,280" 
                  fill={darkMode ? "#10b981" : "#34d399"} 
                  opacity="0.8"
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -20, 0],
                    opacity: [0.8, 0.6, 0.8]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Shirt/Upper Body */}
                <motion.path 
                  d="M140,260 L200,230 L260,260 C260,260 270,330 200,330 C130,330 140,260 140,260 Z" 
                  fill="url(#shirtGradient)"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
                
                {/* Neck */}
                <motion.path 
                  d="M185,230 L215,230 L210,260 L190,260 Z" 
                  fill="url(#faceGradient)" 
                  opacity="0.9"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
                
                {/* Head/Face - more modern 3D look */}
                <motion.g
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Main head shape */}
                  <path 
                    d="M140,180 C140,120 260,120 260,180 L250,230 C250,260 150,260 150,230 L140,180" 
                    fill="url(#faceGradient)" 
                  />
                  
                  {/* Hair - modern style */}
                  <motion.path 
                    d="M140,180 C140,120 260,120 260,180 L250,190 C250,150 150,150 150,190 L140,180 M150,130 L150,100 L250,100 L250,130 C250,100 150,100 150,130"
                    fill={darkMode ? "#18181b" : "#27272a"} 
                    animate={{ 
                      d: [
                        "M140,180 C140,120 260,120 260,180 L250,190 C250,150 150,150 150,190 L140,180 M150,130 L150,100 L250,100 L250,130 C250,100 150,100 150,130",
                        "M140,180 C140,120 260,120 260,180 L250,190 C250,150 150,150 150,190 L140,180 M155,130 L155,105 L245,105 L245,130 C245,105 155,105 155,130",
                        "M140,180 C140,120 260,120 260,180 L250,190 C250,150 150,150 150,190 L140,180 M150,130 L150,100 L250,100 L250,130 C250,100 150,100 150,130"
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  {/* Eyes - with animation */}
                  <g>
                    {/* Left eye */}
                    <motion.ellipse 
                      cx="175" 
                      cy="190" 
                      rx="12" 
                      ry={darkMode ? "8" : "10"} 
                      fill="white" 
                      animate={{ ry: [10, 2, 10] }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", times: [0, 0.03, 0.06] }}
                    />
                    <motion.circle 
                      cx="175" 
                      cy="190" 
                      r="6" 
                      fill={darkMode ? "#18181b" : "#27272a"} 
                      animate={{ 
                        cx: [175, 178, 175, 172, 175],
                        cy: [190, 188, 190, 188, 190]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        times: [0, 0.25, 0.5, 0.75, 1]
                      }}
                    />
                    <circle cx="177" cy="188" r="2" fill="white" />
                    
                    {/* Right eye */}
                    <motion.ellipse 
                      cx="225" 
                      cy="190" 
                      rx="12" 
                      ry={darkMode ? "8" : "10"} 
                      fill="white" 
                      animate={{ ry: [10, 2, 10] }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", times: [0, 0.03, 0.06] }}
                    />
                    <motion.circle 
                      cx="225" 
                      cy="190" 
                      r="6" 
                      fill={darkMode ? "#18181b" : "#27272a"} 
                      animate={{ 
                        cx: [225, 228, 225, 222, 225],
                        cy: [190, 188, 190, 188, 190]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        times: [0, 0.25, 0.5, 0.75, 1]
                      }}
                    />
                    <circle cx="227" cy="188" r="2" fill="white" />
                  </g>
                  
                  {/* Eyebrows */}
                  <motion.path 
                    d="M163,170 Q175,162 187,170" 
                    stroke={darkMode ? "#18181b" : "#27272a"} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    fill="transparent"
                    animate={{ 
                      d: ["M163,170 Q175,162 187,170", "M163,165 Q175,157 187,165", "M163,170 Q175,162 187,170"] 
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.path 
                    d="M213,170 Q225,162 237,170" 
                    stroke={darkMode ? "#18181b" : "#27272a"} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    fill="transparent"
                    animate={{ 
                      d: ["M213,170 Q225,162 237,170", "M213,165 Q225,157 237,165", "M213,170 Q225,162 237,170"] 
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  {/* Mouth with subtle animation */}
                  <motion.path 
                    d="M185,215 Q200,225 215,215" 
                    stroke={darkMode ? "#18181b" : "#27272a"} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    fill="transparent"
                    animate={{ 
                      d: ["M185,215 Q200,225 215,215", "M185,220 Q200,230 215,220", "M185,215 Q200,225 215,215"] 
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  {/* Modern glasses */}
                  <g fill="none" stroke={darkMode ? "#64748b" : "#475569"} strokeWidth="2">
                    <motion.rect 
                      x="160" 
                      y="175" 
                      width="30" 
                      height="30" 
                      rx="10" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    />
                    <motion.rect 
                      x="210" 
                      y="175" 
                      width="30" 
                      height="30" 
                      rx="10" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    />
                    <motion.line 
                      x1="190" 
                      y1="190" 
                      x2="210" 
                      y2="190" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    />
                    <motion.path 
                      d="M160,190 L150,185" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    />
                    <motion.path 
                      d="M240,190 L250,185" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    />
                  </g>
                </motion.g>
                
                {/* Modern laptop */}
                <motion.g
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {/* Laptop base */}
                  <rect x="170" y="290" width="60" height="5" rx="2" fill={darkMode ? "#64748b" : "#94a3b8"} />
                  
                  {/* Laptop screen */}
                  <motion.g
                    animate={{ 
                      rotateX: [0, 5, 0], 
                      y: [0, -1, 0] 
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                    style={{ transformOrigin: '200px 290px' }}
                  >
                    <rect x="170" y="260" width="60" height="30" rx="3" fill={darkMode ? "#334155" : "#e2e8f0"} />
                    <rect x="173" y="263" width="54" height="24" rx="1" fill={darkMode ? "#0f172a" : "#f8fafc"} />
                    
                    {/* Code on screen */}
                    <motion.text 
                      x="180" 
                      y="272" 
                      fill={darkMode ? "#38bdf8" : "#0284c7"} 
                      fontSize="4"
                      fontFamily="monospace"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      &lt;div&gt;
                    </motion.text>
                    <motion.text 
                      x="180" 
                      y="277" 
                      fill={darkMode ? "#34d399" : "#10b981"} 
                      fontSize="4"
                      fontFamily="monospace"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    >
                      &lt;/React&gt;
                    </motion.text>
                    <motion.text 
                      x="180" 
                      y="282" 
                      fill={darkMode ? "#a78bfa" : "#8b5cf6"} 
                      fontSize="4"
                      fontFamily="monospace"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    >
                      &lt;/&gt;
                    </motion.text>
                    
                    {/* Laptop logo */}
                    <circle cx="200" cy="286" r="1.5" fill={darkMode ? "#38bdf8" : "#0284c7"} />
                  </motion.g>
                </motion.g>
              </g>
            </svg>
            
            {/* Additional UI elements around avatar */}
            <motion.div
              className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-primary-400/40 to-primary-600/40 -bottom-6 -right-6 backdrop-blur-sm"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              style={{ filter: 'blur(1px)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}