import { motion } from 'framer-motion';
import CaseIntro from '../ui/CaseIntro.jsx';
import Container from '../ui/Container.jsx';
import Panel from '../ui/Panel.jsx';
import Disclosure from '../ui/Disclosure.jsx';
import ReasoningPath from '../ui/ReasoningPath.jsx';
import SolutionArc from '../ui/SolutionArc.jsx';
import { ease } from '../ui/Reveal.jsx';
import Tradeoffs from '../ui/Tradeoffs.jsx';

/* Simulation-first funnel: many candidates screened cheaply, few confirmed on hardware. */
const stages = [
  { label: 'Candidate Cartographer configurations', w: 100, tone: 'bg-mist text-ink' },
  { label: 'Unity simulation screening', sub: 'cheap, fast iteration', w: 82, tone: 'bg-accent/10 text-accent' },
  { label: 'Shortlist', w: 58, tone: 'bg-mist text-ink' },
  { label: 'Physical robot runs', sub: '~2 h per mapping run', w: 42, tone: 'bg-ink text-white' },
  { label: 'Adopted configuration', w: 30, tone: 'bg-emerald-600 text-white' },
];

function SimFunnel() {
  return (
    <Panel label="Workflow — schematic.">
      <ol aria-label="Simulation-first tuning workflow" className="space-y-2">
        {stages.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, scaleX: 0.9 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            className={`mx-auto rounded-xl px-3 py-3 text-center ${s.tone}`}
            style={{ width: `${Math.max(s.w, 46)}%` }}
          >
            <span className="block text-[0.9rem] font-semibold leading-tight">{s.label}</span>
            {s.sub && <span className="block text-[0.75rem] leading-tight opacity-75">{s.sub}</span>}
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}

/* Long feature-sparse corridor: drift accumulates along the corridor without strong constraints. Illustrative only. */
function CorridorDrift() {
  return (
    <svg viewBox="0 0 360 120" className="h-auto w-full" role="img" aria-label="Illustration: in a long, feature-sparse corridor, the mapped trajectory drifts away from the true path; after re-weighting constraints, it stays close.">
      <rect x="6" y="34" width="348" height="52" rx="8" fill="#F3F2EE" stroke="#E6E4DF" />
      <line x1="20" y1="60" x2="340" y2="60" stroke="#1D1D1F" strokeOpacity="0.35" strokeWidth="1.5" />
      <motion.path
        d="M20 60 C 120 60, 200 50, 340 18"
        fill="none" stroke="#B43C0B" strokeWidth="2" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}
      />
      <motion.path
        d="M20 60 C 120 60, 220 58, 340 56"
        fill="none" stroke="#0062C4" strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease, delay: 0.3 }}
      />
      <text x="20" y="108" fontSize="9" fill="#5F5F64">true path</text>
      <text x="92" y="108" fontSize="9" fill="#B43C0B">drift: over-trusted local constraints</text>
      <text x="250" y="108" fontSize="9" fill="#0062C4">after re-weighting</text>
    </svg>
  );
}

const path = [
  {
    kind: 'tried',
    title: 'Introduced Cartographer for 200 m × 200 m sites',
    detail: 'Integrated it alongside the existing Gmapping setup through a ROS2 management node, so each deployment can use the SLAM backend that fits the site.',
  },
  {
    kind: 'limit',
    title: 'Maps drifted in long, feature-sparse corridors',
    detail: 'With few distinctive features, local scan-matching constraints were uncertain — but the pose graph still trusted them.',
  },
  {
    kind: 'limit',
    title: 'Tuning on hardware was too slow to explore',
    detail: 'Each physical mapping run took almost two hours, so trying configurations one by one on the robot did not scale.',
  },
  {
    kind: 'decision',
    title: 'Simulation-first: screen candidates in Unity, take only a shortlist to the robot',
  },
  {
    kind: 'insight',
    title: 'Drift came from how much the optimizer trusted uncertain local constraints, not from missing features alone.',
  },
  {
    kind: 'decision',
    title: 'Re-weighted the pose-graph constraint information to de-emphasize uncertain local constraints',
  },
  {
    kind: 'validated',
    title: 'Confirmed the shortlisted configuration with physical mapping runs before adopting it',
  },
];

const arc = [
  { label: 'Started with', text: 'Cartographer for 200 m × 200 m sites, tuned directly on the robot.' },
  { label: 'Where it broke', text: 'Maps drifted in long, feature-sparse corridors — and each physical mapping run took almost two hours, so exploring configurations on hardware did not scale.' },
  { label: 'Turning point', text: 'Two separate problems: the optimizer over-trusted uncertain local constraints, and iteration cost was the real bottleneck.', focus: true },
  { label: 'What shipped', text: 'Re-weighted graph constraints, screened in Unity simulation first; only the shortlist went to two-hour physical validation runs.' },
];

export default function SlamCaseStudy() {
  return (
    <article id="case-slam" aria-labelledby="cs4-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <CaseIntro
          num="04"
          category="SLAM & validation"
          titleId="cs4-title"
          title="Simulation-First Validation for Large-Scale SLAM"
          subtitle="Using Unity simulation to narrow Cartographer configurations before running two-hour physical robot experiments."
          media={
            <div className="space-y-5">
              <SimFunnel />
              <figure className="rounded-[20px] border border-line bg-white p-5">
                <CorridorDrift />
                <figcaption className="mt-2 text-center text-[0.78rem] text-faint">Illustrative — not measured data.</figcaption>
              </figure>
            </div>
          }
          metrics={[
            { value: '200×200 m', label: 'feature-sparse industrial sites' },
            { value: '~2 h', label: 'per physical mapping run — the cost simulation avoids' },
          ]}
          context="Mapping large, repetitive industrial sites with a production mobile robot, where SLAM quality determines localization quality for every later task."
          role="I led bringing Cartographer into the system, used simulation to screen configurations, re-weighted the graph constraints and validated the result on the physical robot."
          tags={['Cartographer', 'ROS2', 'Unity simulation', 'Pose-graph SLAM']}
        />
        {/* TODO: if you have a measured drift or loop-closure improvement, add it as a metric above. */}

        <div className="mt-16">
          <SolutionArc beats={arc} />
          <p className="mt-6 text-[0.95rem] text-mute">
            <span className="font-semibold text-ink">Simulation was used to reduce iteration cost</span> — not to replace
            hardware validation.
          </p>
        </div>

        <div className="mt-16">
          <Tradeoffs
            rows={[
              { choice: 'Physical runs only', gain: 'Highest fidelity', cost: 'Almost two hours per run', resolution: 'Reserved for the shortlisted configurations' },
              { choice: 'Simulation screening', gain: 'Fast, cheap iteration', cost: 'Sim-to-real gap', resolution: 'Every shortlisted result confirmed on hardware' },
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
