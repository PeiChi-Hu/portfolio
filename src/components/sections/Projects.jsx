import { ArrowLeftRight, FileText, Play } from 'lucide-react';
import { site } from '../../data/site.js';
import Container from '../ui/Container.jsx';
import CTAButton from '../ui/CTAButton.jsx';
import FlowDiagram from '../ui/FlowDiagram.jsx';
import Reveal from '../ui/Reveal.jsx';
import { TagList } from '../ui/TechTag.jsx';
import { ControlLoop } from './AMRProject.jsx';

const asrsImg = `${import.meta.env.BASE_URL}images/asrs.jpg`;

const composition = [
  { n: 8, l: 'Conveyors' },
  { n: 2, l: 'Elevators' },
  { n: 3, l: 'Shuttles' },
];

function Story({ label, title, steps, children, metric }) {
  return (
    <Reveal className="rounded-[22px] border border-line bg-white p-6 sm:p-8">
      <p className="eyebrow">{label}</p>
      <h4 className="mt-2 text-[1.2rem] font-semibold tracking-tight text-ink">{title}</h4>
      {metric && <p className="mt-4 text-[1.9rem] font-semibold leading-none tracking-tight text-ink">{metric}</p>}
      <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-mute">{children}</div>
      <FlowDiagram className="mt-6" direction="vertical" compact steps={steps} ariaLabel={`${title}: ${steps.map((s) => s.label).join(', ')}`} />
    </Reveal>
  );
}

function ASRS() {
  return (
    <article id="project-asrs" aria-labelledby="asrs-title" className="mt-14">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal as="figure" className="lg:col-span-7">
          <img
            src={asrsImg}
            width="899"
            height="675"
            loading="lazy"
            decoding="async"
            alt="The multi-shuttle ASRS prototype on a lab bench: a three-floor aluminum rack with shuttles and elevators, a green conveyor in front, and the control workstation beside it."
            className="h-auto w-full rounded-[24px] border border-line bg-mist object-cover"
          />
          <figcaption className="mt-3 text-[0.82rem] text-faint">The working prototype, built and integrated over one year.</figcaption>
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-5">
          <p className="eyebrow">Early systems work · Lead software developer</p>
          <h3 id="asrs-title" className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.1] tracking-tight text-ink text-balance">
            Multi-Shuttle Automated Storage and Retrieval System
          </h3>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-mute">
            A three-floor automated warehouse coordinating 13 independently moving components, controlled from a
            Raspberry Pi.
          </p>
          <dl className="mt-8 grid grid-cols-4 gap-3 border-t border-line pt-6">
            {composition.map((c) => (
              <div key={c.l}>
                <dt className="sr-only">{c.l}</dt>
                <dd>
                  <span className="block text-[1.9rem] font-semibold leading-none text-ink">{c.n}</span>
                  <span className="mt-1 block text-[0.8rem] text-mute">{c.l}</span>
                </dd>
              </div>
            ))}
            <div>
              <dt className="sr-only">Moving components</dt>
              <dd>
                <span className="block text-[1.9rem] font-semibold leading-none text-accent">13</span>
                <span className="mt-1 block text-[0.8rem] text-mute">Moving parts</span>
              </dd>
            </div>
          </dl>
          <TagList
            className="mt-7"
            tone="quiet"
            items={['Python', 'Multiprocessing', 'Queues', 'Mutex / sync', 'Motor control', 'Raspberry Pi', 'OpenCV QR tracking', 'Django · MySQL']}
          />
        </Reveal>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Story
          label="Story A · Concurrency"
          title="Coordinating shared physical resources"
          steps={[
            { label: 'Independent controllers, one per mechanism' },
            { label: 'Inbound + outbound jobs on the same floor', tone: 'muted' },
            { label: 'Race for the same shuttle', tone: 'muted' },
            { label: 'Queue-based ownership + mutex', tone: 'accent' },
            { label: 'Deterministic coordination', tone: 'ink' },
          ]}
        >
          <p>
            To maximize throughput every mechanism ran in its own process. Under load, storage and retrieval jobs on the
            same floor competed for one shuttle — commands interleaved and the system could crash.
          </p>
          <p className="text-ink/85">
            I designed a resource manager on multiprocessing queues: a process must take a shuttle’s token from the
            queue before commanding it and return it afterwards, with mutex locks around shared state.
          </p>
        </Story>
        <Story
          label="Story B · Hardware reliability"
          title="Debugging below the software"
          metric={<><span className="text-faint">&lt;20%</span> → 100%</>}
          steps={[
            { label: 'Stepper runs failing intermittently', tone: 'muted' },
            { label: 'Read the driver schematic, scoped the outputs' },
            { label: 'Optocoupler input current-limiting too fragile → DIR latched', tone: 'accent' },
            { label: 'Switched TB6560 → DM420, star grounding', tone: 'ink' },
            { label: 'Reliable motor operation' },
          ]}
        >
          <p>
            Motor run success was below 20%. Rather than treating it as a software bug, I analyzed the driver circuit:
            small voltage or current disturbances at the optocoupler input could latch the direction signal.
          </p>
          <p className="text-ink/85">
            I selected a driver with better input protection and re-did the grounding to remove signal noise.
          </p>
        </Story>
      </div>

      <Reveal className="mt-6 flex flex-col gap-5 rounded-[22px] bg-mist/70 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9rem] text-ink/85">
          <span className="mr-1 font-semibold text-ink">Cross-layer debugging:</span>
          {['software', 'communication', 'electronics', 'mechanical'].map((x, i, a) => (
            <span key={x} className="inline-flex items-center gap-2">
              {x}
              {i < a.length - 1 && <ArrowLeftRight aria-hidden="true" className="h-3.5 w-3.5 text-faint" />}
            </span>
          ))}
        </p>
        <div className="flex flex-wrap gap-2">
          <CTAButton href={site.asrsDemo} external variant="secondary" icon={<Play aria-hidden="true" className="h-4 w-4" />}>
            Watch Demo
          </CTAButton>
          <CTAButton href={site.asrsPaper} external variant="secondary" icon={<FileText aria-hidden="true" className="h-4 w-4" />}>
            Read Paper
          </CTAButton>
        </div>
      </Reveal>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-faint">
        1st Place, NYCU Mechanical Engineering Project Competition · Honorable Mention, Taiwan Society for Precision
        Engineering · First-author paper, 39th CSME Conference
      </p>
    </article>
  );
}

function AMR() {
  return (
    <article id="project-amr" aria-labelledby="amr-title" className="mt-20 grid gap-8 border-t border-line pt-14 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-6">
        <p className="eyebrow">Autonomous mobile robot · Research assistant</p>
        <h3 id="amr-title" className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight text-ink">
          AMR Control Stack &amp; Digital Twin
        </h3>
        <p className="mt-3 text-[1rem] leading-relaxed text-mute">
          Built an autonomous mobile robot from the control loop up — where robotics stopped being a black box for me.
        </p>
        <ul className="mt-6 space-y-2.5 text-[0.95rem] leading-relaxed text-ink/85">
          {[
            'Connected ROS navigation commands to STM32 real-time actuation through a kinematic model and UART.',
            'Configured STM32 timers, PWM, ADC and UART from the reference manual at register level; closed-loop motor control.',
            'Redesigned encoder firmware for synchronized four-wheel feedback.',
            'Built a Gazebo digital twin (SDF/STL, ROS control) to validate control before touching hardware.',
          ].map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-faint" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <TagList className="mt-6" tone="quiet" items={['ROS', 'STM32', 'C/C++', 'Gazebo', 'UART', 'Embedded control']} />
      </Reveal>
      <Reveal delay={0.06} className="lg:col-span-6">
        <ControlLoop />
        {/* TODO: add a photo of the AMR here (public/images/amr.jpg) if you have one. */}
      </Reveal>
    </article>
  );
}

const more = [
  {
    title: 'Brain-Controlled Wheelchair',
    context: 'Biomedical engineering',
    text: 'EEG-to-motion pipeline with per-user signal calibration and a producer-consumer architecture for asynchronous motor control.',
    metric: '20% → 80% blink-command accuracy',
    tags: ['Signal processing', 'LabVIEW', 'Arduino'],
  },
  {
    title: 'Robot On Cloud — Distributed Healthcare Robotics',
    context: 'Innovation competition',
    text: 'Cross-disciplinary team (engineering, management, finance) turning distributed robotics into a healthcare product concept; advanced past the preliminary round.',
    metric: 'Product thinking',
    tags: ['Distributed robotics', 'Cross-disciplinary'],
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <Reveal as="h2" id="projects-title" className="display-md">
          Projects
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-3 max-w-2xl text-[1.05rem] text-mute">
          Before production robots: physical systems I designed, built and debugged end to end.
        </Reveal>

        <ASRS />
        <AMR />

        <div className="mt-20 border-t border-line pt-10">
          <h3 className="eyebrow">Earlier explorations</h3>
          <ul className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {more.map((m) => (
              <Reveal as="li" key={m.title}>
                <p className="text-[0.78rem] text-faint">{m.context}</p>
                <h4 className="mt-1 text-[1.08rem] font-semibold text-ink">{m.title}</h4>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-mute">{m.text}</p>
                <p className="mt-2 text-[0.9rem] font-semibold text-ink">{m.metric}</p>
                <TagList className="mt-3" tone="quiet" items={m.tags} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
