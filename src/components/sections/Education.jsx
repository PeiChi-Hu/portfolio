import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';

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
          <div className="lg:col-span-8 lg:flex lg:items-start lg:justify-between lg:gap-8">
            <p className="text-[0.95rem] leading-relaxed text-mute">
              Graduate coursework in 3D vision, computer vision and robot learning — assignments, results and findings are
              in <a href="#coursework" className="font-medium text-accent hover:underline">CMU Coursework</a>.
            </p>
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
