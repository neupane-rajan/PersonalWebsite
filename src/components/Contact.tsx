import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FaEnvelope } from 'react-icons/fa'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function Contact() {
  return (
    <motion.section 
      id="contact" 
      className="min-h-screen w-full px-4 sm:px-8 py-20 bg-transparent lg:ml-16 sm:ml-20 md:ml-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 tech-font text-center">Let's Connect</h3>
        
        <div className="space-y-8">
          {/* Email */}
          <motion.a
            href="mailto:rajanneupane@202gmail.com"
            className="flex items-center space-x-4 group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors duration-200">
              <FaEnvelope className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
                rajanneupane202@gmail.com
              </p>
            </div>
          </motion.a>

          {/* Social Links */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">Follow me on social media</p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://github.com/neupane-rajan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <SiGithub className="w-7 h-7 text-gray-700 dark:text-gray-300" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <SiLinkedin className="w-7 h-7 text-gray-700 dark:text-gray-300" />
              </motion.a>
            </div>
          </div>

          {/* Quick Response */}
          <div className="pt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              I typically respond within 24 hours. Looking forward to connecting with you!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
} 
