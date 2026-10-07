import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { site } from '../../data/site.js';
import Container from '../ui/Container.jsx';
import CTAButton from '../ui/CTAButton.jsx';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons.jsx';
import { ease } from '../ui/Reveal.jsx';

const glance = [
  { k: 'Now', v: 'M.S. Computer Vision, Carnegie Mellon University · graduating Dec 2027' },
  { k: 'Experience', v: '3.5 yrs · R&D Senior Software Engineer, FARobot (Foxconn × ADLINK JV)' },
  { k: 'Focus', v: '3D Reconstruction · Reinforcement Learning · Imitation Learning · SLAM · Localization · Perception · Calibration · Multi-vendor fleet architecture' },
  { k: 'Core stack', v: 'C++ · Python · ROS2 · Nav2 · OpenCV · PyTorch · Linux · Docker · REST APIs · MuJoCo · Gymnasium' },
];

const metrics = [
  { v: '44.2%', l: 'lower map-alignment error along robot paths', area: 'Fleet maps' },
  { v: '>50%', l: 'faster camera calibration, sub-mm accuracy', area: 'Calibration' },
  { v: '2×', l: 'vertical obstacle coverage in the Nav2 costmap', area: '3D perception' },
  { v: '45→74%', l: 'stop-phase localization stability (EKF)', area: 'Localization' },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-16 pt-28 sm:pb-20 sm:pt-36">
      <Container>
        <div className="flex flex-wrap items-center gap-2">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[0.8rem] text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Open to 2027 Full-Time Roles
          </motion.p>
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[0.8rem] text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Open to 2027 Summer Internships
          </motion.p>
        </div>
        
        <motion.h1 {...rise(0.06)} id="hero-title" className="mt-8">
          <span className="block text-[2.5rem] font-semibold text-ink">Pei-Chi Hu</span>
        </motion.h1>

        <motion.p {...rise(0.14)} className="lede mt-2 max-w-[60rem]">
          I spent 3.5 years building production software for autonomous mobile robots at FARobot, growing from localization and perception to fleet-level system architecture. My work spanned EKF tuning, SLAM, depth-camera perception, automated calibration, and a unified architecture for heterogeneous robot fleets. 
          Now at CMU, I’m extending that foundation into 3D vision and robot learning.
        </motion.p>

        <motion.div {...rise(0.22)} className="mt-9 flex flex-wrap items-center gap-3">
          <CTAButton href={site.resume} external>
            View Resume
          </CTAButton>
          <CTAButton href="#path" variant="secondary">
            See Experience Path
          </CTAButton>
          <span className="ml-1 flex items-center gap-1">
            {[
              { href: `mailto:${site.email}`, label: `Email ${site.email}`, icon: <Mail className="h-[18px] w-[18px]" aria-hidden="true" />, ext: false },
              { href: site.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="h-[17px] w-[17px]" />, ext: true },
              { href: site.github, label: 'GitHub', icon: <GitHubIcon className="h-[18px] w-[18px]" />, ext: true },
            ].map((x) => (
              <a
                key={x.label}
                href={x.href}
                aria-label={x.label}
                title={x.label}
                {...(x.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-mute transition-colors hover:bg-mist hover:text-ink"
              >
                {x.icon}
              </a>
            ))}
          </span>
        </motion.div>

        {/* 獨立在下方排版的 At a glance 卡片 */}
        <motion.div {...rise(0.3)} aria-label="At a glance" className="mt-12 max-w-[65rem]">
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-soft sm:p-7">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-5 divide-y divide-line">
              {glance.map((g) => (
                <div key={g.k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3 first:pt-0 last:pb-0">
                  <dt className="text-[0.82rem] font-medium text-faint">{g.k}</dt>
                  <dd className="text-[0.92rem] leading-snug text-ink">{g.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-center gap-1.5 text-[0.82rem] text-faint">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Pittsburgh, PA · {site.email}
            </p>
          </div>
        </motion.div>

        <motion.dl
          {...rise(0.4)}
          aria-label="Selected production results"
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:grid-cols-4"
        >
          {metrics.map((m) => (
            <div key={m.area}>
              <dt className="eyebrow">{m.area}</dt>
              <dd className="mt-2">
                <span className="block text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-none tracking-tight text-ink tabular-nums">{m.v}</span>
                <span className="mt-2 block text-[0.88rem] leading-snug text-mute">{m.l}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}