import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { TerminalPrompt } from '../Terminal/TerminalPrompt';

interface Stat {
  value: number;
  label: string;
}

const stats: Stat[] = [
  { value: 5, label: 'GitHub Repos' },
  { value: 500, label: 'Code Commits' },
  { value: 1000, label: 'Lines of Code' },
];

const AnimatedCounter = ({ value, label }: Stat) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      className="bg-terminal-card p-6 rounded-lg border border-terminal-text-secondary/20 text-center"
    >
      <div className="text-4xl font-bold text-terminal-green mb-2">{count}+</div>
      <div className="text-terminal-text-secondary">{label}</div>
    </motion.div>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Terminal Window with Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalWindow title="about.txt">
              <TerminalPrompt command="cat about.txt" />
              <div className="mt-4 space-y-4 text-terminal-text-secondary leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  My goal is to become a <span className="text-terminal-green font-semibold">Software Engineer by 2030</span>. 
                  I've chosen web development as my entry point into the world of software engineering, 
                  and I'm currently diving deep into the <span className="text-terminal-success font-semibold">MERN stack</span> 
                  (MongoDB, Express.js, React, Node.js).
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Every day, I'm building projects, solving problems, and pushing my boundaries. 
                  I believe in learning by doing, and I'm passionate about creating solutions that matter. 
                  The journey from learning to engineering is challenging, but I'm committed to the process.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <TerminalPrompt command="ls -la skills/" />
                  <div className="mt-2 space-y-1 text-terminal-success">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >• MERN Stack (Learning)</motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                    >• Node.js & Express</motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 }}
                    >• MongoDB & Database Design</motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1 }}
                    >• REST APIs & Backend Logic</motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 }}
                    >• Git & Version Control</motion.div>
                  </div>
                </motion.div>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-full max-w-md rounded-lg overflow-hidden border border-terminal-green/30 glow-green relative"
          >
            <motion.img
              src="/profile.jpg"
              alt="About"
              className="w-full h-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-br from-terminal-green/20 to-terminal-success/20 pointer-events-none"
            />
          </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`stat-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

