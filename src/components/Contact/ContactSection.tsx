import { motion } from 'framer-motion';
import { useState } from 'react';
import { TerminalWindow } from '../Terminal/TerminalWindow';
import { TerminalPrompt } from '../Terminal/TerminalPrompt';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/sourjo-ghosh', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/joyghoshsourjo/', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://x.com/Joy_Ghoshsourjo', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:joyg03426@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-terminal-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <TerminalWindow title="contact">
              <TerminalPrompt command="cat contact.txt" />
              <div className="mt-4 space-y-4 text-terminal-text-secondary">
                <p>
                  I'm always open to discussing new projects, creative ideas, or opportunities
                  to be part of your visions.
                </p>
                <div className="space-y-2 pt-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <FaEnvelope className="text-terminal-green" />
                    <a href="mailto:joyg03426@gmail.com" className="hover:text-terminal-green transition-colors">
                      joyg03426@gmail.com
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-terminal-green">📍</span>
                    <span>Dhaka, Bangladesh</span>
                  </motion.div>
                </div>
              </div>
            </TerminalWindow>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-xl font-semibold text-terminal-green"
              >
                Connect with me
              </motion.h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, -10, 0],
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 flex items-center justify-center bg-terminal-card border border-terminal-text-secondary/20 rounded-lg text-terminal-green hover:border-terminal-green hover:bg-terminal-green/10 transition-all"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalWindow title="mail">
              <TerminalPrompt command="mail -s 'Contact'" />
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-terminal-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text-secondary/20 rounded text-terminal-text focus:outline-none focus:border-terminal-green transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-terminal-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text-secondary/20 rounded text-terminal-text focus:outline-none focus:border-terminal-green transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-terminal-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text-secondary/20 rounded text-terminal-text focus:outline-none focus:border-terminal-green transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-terminal-green text-terminal-bg font-semibold rounded hover:bg-terminal-success transition-all glow-green disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

