import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { TerminalPrompt } from '../Terminal/TerminalPrompt';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: 'Node.js', level: 75, category: 'Backend' },
  { name: 'Express.js', level: 70, category: 'Backend' },
  { name: 'MongoDB', level: 68, category: 'Database' },
  { name: 'REST APIs', level: 72, category: 'API' },
  { name: 'React', level: 65, category: 'Frontend' },
  { name: 'JavaScript', level: 80, category: 'Frontend' },
  { name: 'HTML/CSS', level: 85, category: 'Frontend' },
  { name: 'Git', level: 75, category: 'Tools' },
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(skill.level), 200);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02, x: 5 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-terminal-text font-semibold"
        >
          {skill.name}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-terminal-green text-sm font-bold"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-terminal-card rounded-full overflow-hidden border border-terminal-text-secondary/20 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-terminal-green to-terminal-success relative"
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-white/20"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="py-20 px-4 bg-terminal-card/30 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalWindow title="skills">
              <TerminalPrompt command="ls -la skills/" />
              <div className="mt-4 space-y-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-terminal-success"
                  >
                    -rw-r--r-- {skill.level}% {skill.name}
                  </motion.div>
                ))}
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Skills List with Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {categories.map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.2 }}
                className="space-y-4"
              >
                <motion.h3
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="text-xl font-semibold text-terminal-green"
                >
                  {category}
                </motion.h3>
                <div className="space-y-4">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, index) => (
                      <SkillBar key={`${category}-${index}`} skill={skill} />
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

