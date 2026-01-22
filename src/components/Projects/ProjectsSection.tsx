import { motion } from 'framer-motion';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { TerminalPrompt } from '../Terminal/TerminalPrompt';
import { SnakeGame } from './SnakeGame';
import { Project } from '../../types';

const projects: Project[] = [
  {
    title: 'Snake Game',
    description: 'Interactive Snake game built with React and Canvas API. Play directly in your browser!',
    technologies: ['React', 'TypeScript', 'Canvas API'],
    isGame: true,
  },
  {
    title: 'E-Commerce API',
    description: 'RESTful API for e-commerce platform with Node.js, Express, and PostgreSQL',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    github: 'https://github.com',
  },
  {
    title: 'Task Management System',
    description: 'Backend API for collaborative task management with real-time updates',
    technologies: ['Python', 'Django', 'WebSocket', 'Redis'],
    github: 'https://github.com',
  },
  {
    title: 'Microservices Architecture',
    description: 'Scalable microservices system with Docker and Kubernetes',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'AWS'],
    github: 'https://github.com',
  },
];

export const ProjectsSection = () => {

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Featured Projects
        </motion.h2>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <TerminalWindow title="projects">
            <TerminalPrompt command="git log --oneline" />
            <div className="mt-4 space-y-2">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-terminal-success cursor-pointer hover:text-terminal-green transition-colors"
                >
                  {project.isGame ? '🎮' : '📦'} {project.title}
                </motion.div>
              ))}
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5, boxShadow: '0 10px 30px rgba(0, 255, 0, 0.2)' }}
              className="bg-terminal-card p-6 rounded-lg border border-terminal-text-secondary/20 hover:border-terminal-green/50 transition-all"
            >
              {project.isGame ? (
                <SnakeGame />
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-terminal-green mb-2">{project.title}</h3>
                  <p className="text-terminal-text-secondary mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-terminal-bg text-terminal-success text-sm rounded border border-terminal-text-secondary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-green hover:text-terminal-success transition-colors"
                      >
                        View on GitHub →
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-green hover:text-terminal-success transition-colors"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

