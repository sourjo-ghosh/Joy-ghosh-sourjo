import { motion } from 'framer-motion';
import { TypingEffect } from '../Terminal/TypingEffect';
import { TerminalPrompt } from '../Terminal/TerminalPrompt';

export const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Animated Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-terminal-green/30 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * 100 + '%'],
            x: [null, Math.random() * 100 + '%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <TerminalPrompt command="whoami" />
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-terminal-text"
            >
              <TypingEffect text="Joy Ghosh Sourjo" speed={100} className="text-terminal-green" />
            </motion.h1>
          </div>

          <div className="space-y-2">
            <TerminalPrompt command="cat about.txt" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl text-terminal-text-secondary leading-relaxed"
            >
              <TypingEffect 
                text="Aspiring Software Engineer | Learning MERN Stack | Building the Future" 
                speed={30}
                className="text-terminal-text"
              />
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#contact"
              className="px-6 py-3 bg-terminal-green text-terminal-bg font-semibold rounded hover:bg-terminal-success transition-all hover:scale-105 glow-green"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border-2 border-terminal-green text-terminal-green rounded hover:bg-terminal-green/10 transition-all hover:scale-105"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 0, 0.3)',
                  '0 0 40px rgba(0, 255, 136, 0.5)',
                  '0 0 60px rgba(0, 255, 0, 0.4)',
                  '0 0 40px rgba(0, 255, 136, 0.5)',
                  '0 0 20px rgba(0, 255, 0, 0.3)',
                ],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-terminal-green relative"
            >
              <motion.img
                src="/profile.jpg"
                alt="Joy Ghosh Sourjo"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-br from-terminal-green/30 to-terminal-success/30"
              />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-24 h-24 border-4 border-terminal-green/30 border-t-terminal-green rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-terminal-success/30 border-t-terminal-success rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-8 -right-8 w-32 h-32 border-2 border-terminal-green/20 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-terminal-text-secondary"
        >
          <span className="block text-center mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-terminal-text-secondary rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-terminal-green rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

