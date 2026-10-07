import { motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import FlowDiagram from '../ui/FlowDiagram.jsx';
import CaseIntro from '../ui/CaseIntro.jsx';
import Disclosure from '../ui/Disclosure.jsx';
import { NotesGrid } from '../ui/EngineeringNotes.jsx';
import SolutionArc from '../ui/SolutionArc.jsx';
import ReasoningPath from '../ui/ReasoningPath.jsx';
import Tradeoffs from '../ui/Tradeoffs.jsx';
import Panel from '../ui/Panel.jsx';
import { ease } from '../ui/Reveal.jsx';

const pipeline = [
  { label: '2D LiDAR', sub: 'misses suspended & low obstacles', tone: 'muted' },
  { label: 'Depth camera', sub: 'RealSense' },
  { label: '3D point cloud' },
  { label: 'Nav2 voxel costmap', tone: 'accent' },
];

/* Voxel column: a fixed number of cells; cell size sets the total height. */
function VoxelColumn({ cells, cellH, label, sub, tone = 'ink', delay = 0 }) {
  const color = tone === 'accent' ? 'bg-accent/80' : tone === 'faint' ? 'bg-ink/25' : 'bg-ink/60';
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[208px] w-14 flex-col-reverse items-stretch sm:w-16" aria-hidden="true">
        {Array.from({ length: cells }).map((_, i) => (
          <motion.span
            key={i}
            className={`mt-[2px] block rounded-[3px] ${color}`}
            style={{ height: cellH }}
            initial={{ opacity: 0, scaleY: 0.4 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.35, ease, delay: delay + i * 0.035 }}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-[0.92rem] font-semibold text-ink">{label}</p>
      <p className="mt-0.5 max-w-[9rem] text-center text-[0.78rem] leading-snug text-mute">{sub}</p>
    </div>
  );
}

function VoxelTradeoff() {
  return (
    <Panel label="Illustrative — cell counts are schematic, not actual configuration values.">
      <div
        role="img"
        aria-label="With a fixed number of voxels per column, coarse cells reach tall but miss detail, fine cells catch detail but cover less height. After the source-level redesign, fine cells cover twice the vertical range."
        className="relative"
      >
        {/* obstacle-height reference line */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[22px] border-t border-dashed border-accent/50" />
        <div className="grid grid-cols-3 items-end gap-2 pt-2 sm:gap-6">
          <VoxelColumn cells={8} cellH={24} label="Coarse" sub="tall coverage, misses small obstacles" tone="faint" />
          <VoxelColumn cells={8} cellH={11} label="Fine" sub="better detail, smaller total height" delay={0.2} />
          <VoxelColumn cells={16} cellH={11} label="Redesigned" sub="fine detail, 2× vertical capacity" tone="accent" delay={0.4} />
        </div>
        <p aria-hidden="true" className="mt-6 flex items-center justify-center gap-2 text-[0.78rem] text-accent">
          <span className="inline-block w-6 border-t border-dashed border-accent/60" /> suspended-obstacle height
        </p>
      </div>
    </Panel>
  );
}

const functional = ['Minimum obstacle size', 'Camera field of view', 'Ghost obstacle behavior', 'Near-field detection'];
const system = ['CPU load', 'Memory', 'Long-running tests', 'Battery impact'];

const path = [
  {
    kind: 'tried',
    title: 'Fed RealSense D435 point clouds into the Nav2 local costmap through the voxel layer',
    detail: 'Goal: extend obstacle detection from the 2D LiDAR plane to 3D, so the robot avoids suspended and low obstacles.',
  },
  {
    kind: 'limit',
    title: 'Ghost obstacles appeared at random and stopped robots mid-route',
    detail: 'False obstacles triggered premature stops, hurting uptime and reliability.',
  },
  {
    kind: 'decision',
    title: 'Diagnosed insufficient clearing, not false detection',
    detail: 'Enabled ray-traced clearing on the depth source and set the clearing range beyond the marking range, so free-space rays reach past where ghosts were left behind.',
  },
  {
    kind: 'decision',
    title: 'Chose 640×480 over 1280×720 depth',
    detail: 'Higher resolution adds detail but raises the minimum sensing distance to ~28 cm. 640×480 brings it to ~20 cm and widens the near-field safety buffer.',
  },
  {
    kind: 'tried',
    title: 'Finer vertical resolution: z-resolution 0.10 m → 0.02 m to catch smaller obstacles',
  },
  {
    kind: 'limit',
    title: 'Total vertical range collapsed — tall obstacles fell out of view',
    detail: 'Every further parameter change traded one failure for another.',
  },
  {
    kind: 'insight',
    title: 'Reading the voxel grid source: each column is packed into a 32-bit word, capping it at 16 vertical voxels.',
    detail: 'This was a hard-coded representation ceiling, not a tuning problem.',
  },
  {
    kind: 'decision',
    title: 'Refactored the voxel layer’s internal data type and logic to double the column capacity',
    detail: 'Fine z-resolution and full vertical coverage at the same time.',
  },
  {
    kind: 'validated',
    title: 'Functional and system validation before shipping',
    detail: 'Minimum obstacle size, camera field of view, ghost behavior and near-field detection — plus CPU, memory, battery and long-running load tests to confirm the existing robot functions were unaffected.',
  },
];

const arc = [
  {
    label: 'Started with',
    text: 'Depth point clouds into the Nav2 voxel costmap, then configuration work: ray-traced clearing for ghost obstacles, 640×480 for a 20 cm near field, 0.02 m z-resolution for small obstacles.',
  },
  {
    label: 'Where it broke',
    text: 'Finer z-resolution shrank total vertical range, so tall obstacles fell out of view. Every further parameter change traded one failure for another.',
  },
  {
    label: 'Turning point',
    text: 'In the voxel grid source, each column is packed into a 32-bit word — a hard 16-voxel ceiling. Not a tuning problem.',
    focus: true,
  },
  {
    label: 'What shipped',
    text: 'A refactored voxel layer with 2× column capacity, validated for detection limits and for CPU, memory, battery and long-run impact.',
  },
];

const validationNotes = [
  { k: 'Functional validation', v: functional.join(' · ') },
  { k: 'System validation', v: system.join(' · ') },
  { k: 'Why validate system load', v: 'Navigation, localization and safety share the same compute. A perception upgrade that degrades them is a regression, even if detection improves.' },
  { k: 'Next step I’d take', v: 'Classify ground points (flat floor vs. step vs. drop-off) with a learned model so the robot can stop or reroute instead of treating every return as an obstacle.' },
];

const tradeoffs = [
  { choice: 'Depth resolution', gain: '1280×720: more detail', cost: '~28 cm minimum sensing distance', resolution: 'Chose 640×480 for ~20 cm and a larger near-field buffer' },
  { choice: 'Voxel z-resolution', gain: '0.02 m: catches smaller obstacles', cost: 'Smaller total height under a 16-voxel column', resolution: 'Doubled column capacity at the source level' },
  { choice: 'Larger voxel columns', gain: '2× vertical coverage', cost: 'Potential memory / compute overhead', resolution: 'Load-tested CPU, memory and battery before rollout' },
];

export default function PerceptionCaseStudy() {
  return (
    <article id="case-perception" aria-labelledby="cs2-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <CaseIntro
          num="02"
          category="Perception & navigation"
          titleId="cs2-title"
          title="3D Perception for Autonomous Navigation"
          subtitle="Integrating depth sensing into a ROS2 navigation stack, and redesigning the voxel representation when configuration-level tuning reached its limit."
          media={
            <div>
              <FlowDiagram compact steps={pipeline} ariaLabel="Sensing pipeline from 2D LiDAR to Nav2 voxel costmap" />
              <div className="mt-6">
                <VoxelTradeoff />
              </div>
            </div>
          }
          metrics={[
            { value: '2×', label: 'vertical voxel capacity at fine (0.02 m) resolution' },
            { value: '20 cm', label: 'minimum reliable sensing distance (from ~28 cm)' },
          ]}
          context="Nav2-based navigation on a production mobile robot, previously relying on a planar 2D LiDAR for obstacle detection."
          role="I integrated the depth camera into the costmap, debugged ghost obstacles, chose the sensing configuration, modified the voxel layer source and ran the validation."
          tags={['ROS2', 'Nav2', 'C++', 'Intel RealSense D435', 'Point clouds']}
        />

        <div className="mt-16">
          <SolutionArc beats={arc} />
        </div>

        <div className="mt-14">
          <Tradeoffs rows={tradeoffs} />
        </div>

        <div className="mt-8">
          <Disclosure label="Engineering deep-dive" hint="full investigation log & notes">
            <ReasoningPath log steps={path} />
            <div className="mt-8 border-t border-line pt-6">
              <NotesGrid items={validationNotes} />
            </div>
          </Disclosure>
        </div>
      </Container>
    </article>
  );
}
