import { MotionConfig } from 'framer-motion';
import Coursework from './components/sections/Coursework.jsx';
import Education from './components/sections/Education.jsx';
import ExperiencePath from './components/sections/ExperiencePath.jsx';
import FooterCTA from './components/sections/FooterCTA.jsx';
import Hero from './components/sections/Hero.jsx';
import Navbar from './components/sections/Navbar.jsx';
import ProductionEngineering from './components/sections/ProductionEngineering.jsx';
import Projects from './components/sections/Projects.jsx';
import RoboticsStack from './components/sections/RoboticsStack.jsx';
import Work from './components/sections/Work.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ExperiencePath />
        <Work />
        <ProductionEngineering />
        <Coursework />
        <Projects />
        <RoboticsStack />
        <Education />
      </main>
      <FooterCTA />
    </MotionConfig>
  );
}
