import { motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import FlowDiagram from '../ui/FlowDiagram.jsx';
import CaseIntro from '../ui/CaseIntro.jsx';
import Disclosure from '../ui/Disclosure.jsx';
import ReasoningPath from '../ui/ReasoningPath.jsx';
import SolutionArc from '../ui/SolutionArc.jsx';
import Tradeoffs from '../ui/Tradeoffs.jsx';
import { ease } from '../ui/Reveal.jsx';

/* Stylized fiducial (generic pattern — not a real tag ID). */
function Tag({ seed, size = 36 }) {
  const bits = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < 16; i += 1) {
    s = (s * 9301 + 49297) % 233280;
    bits.push(s / 233280 > 0.5);
  }
  return (
    <svg viewBox="0 0 8 8" width={size} height={size} aria-hidden="true" className="block">
      <rect width="8" height="8" fill="#1D1D1F" rx="0.3" />
      <rect x="1" y="1" width="6" height="6" fill="#FFFFFF" />
      <rect x="1.5" y="1.5" width="5" height="5" fill="#1D1D1F" />
      {bits.map((b, i) =>
        b ? <rect key={i} x={2 + (i % 4)} y={2 + Math.floor(i / 4)} width="1" height="1" fill="#FFFFFF" /> : null,
      )}
    </svg>
  );
}

function TagLayouts() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <figure className="rounded-[24px] border border-line bg-white/60 p-6">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[18rem]" aria-hidden="true">
          {[
            [10, 14],
            [72, 22],
            [40, 70],
          ].map(([x, y], i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ x: [0, 1.5, -1, 0], y: [0, -1, 1.5, 0] }}
              transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Tag seed={i + 3} />
            </motion.div>
          ))}
        </div>
        <figcaption className="mt-4">
          <span className="block font-semibold text-ink">3 AprilTags</span>
          <span className="block text-[0.92rem] text-mute">Mathematically sufficient. Not production reliable.</span>
        </figcaption>
      </figure>
      <figure className="rounded-[24px] border border-accent/30 bg-white p-6 shadow-soft">
        <div className="mx-auto grid aspect-[4/3] w-full max-w-[18rem] grid-cols-4 place-items-center gap-2" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease, delay: i * 0.04 }}
            >
              <Tag seed={i + 11} size={32} />
            </motion.div>
          ))}
        </div>
        <figcaption className="mt-4">
          <span className="block font-semibold text-accent">12-tag fixture</span>
          <span className="block text-[0.92rem] text-ink">Redundant measurements by design.</span>
        </figcaption>
      </figure>
    </div>
  );
}

const pipeline = [
  { label: '12-tag fixture', sub: 'redundant measurements' },
  { label: 'Multiple orientation estimates' },
  { label: 'SVD', sub: 'rigid-body solve', tone: 'accent' },
  { label: 'URDF transform update' },
  { label: 'Automated production workflow', tone: 'ink' },
];

const path = [
  {
    kind: 'tried',
    title: 'Three AprilTags — the geometric minimum to define a 3D pose',
  },
  {
    kind: 'limit',
    title: 'Results fluctuated run to run',
    detail: 'Lighting changes, camera noise and per-detection error moved the estimate enough that the same robot calibrated differently at different times.',
  },
  {
    kind: 'tried',
    title: 'Tuned image filtering, tag placement and detector parameters; studied the error distribution',
    detail: 'Better, but a three-point model stayed highly sensitive to random noise.',
  },
  {
    kind: 'insight',
    title: 'The bottleneck was the measurement design, not the detector: too few geometric constraints and no statistical redundancy.',
  },
  {
    kind: 'decision',
    title: 'Designed a 3×4 fixture of 12 tags and estimated orientation from many L-shaped tag subsets of different sizes',
    detail: 'Each subset yields its own rotation estimate; SVD extracts the principal component as a statistically averaged rotation, suppressing random error.',
  },
  {
    kind: 'decision',
    title: 'Made it a workflow, not a script',
    detail: 'The solved transform is written straight into the robot’s URDF; a backend with a REST API lets anyone trigger calibration from a web page.',
  },
  {
    kind: 'validated',
    title: 'Repeated calibrations of the same robot at different times produced consistent, sub-millimeter results',
    detail: 'Production calibration cycle time dropped by more than 50% and manual measurement error was removed.',
  },
];

const arc = [
  { label: 'Started with', text: 'Three AprilTags — the geometric minimum for a 3D pose.' },
  { label: 'Where it broke', text: 'The same robot calibrated differently run to run. Filtering, placement and detector tuning helped only a little.' },
  { label: 'Turning point', text: 'The problem was the measurement design, not the detector: too few geometric constraints and no statistical redundancy.', focus: true },
  { label: 'What shipped', text: 'A 12-tag fixture, SVD-averaged rotation, automatic URDF update and a REST-triggered workflow — sub-mm precision, >50% shorter cycle time.' },
];

export default function CalibrationCaseStudy() {
  return (
    <article id="case-calibration" aria-labelledby="cs3-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <CaseIntro
          num="03"
          category="Calibration & production"
          titleId="cs3-title"
          title="Automated Camera-to-Robot Extrinsic Calibration"
          subtitle="Turning AprilTag-based geometric calibration into a repeatable production workflow using redundant measurements and rigid-body estimation."
          media={<TagLayouts />}
          metrics={[
            { value: 'Sub-mm', label: 'calibration precision, consistent across repeated runs' },
            { value: '>50%', label: 'lower production calibration cycle time' },
          ]}
          context="Camera-to-base extrinsics for production robots, previously measured by hand — error that accumulated into high-precision positioning tasks."
          role="I designed the fixture layout and estimation method, implemented the SVD solve and URDF update, and built the REST-triggered workflow used by the team."
          tags={['Python', 'OpenCV', 'AprilTag', 'SVD', 'URDF', 'REST API']}
        />

        <div className="mt-16">
          <FlowDiagram steps={pipeline} ariaLabel="Calibration pipeline: 12-tag fixture, multiple orientation estimates, SVD, URDF transform update, automated production workflow" />
        </div>

        <div className="mt-16">
          <SolutionArc beats={arc} />
        </div>

        <div className="mt-16">
          <Tradeoffs
            rows={[
              {
                choice: 'More tags, redundant estimates',
                gain: 'Robust to noise and lighting',
                cost: 'More complex fixture and estimation logic',
                resolution: 'Fixed fixture + automated pipeline hide the complexity from operators',
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <Disclosure label="Engineering deep-dive" hint="full investigation log">
            <ReasoningPath log steps={path} />
          </Disclosure>
        </div>
      </Container>
    </article>
  );
}
