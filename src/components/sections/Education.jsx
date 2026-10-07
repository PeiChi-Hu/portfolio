import Container from '../ui/Container.jsx';
import FlowDiagram from '../ui/FlowDiagram.jsx';
import Reveal from '../ui/Reveal.jsx';
import { TagList } from '../ui/TechTag.jsx';

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <Reveal as="h2" id="edu-title" className="display-md">
          Education
        </Reveal>

        <Reveal className="mt-12 grid gap-8 border-t border-line pt-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-[1.25rem] font-semibold text-ink">Carnegie Mellon University</h3>
            <p className="mt-1 text-[0.95rem] text-mute">M.S. in Computer Vision</p>
            <p className="mt-1 font-mono text-[0.82rem] text-faint">Aug 2026 — Dec 2027 · Pittsburgh, PA</p>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-mute">
              Coursework: Advanced Computer Vision · Learning for 3D · Intro to Robot Learning
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            <div id="cmu-3d" className="rounded-[20px] border border-line bg-paper p-5 sm:p-6">
              <p className="eyebrow text-accent">Learning for 3D</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/85">
                Single-view 3D reconstruction with neural implicit decoders.
              </p>
              <FlowDiagram
                className="mt-4"
                direction="vertical"
                compact
                steps={[
                  { label: 'Single view' },
                  { label: 'Neural implicit representation', tone: 'accent' },
                  { label: 'Continuous 3D occupancy' },
                ]}
                ariaLabel="Single view to neural implicit representation to continuous 3D occupancy"
              />
              <TagList className="mt-4" tone="quiet" items={['PyTorch', 'PyTorch3D']} />
            </div>
            <div id="cmu-rl" className="rounded-[20px] border border-line bg-paper p-5 sm:p-6">
              <p className="eyebrow text-accent">Robot learning</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/85">
                Training and evaluating neural control policies in simulation. Built a DAgger pipeline to counter
                distribution shift in continuous control.
              </p>
              <ul className="mt-4 space-y-2 text-[0.9rem] text-ink/85">
                <li className="rounded-lg border border-line bg-white px-3 py-2">Policy gradient · GAE</li>
                <li className="rounded-lg border border-line bg-white px-3 py-2">Imitation learning · DAgger</li>
              </ul>
              <TagList className="mt-4" tone="quiet" items={['PyTorch', 'MuJoCo', 'Gymnasium']} />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-2 border-t border-line pt-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="text-[1.1rem] font-semibold text-ink">National Yang Ming Chiao Tung University</h3>
            <p className="mt-1 text-[0.85rem] text-faint">formerly National Chiao Tung University</p>
          </div>
          
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* 第一行：主修與年份維持左右分開 */}
            <div className="flex justify-between items-start">
              <p className="text-[0.95rem] text-mute">B.S. Mechanical Engineering · Double Major in Electrical Engineering</p>
              <p className="font-mono text-[0.82rem] text-faint">2018 — 2022</p>
            </div>
            
            {/* 第二行：GPA 換到下方 */}
            <p className="mt-1 text-[0.95rem] text-mute">GPA: 3.78</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
