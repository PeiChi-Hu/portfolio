import { motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Reveal, { ease } from '../ui/Reveal.jsx';

const layers = [
  { name: 'Robot learning & 3D vision', items: ['PyTorch', 'PyTorch3D', 'Reinforcement Learning', 'Imitation Learning', 'MuJoCo', 'Gymnasium'], now: true },
  { name: 'Perception', items: ['OpenCV', 'PCL', 'Depth Cameras', 'AprilTag', '3D Reconstruction'] },
  { name: 'Localization & navigation', items: ['EKF', 'Cartographer', 'SLAM', 'Nav2', 'Sensor Fusion'] },
  { name: 'Robot systems', items: ['ROS2', 'Gazebo', 'Distributed Systems', 'Fleet Architecture', 'REST APIs'] },
  { name: 'Embedded & control', items: ['STM32', 'CAN', 'UART', 'PID', 'Encoders'] },
  { name: 'Physical systems', items: ['LiDAR', 'IMU', 'Motors', 'Depth Cameras'] },
];

const foundations = ['C++', 'C', 'Python', 'Linux', 'Bash', 'Git', 'Docker'];

export default function RoboticsStack() {
  return (
    <section id="skills" aria-labelledby="stack-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <Reveal as="h2" id="stack-title" className="display-md">
          Skills
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-3 max-w-2xl text-[1.05rem] text-mute">
          Across the robotics stack — because real robot failures rarely stay inside one layer.
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-line bg-white">
          <ol aria-label="Robotics stack, from learning at the top to physical hardware at the bottom">
            {layers.map((l, i) => (
              <motion.li
                key={l.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className={`grid gap-3 border-line px-6 py-5 sm:px-8 md:grid-cols-[minmax(0,16rem)_1fr] md:items-center md:gap-10 ${
                  i > 0 ? 'border-t' : ''
                } ${l.now ? 'bg-accent/[0.035]' : ''}`}
              >
                <h3 className={`text-[0.78rem] font-semibold uppercase tracking-[0.14em] ${l.now ? 'text-accent' : 'text-ink'}`}>
                  {l.name}
                </h3>
                <p className="text-[1.02rem] leading-relaxed text-mute">
                  {l.items.map((it, j) => (
                    <span key={it}>
                      <span className="text-ink/85">{it}</span>
                      {j < l.items.length - 1 && <span aria-hidden="true" className="px-2 text-faint/70">·</span>}
                    </span>
                  ))}
                </p>
              </motion.li>
            ))}
          </ol>
          <div className="flex flex-col gap-2 border-t border-line bg-mist/60 px-6 py-5 sm:px-8 md:flex-row md:items-center md:gap-10">
            <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink md:w-64 md:shrink-0">Languages &amp; tools</h3>
            <p className="font-mono text-[0.9rem] text-ink">{foundations.join('  ·  ')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
