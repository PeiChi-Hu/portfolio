import { motion } from 'framer-motion';
import { Check, Triangle, X } from 'lucide-react';
import Container from '../ui/Container.jsx';
import CaseIntro from '../ui/CaseIntro.jsx';
import Disclosure from '../ui/Disclosure.jsx';
import { NotesGrid } from '../ui/EngineeringNotes.jsx';
import SolutionArc from '../ui/SolutionArc.jsx';
import PullQuote from '../ui/PullQuote.jsx';
import ReasoningPath from '../ui/ReasoningPath.jsx';
import Panel from '../ui/Panel.jsx';
import { ease } from '../ui/Reveal.jsx';

/* ---------- A. Robot contract diagram (public-safe, conceptual) ---------- */

function VLine({ h = 'h-8' }) {
  return <div aria-hidden="true" className={`mx-auto w-px ${h} bg-line`} />;
}

function ContractDiagram() {
  const robots = ['Robot A', 'Robot B', 'Robot C'];
  return (
    <Panel label="Conceptual architecture — simplified and generic.">
      <div role="img" aria-label="Fleet System connects to a Unified Core handling state, maps and navigation, which talks to every robot through one Robot Contract. Vendor-specific wrappers adapt Robot A, B and C.">
        <div className="mx-auto max-w-[16rem] node">
          <span className="font-semibold">Fleet System</span>
        </div>
        <VLine />
        <div className="mx-auto max-w-[22rem] rounded-xl border border-ink bg-ink px-4 py-4 text-center text-white">
          <span className="block font-semibold">Unified Core</span>
          <span className="mt-1 block text-[0.82rem] text-white/60">state · maps · navigation</span>
        </div>
        <VLine />
        <div className="mx-auto max-w-[22rem] rounded-xl border border-dashed border-accent/50 bg-accent/[0.04] px-4 py-3 text-center">
          <span className="font-semibold text-accent">Robot Contract</span>
          <span className="mt-0.5 block text-[0.8rem] text-mute">common commands · common state reporting</span>
        </div>
        {/* fan-out */}
        <div aria-hidden="true" className="relative mx-auto h-8 w-full">
          <div className="absolute left-1/2 top-0 h-4 w-px bg-line" />
          <div className="absolute left-[16.66%] right-[16.66%] top-4 h-px bg-line" />
          <div className="absolute left-[16.66%] top-4 h-4 w-px bg-line" />
          <div className="absolute left-1/2 top-4 h-4 w-px bg-line" />
          <div className="absolute right-[16.66%] top-4 h-4 w-px bg-line" />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {robots.map((r) => (
            <div key={r} className="text-center">
              <div className="rounded-t-xl border border-b-0 border-line bg-mist/70 px-1 py-2 text-[0.72rem] text-mute sm:text-[0.8rem]">
                Robot Wrapper
              </div>
              <div className="rounded-b-xl border border-line bg-white px-1 py-3 shadow-soft">
                <span className="block text-[0.9rem] font-semibold sm:text-base">{r}</span>
                <span className="block text-[0.7rem] text-faint sm:text-[0.78rem]">Vendor Robot</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---------- Capability-aware fork ---------- */

function CapabilityFork() {
  return (
    <Panel>
      <div role="img" aria-label="When a new route arrives, the system asks whether the robot can update its goal in motion. If yes, it updates the goal. If no, it preserves the existing behavior and continues safely.">
        <div className="mx-auto max-w-[12rem] node font-semibold">New route</div>
        <VLine h="h-6" />
        <div className="mx-auto max-w-[19rem] rounded-xl border border-accent/40 bg-accent/[0.05] px-4 py-3 text-center text-[0.95rem] font-medium text-accent">
          Can this robot update its goal while moving?
        </div>
        <div aria-hidden="true" className="relative mx-auto h-8 w-full">
          <div className="absolute left-1/2 top-0 h-4 w-px bg-line" />
          <div className="absolute left-1/4 right-1/4 top-4 h-px bg-line" />
          <div className="absolute left-1/4 top-4 h-4 w-px bg-line" />
          <div className="absolute right-1/4 top-4 h-4 w-px bg-line" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faint">yes</p>
            <div className="node text-[0.92rem] font-medium">Update goal in motion</div>
          </div>
          <div className="text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faint">no</p>
            <div className="node text-[0.92rem] font-medium">Preserve existing behavior, continue safely</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---------- B. Transform exploration: grid warps ---------- */

const warps = {
  rigid: (x, y) => {
    const a = (6 * Math.PI) / 180;
    const cx = x - 0.5;
    const cy = y - 0.5;
    return [0.5 + cx * Math.cos(a) - cy * Math.sin(a) + 0.03, 0.5 + cx * Math.sin(a) + cy * Math.cos(a)];
  },
  affine: (x, y) => (x < 0.5 ? [x + 0.1 * (y - 0.5), y] : [x - 0.06 * (y - 0.5), y + 0.12 * (x - 0.5)]),
  hybrid: (x, y) => (x < 0.5 ? [x, y] : [x + 0.05 * (y - 0.5), y + 0.14 * (x - 0.5) * (x - 0.5) * 4]),
  tps: (x, y) => [
    x + 0.05 * Math.sin(Math.PI * y) * Math.sin(Math.PI * x * 1.2),
    y + 0.07 * Math.sin(Math.PI * x) * Math.sin(Math.PI * (y + 0.2)),
  ],
};

function WarpGrid({ kind, highlight }) {
  const f = warps[kind];
  const N = 6;
  const S = 20;
  const lines = [];
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    const h = [];
    const v = [];
    for (let k = 0; k <= S; k += 1) {
      const u = k / S;
      const [hx, hy] = f(u, t);
      const [vx, vy] = f(t, u);
      h.push(`${(8 + hx * 84).toFixed(2)},${(8 + hy * 84).toFixed(2)}`);
      v.push(`${(8 + vx * 84).toFixed(2)},${(8 + vy * 84).toFixed(2)}`);
    }
    lines.push(h.join(' '), v.join(' '));
  }
  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full" aria-hidden="true">
      <rect x="8" y="8" width="84" height="84" fill="none" stroke="#E6E4DF" strokeDasharray="2 2" />
      {lines.map((pts, i) => (
        <polyline key={i} points={pts} fill="none" stroke={highlight ? '#0062C4' : '#1D1D1F'} strokeOpacity={highlight ? 0.85 : 0.45} strokeWidth="0.8" />
      ))}
    </svg>
  );
}

const methods = [
  { kind: 'rigid', name: 'Rigid transform', verdict: 'Too stiff for non-rigid map deformation', mark: 'x' },
  { kind: 'affine', name: 'Local affine', verdict: 'Bends piece by piece, with seams', mark: 'tri' },
  { kind: 'hybrid', name: 'Hybrid static + local', verdict: 'Better, but still uneven', mark: 'tri' },
  { kind: 'tps', name: 'Thin-Plate Spline', verdict: 'Smooth, non-rigid correction', mark: 'check' },
];

function MarkIcon({ mark }) {
  if (mark === 'check') return <Check className="h-4 w-4 text-accent" aria-label="Chosen" />;
  if (mark === 'tri') return <Triangle className="h-3.5 w-3.5 text-faint" aria-label="Partial" />;
  return <X className="h-4 w-4 text-faint" aria-label="Rejected" />;
}

function MethodExploration() {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Transform methods explored">
      {methods.map((m, i) => {
        const chosen = m.mark === 'check';
        return (
          <motion.li
            key={m.kind}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            className={`rounded-2xl border p-4 ${chosen ? 'border-accent/40 bg-white shadow-soft' : 'border-line bg-white/60'}`}
          >
            <WarpGrid kind={m.kind} highlight={chosen} />
            <div className="mt-3 flex items-center gap-2">
              <MarkIcon mark={m.mark} />
              <span className={`text-[0.95rem] font-semibold ${chosen ? 'text-accent' : 'text-ink'}`}>{m.name}</span>
            </div>
            <p className="mt-1 text-[0.82rem] leading-snug text-mute">{m.verdict}</p>
          </motion.li>
        );
      })}
    </ol>
  );
}

/* ---------- C. The insight: metric maps ---------- */

const route = 'M30 196 L30 120 Q30 100 50 100 L170 100 Q190 100 190 80 L190 44 M190 100 L300 100 Q320 100 320 120 L320 196 M190 100 L190 150 L250 150';
const tasks = [
  [30, 196],
  [190, 44],
  [320, 196],
  [250, 150],
];

function MiniMap({ weighted }) {
  return (
    <svg viewBox="0 0 350 230" className="h-auto w-full" aria-hidden="true">
      <rect x="6" y="6" width="338" height="218" rx="10" fill={weighted ? '#FFFFFF' : 'rgba(0,98,196,0.07)'} stroke="#E6E4DF" />
      {/* walls / shelving */}
      {[
        [60, 30, 90, 46],
        [220, 26, 90, 50],
        [60, 130, 100, 40],
        [210, 172, 70, 28],
        [90, 186, 70, 20],
      ].map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="4" fill="#F3F2EE" stroke="#E6E4DF" />
      ))}
      {weighted && (
        <path d={route} fill="none" stroke="rgba(0,98,196,0.14)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      )}
      <motion.path
        d={route}
        fill="none"
        stroke={weighted ? '#0062C4' : '#8A8A8F'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={weighted ? undefined : '4 5'}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, ease }}
      />
      {tasks.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={weighted ? '#0062C4' : '#8A8A8F'} stroke="#fff" strokeWidth="2" />
      ))}
    </svg>
  );
}

function MetricComparison() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      <figure className="rounded-[24px] border border-line bg-white/60 p-4 sm:p-6">
        <MiniMap weighted={false} />
        <figcaption className="mt-4">
          <span className="block text-sm font-semibold text-faint">Before</span>
          <span className="block text-[0.98rem] text-mute">Global pixel alignment — every cell of the map counts equally.</span>
        </figcaption>
      </figure>
      <figure className="rounded-[24px] border border-accent/30 bg-white p-4 shadow-soft sm:p-6">
        <MiniMap weighted />
        <figcaption className="mt-4">
          <span className="block text-sm font-semibold text-accent">After</span>
          <span className="block text-[0.98rem] text-ink">Path-weighted error — measured along routes and at task locations.</span>
        </figcaption>
      </figure>
    </div>
  );
}

/* ---------- Case study ---------- */

const path = [
  {
    kind: 'tried',
    title: 'Rigid transform between maps',
    detail: 'Fails by construction: maps built by different sensors and SLAM stacks deform non-rigidly, so one global rotation + translation leaves local error.',
  },
  {
    kind: 'tried',
    title: 'Local affine, from the 5 nearest control points',
    detail: 'Robot pose = weighted blend of a static transform and a local affine fit. Unstable wherever control points were sparse.',
  },
  {
    kind: 'limit',
    title: 'Hybrid: switch to local affine only when enough points are nearby',
    detail: 'Near the switching threshold the reported pose jumped. A jumping pose feeds the route planner wrong positions, which can produce conflicting routes for other robots — not acceptable.',
  },
  {
    kind: 'tried',
    title: 'Thin-Plate Spline (globally smooth, non-rigid)',
    detail: 'Applied Bookstein’s TPS formulation to map registration and compared all three methods on the same benchmark.',
  },
  {
    kind: 'limit',
    title: 'On heavily deformed maps, all three methods scored about the same',
    detail: 'The global error metric could not separate them.',
  },
  {
    kind: 'insight',
    title: 'Pixel-perfect global alignment was never the production goal — pose accuracy where robots drive was.',
  },
  {
    kind: 'decision',
    title: 'Redefined the metric around navigation routes and task locations',
    detail: 'I built an analysis UI to define routes and task points, and scored only sampled points inside route corridors.',
  },
  {
    kind: 'validated',
    title: 'TPS clearly won on routes: 44.2% lower mean registration error — and stayed continuous along trajectories',
    detail: 'TPS was adopted for fleet-level navigation, and the route-weighted benchmark became the procedure for onboarding new robot platforms.',
  },
];

const arc = [
  {
    label: 'Started with',
    text: 'Rigid, then local-affine and hybrid transforms between each platform’s map and the fleet map.',
  },
  {
    label: 'Where it broke',
    text: 'Local fits were unstable with sparse control points; the hybrid made reported poses jump at its threshold. Then, on the benchmark, all methods scored about the same.',
  },
  {
    label: 'Turning point',
    text: 'The benchmark measured global pixel alignment. Production only needs accurate, continuous poses where robots actually drive.',
    focus: true,
  },
  {
    label: 'What shipped',
    text: 'A route-weighted metric that made TPS the clear winner — 44.2% lower error along routes — and became the onboarding procedure for new platforms.',
  },
];

const notes = [
  {
    k: 'Benchmark with known deformation',
    v: 'One map served as ground truth with thousands of densely sampled evaluation points and a set of control points. I generated deformed maps with controlled non-linear warps, so each method’s recovery could be measured against a known answer.',
  },
  {
    k: 'Why continuity mattered more than local accuracy',
    v: 'A method that is slightly more accurate locally but discontinuous at region boundaries is worse for a fleet: planners consume the pose stream, and a single jump propagates to every robot planned around it.',
  },
  {
    k: 'Capability-aware interface',
    v: 'Commands and state reporting go through one robot contract; vendor wrappers translate. Behavior that not every robot supports (e.g. updating a goal while moving) is queried as a capability rather than assumed, so older robots keep proven behavior.',
  },
  {
    k: 'What generalizes',
    v: 'The evaluation method, not just the transform: any new platform can be onboarded by registering its map against the fleet map and scoring it on the routes it will actually drive.',
  },
];

export default function FleetArchitectureCaseStudy() {
  return (
    <article id="case-fleet" aria-labelledby="cs1-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <CaseIntro
          num="01"
          category="Fleet systems"
          titleId="cs1-title"
          title="Unified Architecture for Heterogeneous Robot Fleets"
          subtitle="Standardizing robot interfaces, navigation behavior and spatial alignment across robot platforms with different capabilities."
          media={<ContractDiagram />}
          metrics={[
            { value: '44.2%', label: 'lower mean registration error along navigation routes' },
            { value: '4', label: 'robot platforms aligned to one fleet map' },
          ]}
          context="A central fleet system coordinating an in-house robot and third-party AMRs, each with its own API, map, coordinate frame and navigation capabilities."
          role="I owned cross-platform map registration end to end — method design, evaluation benchmark, route-weighted metric and the final TPS choice — as part of the unified fleet architecture."
          tags={['ROS2', 'Python', 'C++', 'Thin-Plate Spline', 'Coordinate transforms']}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <PullQuote>One fleet interface, without assuming every robot behaves the same way.</PullQuote>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
              A common interface simplifies integration, but it cannot assume identical capabilities — so capability is
              checked, and robots without it keep their existing, proven behavior.
            </p>
          </div>
          <div className="lg:col-span-7">
            <CapabilityFork />
          </div>
        </div>

        <div className="mt-20">
          <p className="mb-6 max-w-2xl text-[1rem] leading-relaxed text-mute">
            <span className="font-semibold text-ink">The harder problem was geometric.</span> Even with one interface,
            maps of the same site disagreed non-rigidly between platforms.
          </p>
          <MethodExploration />
        </div>

        <div className="mt-16">
          <SolutionArc beats={arc} />
        </div>

        <div className="mt-12">
          <MetricComparison />
        </div>

        <div className="mt-8">
          <Disclosure label="Engineering deep-dive" hint="full investigation log & notes">
            <ReasoningPath log steps={path} />
            <div className="mt-8 border-t border-line pt-6">
              <NotesGrid items={notes} />
            </div>
          </Disclosure>
        </div>
      </Container>
    </article>
  );
}
