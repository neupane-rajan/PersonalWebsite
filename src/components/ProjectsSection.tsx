import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaTerminal, 
  FaTasks,
  FaReact,
  FaPython,
  FaGithub,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { SiTailwindcss, SiDjango } from 'react-icons/si';

const projects = [
  {
    title: "Airline Reservation System",
    description: "A full-stack web application for managing airline reservations with real-time updates and user authentication.",
    icon: FaPlane,
    iconColor: "text-ctp-blue",
    tech: [
      { name: 'React', icon: FaReact, color: 'text-ctp-teal' },
      { name: 'Django', icon: SiDjango, color: 'text-ctp-green' },
      { name: 'Tailwind', icon: SiTailwindcss, color: 'text-ctp-blue' }
    ],
    github: "https://github.com/neupane-rajan/airline-reservation"
  },
  {
    title: "CLI Task Manager",
    description: "A command-line task management tool built with Python, featuring task creation, tracking, and organization.",
    icon: FaTasks,
    iconColor: "text-ctp-mauve",
    tech: [
      { name: 'Python', icon: FaPython, color: 'text-ctp-yellow' }
    ],
    github: "https://github.com/neupane-rajan/CLI-Task-Manager"
  },
  {
    title: "Cosmic Terminal Theme Pack",
    description: "A collection of beautiful terminal themes for kitty and fish shell, featuring space and nature-inspired designs.",
    icon: FaTerminal,
    iconColor: "text-ctp-pink",
    tech: [
      { name: 'Shell', icon: FaTerminal, color: 'text-ctp-green' }
    ],
    github: "https://github.com/neupane-rajan/cosmic-terminal-theme-pack"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full px-4 sm:px-8 py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl relative group"
              >
                {/* Hyprland-style animated border glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg border-2 border-ctp-teal/50 animate-pulse" />
                  <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(148,226,213,0.3)]" />
                </div>

                {/* Window Title Bar */}
                <div className="bg-ctp-crust px-3 py-1.5 flex items-center justify-between border-b border-ctp-surface0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-red"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-yellow"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ctp-green"></div>
                  </div>
                  <div className="text-ctp-subtext0 text-[10px] font-mono">~/projects/{project.title.toLowerCase().replace(/\s+/g, '-')}</div>
                  <div className="w-12"></div>
                </div>

                {/* Project Content */}
                <div className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`${project.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-ctp-surface0 text-ctp-subtext0 hover:bg-ctp-surface1 hover:text-ctp-teal transition-colors"
                    >
                      <FaGithub size={14} />
                    </a>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-ctp-text font-mono">{project.title}</h3>

                  {/* Description */}
                  <p className="text-xs text-ctp-subtext0 leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((tech) => {
                      const TechIcon = tech.icon;
                      return (
                        <span 
                          key={tech.name}
                          className="inline-flex items-center px-2 py-1 rounded bg-ctp-surface0 border border-ctp-surface1 text-[10px] font-mono"
                        >
                          <div className={`mr-1 ${tech.color}`}>
                            <TechIcon size={10} />
                          </div>
                          <span className="text-ctp-text">{tech.name}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ctp-teal hover:bg-ctp-teal/90 text-ctp-base font-mono font-semibold text-[10px] rounded transition-all mt-2"
                  >
                    <span>View Project</span>
                    <FaExternalLinkAlt size={8} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}