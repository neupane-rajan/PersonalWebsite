import { motion } from 'framer-motion';

interface AboutSectionProps {
  darkMode: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function AboutSection({ darkMode }: AboutSectionProps) {
  return (
    <motion.section 
      id="about" 
      className="min-h-screen w-full px-4 sm:px-8 py-20 bg-transparent lg:ml-16 sm:ml-20 md:ml-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16">
          <motion.span 
            className="px-3 py-1 bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium rounded-full text-sm inline-block tech-font"
            whileHover={{ scale: 1.05 }}
          >
            ABOUT ME
          </motion.span>
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mt-4 tech-font">My Journey in Tech</h2>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full bg-gradient-to-br ${
                  darkMode 
                    ? i % 2 === 0 ? 'from-indigo-400/10 to-purple-500/10' : 'from-blue-400/10 to-cyan-500/10'
                    : i % 2 === 0 ? 'from-indigo-300/20 to-purple-400/20' : 'from-blue-300/20 to-cyan-400/20'
                }`}
                style={{
                  width: (i * 40) + 20,
                  height: (i * 40) + 20,
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

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start relative">
            {/* Left Column - Text Content */}
            <motion.div 
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4 sm:space-y-6 text-gray-600 dark:text-gray-300">
                <p className="leading-relaxed text-base sm:text-lg">
                  My journey in tech begin with self learning  and pursue my passion for programming. 
                  The first and half year was challenging - I found myself stuck in tutorial hell, jumping from one course to another without 
                  making real progress.
                </p>
                <p className="leading-relaxed text-base sm:text-lg">
                  The turning point came when I decided to build real projects instead of just following tutorials. 
                  I started with small scripts, then moved to web applications, and gradually built my confidence. 
                  The second year was about breaking free from tutorial dependency and embracing the learning-by-doing approach.
                </p>
                <p className="leading-relaxed text-base sm:text-lg">
                  Today, I'm proud of how far I've come. Every challenge I faced taught me something valuable, and every 
                  project I built made me a better developer. When I'm not coding, you can find me playing the ukulele, 
                  exploring philosophical concepts, or diving into new technologies.
                </p>
              </div>

              {/* Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                <motion.div 
                  className="p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 tech-font">Self-Learning</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Embracing challenges and learning through hands-on experience
                  </p>
                </motion.div>
                <motion.div 
                  className="p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 tech-font">Problem Solver</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Finding elegant solutions to complex technical challenges
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div 
              className="relative h-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Professional Photo */}
              <motion.div 
                className="mb-6 sm:mb-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <img 
                    src="/pic.png" 
                    alt="Rajan Neupane" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </motion.div>

              {/* Philosophical Quote */}
              <motion.div 
                className="sticky top-24 p-6 sm:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <span className="absolute -top-4 -left-4 text-4xl sm:text-6xl text-indigo-500/20 dark:text-indigo-400/20">"</span>
                  <p className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 pl-4">
                    The only true wisdom is in knowing you know nothing.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 tech-font text-right">- Socrates</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 