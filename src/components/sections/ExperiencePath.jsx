import { ArrowDownRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';

/* Where each piece of work lives on the page. kind sets the button label. */
const linkLabel = {
  case: 'Selected work',
  production: 'Production engineering',
  project: 'Project',
  cmu: 'CMU coursework',
};

const stages = [
  {
    id: 'stage-embedded',
    title: 'Embedded Control',
    where: 'NYCU · FARobot',
    items: [
      { t: 'Coordinating 13 moving components', d: 'Queue-based resource ownership and mutexes for a multi-shuttle warehouse — my first fleet-coordination problem.', href: '#project-asrs', kind: 'project' },
      { t: 'AMR control stack', d: 'STM32 firmware, wheel kinematics and UART bridging ROS navigation to real-time motor control.', href: '#project-amr', kind: 'project' },
      { t: 'Low-level control for an autonomous pallet jack', d: 'STM32 over CAN bus for motors, battery management and pump controller; ROS2 ↔ STM32 interface.', href: '#prod-pallet', kind: 'production' },
      { t: 'Motor driver reliability, <20% → 100%', d: 'Traced intermittent stepper failures to the driver’s optocoupler input stage; new driver and grounding.', href: '#project-asrs', kind: 'project' },
      { t: 'Vendor-independent motor QC', d: 'Rise time, settling time and steady-state error instead of “behaves like the old motor”.', href: '#prod-motor-qc', kind: 'production' },
    ],
  },
  {
    id: 'stage-estimation',
    title: 'State Estimation',
    where: 'FARobot',
    items: [
      { t: 'EKF stability during high-speed stops, 45.16% → 74.19%', d: 'Found the filter ignored IMU acceleration; re-weighted measurements over the odometry model.', href: '#prod-ekf', kind: 'production' },
      { t: 'Containerized LiDAR & IMU drivers, 30% faster setup', d: 'Reproducible sensor inputs across robot platforms with Docker.', href: '#prod-drivers', kind: 'production' },
    ],
  },
  {
    id: 'stage-slam',
    title: 'SLAM & Localization',
    where: 'FARobot',
    items: [
      { t: 'Simulation-first validation for large-scale SLAM', d: 'Cartographer on 200 m × 200 m sites; Unity screening before two-hour physical runs.', href: '#case-slam', kind: 'case' },
      { t: 'Localization recovery pipeline', d: 'AprilTag-to-URDF pose re-initializes navigation after tracking loss, from a browser or a PLC.', href: '#prod-recovery', kind: 'production' },
    ],
  },
  {
    id: 'stage-perception',
    title: '3D Perception',
    where: 'FARobot',
    items: [
      { t: '3D perception for autonomous navigation', d: 'Depth camera into the Nav2 costmap; lifted a 16-voxel source-level ceiling for 2× vertical coverage.', href: '#case-perception', kind: 'case' },
      { t: 'Automated camera-to-robot extrinsic calibration', d: '12-tag fixture and SVD estimation; sub-mm precision, >50% shorter cycle time.', href: '#case-calibration', kind: 'case' },
    ],
  },
  {
    id: 'stage-fleet',
    title: 'Fleet Architecture',
    where: 'FARobot',
    items: [
      { t: 'Unified architecture for heterogeneous robot fleets', d: 'One robot contract across platforms; TPS map registration chosen with a route-weighted metric, 44.2% lower error.', href: '#case-fleet', kind: 'case' },
    ],
  },
  {
    id: 'stage-learning',
    title: '3D Vision & Robot Learning',
    where: 'Carnegie Mellon University',
    now: true,
    items: [
      { t: 'Single-view 3D reconstruction', d: 'Voxel, point-cloud and mesh prediction from one image in PyTorch3D; point clouds best at F1 73.0, a Chamfer-weighting ablation on precision vs. recall.', href: '#cmu-3d', kind: 'cmu' },
      { t: 'Vision and neural networks from first principles', d: 'HOG features from scratch (29.5% → 42.3% over raw pixels) and a NumPy network, autoencoder and VAE.', href: '#cmu-cv', kind: 'cmu' },
      { t: 'Imitation and reinforcement learning', d: 'DAgger lifts Hopper from 24% of expert under behavior cloning to expert level; policy gradients with GAE.', href: '#cmu-rl', kind: 'cmu' },
    ],
  },
];

/* Which stack layers each period touched — chips link down to the matching stage. */
const timeline = [
  { org: 'Carnegie Mellon University', role: 'M.S. Computer Vision', when: 'Aug 2026 — Dec 2027', now: true, stages: ['stage-learning'] },
  { org: 'FARobot, Inc.', role: 'R&D Senior Software Engineer', when: 'Apr 2025 — Jun 2026', stages: ['stage-fleet', 'stage-perception', 'stage-slam'] },
  { org: 'FARobot, Inc.', role: 'R&D Software Engineer', when: 'Dec 2022 — Apr 2025', stages: ['stage-slam', 'stage-estimation', 'stage-embedded'] },
  { org: 'NYCU', role: 'B.S. ME · Double Major EE', when: '2018 — 2022', stages: ['stage-embedded'] },
];

const numbered = stages.map((st, i) => ({ ...st, num: String(i + 1).padStart(2, '0') }));
const stageById = Object.fromEntries(numbered.map((st) => [st.id, st]));
const ordered = [...numbered].reverse();

export default function ExperiencePath() {
  return (
    <section id="path" aria-labelledby="path-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <Reveal as="h2" id="path-title" className="display-md">
          Experience Path
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-3 max-w-2xl text-[1.05rem] text-mute">
          Six layers of the robotics stack I’ve worked in, newest at the top. Read down for where I am now, up for how I
          got here. Every item links to where the work is described.
        </Reveal>

        <Reveal as="ol" delay={0.08} className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" aria-label="Timeline">
          {timeline.map((r) => (
            <li key={r.role} className="flex flex-col bg-paper px-5 py-4">
              <p className={`font-mono text-[0.75rem] ${r.now ? 'text-accent' : 'text-faint'}`}>{r.when}</p>
              <p className="mt-1 text-[0.95rem] font-semibold text-ink">{r.org}</p>
              <p className="text-[0.86rem] text-mute">{r.role}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5 pt-3" aria-label={`Stack layers during ${r.role}`}>
                {r.stages.map((id) => {
                  const st = stageById[id];
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.74rem] font-medium transition-colors ${
                          st.now ? 'border-accent/30 bg-accent/[0.06] text-accent hover:border-accent/60' : 'border-line bg-white text-ink/80 hover:border-ink/30'
                        }`}
                      >
                        <span className="font-mono text-[0.68rem] opacity-60">{st.num}</span>
                        {st.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </Reveal>

        <ol className="mt-14" aria-label="Stack layers, newest first">
          {ordered.map((s) => (
            <li key={s.title} id={s.id} className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-5">
                <div>
                  <span className={`font-mono text-sm ${s.now ? 'text-accent' : 'text-faint'}`}>
                    {s.num}
                    {s.now && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-white">Now</span>}
                  </span>
                  <h3 className={`mt-1 text-[clamp(1.9rem,3.6vw,1.9rem)] font-semibold leading-[1.05] tracking-tightest ${s.now ? 'text-accent' : 'text-ink'}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] text-faint">{s.where}</p>
                </div>
              </Reveal>
              <ul className="space-y-3 lg:col-span-7">
                {s.items.map((it, j) => (
                  <Reveal as="li" key={it.t} delay={j * 0.05}>
                    <a
                      href={it.href}
                      className="group flex flex-col gap-3 rounded-[16px] sm:flex-row sm:items-start sm:justify-between sm:gap-4 border border-line bg-paper px-5 py-4 transition-colors hover:border-ink/25 hover:bg-white"
                    >
                      <span>
                        <span className="block text-[1rem] font-semibold leading-snug text-ink">{it.t}</span>
                        <span className="mt-1 block text-[0.9rem] leading-relaxed text-mute">{it.d}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center self-start sm:mt-0.5 gap-1 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1 text-[0.76rem] font-medium text-accent group-hover:border-accent/40">
                        {linkLabel[it.kind]}
                        <ArrowDownRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
