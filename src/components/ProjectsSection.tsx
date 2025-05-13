import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaTerminal, 
  FaTasks,
  FaReact,
  FaPython,
  FaGithub
} from 'react-icons/fa';
import { SiTailwindcss, SiDjango } from 'react-icons/si';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const projects = [
  {
    title: "Airline Reservation System",
    description: "A full-stack web application for managing airline reservations with real-time updates and user authentication.",
    icon: FaPlane,
    iconColor: "text-blue-500",
    gradient: "from-blue-500 to-cyan-400",
    tech: [
      { name: 'React', icon: FaReact, color: 'text-cyan-400' },
      { name: 'Django', icon: SiDjango, color: 'text-green-600' },
      { name: 'Tailwind', icon: SiTailwindcss, color: 'text-blue-400' }
    ],
    github: "https://github.com/neupane-rajan/airline-reservation"
  },
  {
    title: "CLI Task Manager",
    description: "A command-line task management tool built with Python, featuring task creation, tracking, and organization.",
    icon: FaTasks,
    iconColor: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    tech: [
      { name: 'Python', icon: FaPython, color: 'text-blue-500' }
    ],
    github: "https://github.com/neupane-rajan/CLI-Task-Manager"
  },
  {
    title: "Cosmic Terminal Theme Pack",
    description: "A collection of beautiful terminal themes for kitty and fish shell, featuring space and nature-inspired designs.",
    icon: FaTerminal,
    iconColor: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
    tech: [
      { name: 'Shell', icon: FaTerminal, color: 'text-emerald-500' }
    ],
    github: "https://github.com/neupane-rajan/cosmic-terminal-theme-pack"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const Icon = project.icon;
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl ${project.gradient}`} />
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 h-full">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={project.iconColor}>
            <Icon size={24} className="sm:w-8 sm:h-8" />
          </div>
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <FaGithub size={18} className="sm:w-5 sm:h-5" />
          </a>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 tech-font">{project.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => {
            const TechIcon = tech.icon;
            return (
              <span 
                key={tech.name}
                className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700"
              >
                <div className={`mr-1 ${tech.color}`}>
                  <TechIcon size={12} className="sm:w-3 sm:h-3" />
                </div>
                {tech.name}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <motion.section 
      id="projects" 
      className="min-h-screen w-full px-4 sm:px-8 py-20 bg-transparent lg:ml-16 sm:ml-20 md:ml-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <motion.span 
            className="px-3 py-1 bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium rounded-full text-sm inline-block tech-font"
            whileHover={{ scale: 1.05 }}
          >
            PROJECTS
          </motion.span>
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mt-4 tech-font">Featured Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
} 