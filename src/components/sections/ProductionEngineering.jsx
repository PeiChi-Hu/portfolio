import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { TagList } from '../ui/TechTag.jsx';

/*
 * FARobot work that isn't a full case study. Each entry is a short engineering brief:
 * the problem, the observation or decision that mattered, and the result.
 */
const briefs = [
  {
    id: 'prod-motor-qc',
    area: 'Validation',
    wide: true,
    title: 'Vendor-Independent Motor Outgoing QC',
    problem:
      'The production-line motor test compared measured velocity against behavior tuned to the previous motor vendor. When a new vendor’s motors arrived, they failed it.',
    insight:
      'Relaxing thresholds would only postpone the problem to the next vendor — the test measured similarity to an old motor, not motor performance.',
    decision:
      'I redefined the test around control-system response metrics, implemented as an automated analysis:',
    points: [
      'Rise / fall time from the 10%–90% crossings of command vs. feedback velocity.',
      'Settling time with a tolerance band proportional to target speed plus an absolute floor, confirmed by a look-ahead window so overshoot and ringing are caught.',
      'Steady-state error as the 95th percentile, so a single sensor outlier can’t fail a good motor.',
    ],
    outcome: 'Catches overshoot and ringing the old test missed; motors from two vendors are now validated against their own specs, and the next vendor needs no new test.',
    tags: ['Control theory', 'System response', 'Python', 'ROS2'],
  },
  {
    id: 'prod-ekf',
    area: 'State estimation',
    title: 'EKF Tuning for High-Speed Stops',
    problem: 'Hard stops at high speed made the robot’s localization drift from inertia.',
    decision:
      'I traced the EKF’s state-transition and measurement-update model (wheel odometry + IMU) and found IMU acceleration was not being used. I enabled it and re-weighted the filter to trust high-fidelity measurements over the odometry prediction.',
    result: '45.16% → 74.19%',
    resultLabel: 'stop-phase localization stability',
    tags: ['EKF', 'Sensor fusion', 'IMU', 'ROS2'],
  },
  {
    id: 'prod-recovery',
    area: 'Localization',
    title: 'Localization Recovery Pipeline',
    problem: 'After tracking loss, the navigation stack needed manual re-initialization on the floor.',
    decision:
      'I computed the robot pose from an AprilTag through the URDF transform chain and used it to re-initialize navigation, exposed through a REST API and integrated with the line PLC.',
    outcome: 'Navigation re-initializes immediately after tracking loss, triggered from a browser or by the PLC.',
    tags: ['AprilTag', 'URDF / TF', 'REST API', 'PLC'],
  },
  {
    id: 'prod-pallet',
    area: 'Embedded control',
    title: 'Low-Level Control for an Autonomous Pallet Jack',
    problem: 'A new vehicle needed ROS2-level commands to reach its motors, battery management system and pump controller.',
    decision:
      'I developed STM32 firmware communicating over CAN bus with the motor, BMS and pump controllers, and designed the ROS2 ↔ STM32 communication architecture.',
    outcome: 'Upper-level ROS2 commands reach motors, BMS and pump through one firmware layer.',
    tags: ['STM32', 'CAN bus', 'Embedded C', 'ROS2'],
  },
  {
    id: 'prod-drivers',
    area: 'Infrastructure',
    title: 'Containerized Sensor Drivers',
    problem: 'Multi-brand LiDAR and IMU drivers made robot setup slow and environment-dependent.',
    decision: 'I packaged the drivers as Docker images on Linux so each platform gets the same, reproducible sensor stack.',
    result: '30%',
    resultLabel: 'faster deployment',
    tags: ['Docker', 'Linux', 'LiDAR', 'IMU', 'ROS2'],
  },
];

function Brief({ b }) {
  return (
    <Reveal
      as="article"
      id={b.id}
      aria-labelledby={`${b.id}-title`}
      className={`flex flex-col rounded-[22px] border border-line bg-white p-6 sm:p-7 ${b.wide ? 'md:col-span-2' : ''}`}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">{b.area}</p>
          <h3 id={`${b.id}-title`} className="mt-2 text-[1.2rem] font-semibold leading-snug tracking-tight text-ink">
            {b.title}
          </h3>
        </div>
        {b.result && (
          <div className="shrink-0 text-right">
            <p className="text-[1.45rem] font-semibold leading-none tracking-tight text-ink tabular-nums">{b.result}</p>
            <p className="mt-1 max-w-[11rem] text-[0.76rem] leading-snug text-mute">{b.resultLabel}</p>
          </div>
        )}
      </div>

      <div className={`mt-5 grid gap-4 ${b.wide ? 'md:grid-cols-2 md:gap-8' : ''}`}>
        <div className="space-y-3">
          <p className="text-[0.93rem] leading-relaxed text-mute">{b.problem}</p>
          {b.insight && (
            <p className="rounded-xl bg-accent/[0.06] px-4 py-3 text-[0.93rem] font-medium leading-relaxed text-ink">{b.insight}</p>
          )}
        </div>
        <div>
          <p className="text-[0.93rem] leading-relaxed text-ink/90">{b.decision}</p>
          {b.points && (
            <ul className="mt-3 space-y-2">
              {b.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[0.9rem] leading-relaxed text-mute">
                  <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {b.outcome && (
        <p className="mt-5 border-t border-line pt-4 text-[0.92rem] leading-relaxed text-ink">
          <span className="mr-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-emerald-700">Outcome</span>
          {b.outcome}
        </p>
      )}
      <TagList className="mt-auto pt-5" tone="quiet" items={b.tags} />
    </Reveal>
  );
}

export default function ProductionEngineering() {
  return (
    <section id="production" aria-labelledby="production-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal as="p" className="eyebrow mb-3">
              More from FARobot
            </Reveal>
            <Reveal as="h2" id="production-title" className="display-md">
              Production Engineering
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-3 max-w-2xl text-[1.05rem] text-mute">
              Shorter problems from production robots — each solved by finding what the system was actually doing.
            </Reveal>
          </div>
          <Reveal delay={0.08} className="text-[0.88rem] text-mute md:text-right">
            <p className="font-semibold text-ink">FARobot, Inc. · Foxconn × ADLINK JV</p>
            <p>R&amp;D Software Engineer → Senior · Dec 2022 — Jun 2026</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {briefs.map((b) => (
            <Brief key={b.id} b={b} />
          ))}
        </div>
      </Container>
    </section>
  );
}
