import { Navbar } from './components/Navigation/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { ContactSection } from './components/Contact/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-terminal-bg">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="py-8 px-4 text-center text-terminal-text-secondary border-t border-terminal-text-secondary/20">
        <p>&copy; 2025 Joy Ghosh Sourjo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

