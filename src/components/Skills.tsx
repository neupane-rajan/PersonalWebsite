import { motion } from 'framer-motion'
import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiLinux,
  SiGnubash,
  SiNumpy,
  SiPandas,
} from 'react-icons/si'

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Vue', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Django', icon: SiDjango, color: '#092E20' },
      { name: 'Flask', icon: SiFlask, color: '#000000' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
    ],
  },
  {
    name: 'Python',
    skills: [
      { name: 'NumPy', icon: SiNumpy, color: '#013243' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
    ],
  },
]

export default function Skills() {
  return (
    <div className="space-y-12">
      {skillCategories.map((category) => (
        <div key={category.name}>
          <h3 className="text-2xl font-bold mb-6 dark:text-white">{category.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 rounded-lg glass-effect shadow-md hover:shadow-lg transition-shadow"
              >
                <skill.icon
                  className="w-12 h-12 mb-2"
                  style={{ color: skill.color }}
                />
                <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 