import CalibrationCaseStudy from './CalibrationCaseStudy.jsx';
import FleetArchitectureCaseStudy from './FleetArchitectureCaseStudy.jsx';
import PerceptionCaseStudy from './PerceptionCaseStudy.jsx';
import SlamCaseStudy from './SlamCaseStudy.jsx';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="pt-20 sm:pt-28">
      <Container>
        <Reveal as="h2" id="work-title" className="display-md">
          Selected work
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-3 max-w-2xl text-[1.05rem] text-mute">
          Four production problems from FARobot. Each opens with the system, my role and the result, then shows how the
          solution evolved — and the turning point that changed it. Full investigation logs are one click deeper.
          Diagrams are simplified and generic, with no proprietary code or internal names.
        </Reveal>
        <nav aria-label="Case studies" className="mt-8 flex flex-wrap gap-2 pb-14 sm:pb-16">
          {[
            ['#case-fleet', '01 · Heterogeneous fleet architecture'],
            ['#case-perception', '02 · 3D perception for navigation'],
            ['#case-calibration', '03 · Extrinsic calibration'],
            ['#case-slam', '04 · Large-scale SLAM validation'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-line bg-white px-4 py-2 text-[0.88rem] text-ink transition-colors hover:border-ink/30">
              {label}
            </a>
          ))}
        </nav>
      </Container>
      <FleetArchitectureCaseStudy />
      <PerceptionCaseStudy />
      <CalibrationCaseStudy />
      <SlamCaseStudy />
    </section>
  );
}
