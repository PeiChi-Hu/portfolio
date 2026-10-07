import { Mail } from 'lucide-react';
import { site } from '../../data/site.js';
import Container from '../ui/Container.jsx';
import CTAButton from '../ui/CTAButton.jsx';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function FooterCTA() {
  return (
    <footer aria-labelledby="cta-title" className="border-t border-line bg-white">
      <Container className="py-20 sm:py-28">
        <Reveal as="h2" id="cta-title" className="display-md max-w-[22ch] text-balance">
        Let’s build robust autonomy from simulation to the real world.
        </Reveal>
        <Reveal as="p" delay={0.08} className="mt-4 max-w-2xl text-[1.05rem] text-mute">
          Interested in robotics, autonomous systems, perception, computer vision, simulation and software engineering opportunities
          for 2027.
        </Reveal>
        <Reveal delay={0.14} className="mt-8 flex flex-wrap gap-3">
          <CTAButton href={`mailto:${site.email}`} icon={<Mail aria-hidden="true" className="h-4 w-4" />}>
            Email Me
          </CTAButton>
          <CTAButton href={site.resume} external variant="secondary">
            View Resume
          </CTAButton>
          <CTAButton href={site.linkedin} external variant="secondary" icon={<LinkedInIcon className="h-4 w-4" />}>
            LinkedIn
          </CTAButton>
          <CTAButton href={site.github} external variant="secondary" icon={<GitHubIcon className="h-4 w-4" />}>
            GitHub
          </CTAButton>
        </Reveal>
        <p className="mt-8 font-mono text-[0.85rem] text-faint">{site.email}</p>
      </Container>
      <Container>
        <div className="flex flex-col gap-2 border-t border-line py-8 text-[0.82rem] text-faint sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Pei-Chi Hu</p>
          <p>FARobot diagrams are simplified, conceptual illustrations and contain no proprietary detail.</p>
        </div>
      </Container>
    </footer>
  );
}
