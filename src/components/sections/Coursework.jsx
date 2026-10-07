import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { TagList } from '../ui/TechTag.jsx';

/*
- CMU graduate coursework. Every number and observation here comes from my own submitted
- assignments (16-825, 16-820, 16-831) — kept per course so results never mix.
 */

const img = (name) => `${import.meta.env.BASE_URL}images/cmu/${name}`;

/* ---------- small building blocks ---------- */

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-[1.5rem] font-semibold leading-none tracking-tight text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-[0.8rem] leading-snug text-mute">{label}</p>
    </div>
  );
}

function Assignment({ tag, title, built, children, insight }) {
  return (
    <article className="border-t border-line pt-6">
      <p className="font-mono text-[0.72rem] text-faint">{tag}</p>
      <h4 className="mt-1 text-[1.12rem] font-semibold leading-snug tracking-tight text-ink">{title}</h4>
      <p className="mt-2 text-[0.94rem] leading-relaxed text-mute">{built}</p>
      {children && <div className="mt-4">{children}</div>}
      {insight && (
        <p className="mt-4 rounded-xl bg-accent/[0.06] px-4 py-3 text-[0.9rem] leading-relaxed text-ink">
          <span className="mr-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">Finding</span>
          {insight}
        </p>
      )}
    </article>
  );
}

function Figure({ src, alt, caption, width, height }) {
  return (
    <figure className="rounded-[20px] border border-line bg-white p-4">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="h-auto w-full rounded-lg" />
      <figcaption className="mt-3 text-[0.8rem] leading-snug text-faint">{caption}</figcaption>
    </figure>
  );
}

/* Single-series horizontal bars (one hue), values labeled directly. */
function F1Bars({ rows }) {
  return (
    <figure className="rounded-[20px] border border-line bg-white p-5">
      <p className="text-[0.85rem] font-semibold text-ink">Single-view reconstruction, chair test set</p>
      <p className="text-[0.78rem] text-faint">F1@0.05 (higher is better)</p>
      <ul className="mt-4 space-y-3" aria-label="F1 at 0.05 by 3D representation">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3" title={`${r.label}: F1@0.05 = ${r.value}`}>
            <span className="text-[0.85rem] text-ink/85">{r.label}</span>
            <span className="h-3 rounded-r-[4px] bg-mist" aria-hidden="true">
              <span className="block h-full rounded-r-[4px] bg-accent" style={{ width: `${r.value}%` }} />
            </span>
            <span className="text-right text-[0.85rem] font-semibold tabular-nums text-ink">{r.value.toFixed(1)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function AlphaTable() {
  const rows = [
    { a: '0.25', p: 66.924, r: 80.955, f: 72.74 },
    { a: '0.50', p: 74.794, r: 73.442, f: 73.023, best: true },
    { a: '0.75', p: 82.435, r: 63.978, f: 70.023 },
  ];
  return (
    <table className="w-full text-left text-[0.86rem]">
      <caption className="sr-only">Chamfer direction weighting α versus precision, recall and F1 at 0.05</caption>
      <thead>
        <tr className="border-b border-line text-faint">
          <th className="py-1.5 font-medium">α (pred → GT weight)</th>
          <th className="py-1.5 text-right font-medium">Precision</th>
          <th className="py-1.5 text-right font-medium">Recall</th>
          <th className="py-1.5 text-right font-medium">F1</th>
        </tr>
      </thead>
      <tbody className="tabular-nums">
        {rows.map((r) => (
          <tr key={r.a} className="border-b border-line/70">
            <td className="py-1.5 text-ink">{r.a}</td>
            <td className="py-1.5 text-right text-mute">{r.p.toFixed(1)}</td>
            <td className="py-1.5 text-right text-mute">{r.r.toFixed(1)}</td>
            <td className={`py-1.5 text-right ${r.best ? 'font-semibold text-ink' : 'text-mute'}`}>{r.f.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Steps({ items }) {
  return (
    <ol className="flex flex-wrap items-stretch gap-2" aria-label="Accuracy progression">
      {items.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2">
           <span className={`rounded-xl border px-3 py-2 ${i === items.length - 1 ? 'border-accent/40 bg-accent/[0.05]' : 'border-line bg-white'}`}>
            <span className="block text-[1.05rem] font-semibold leading-none tabular-nums text-ink">{s.value}</span>
            <span className="mt-1 block text-[0.74rem] text-mute">{s.label}</span>
          </span>
          {i < items.length - 1 && <span aria-hidden="true" className="text-faint">→</span>}
        </li>
      ))}
    </ol>
  );
}

function Course({ id, code, name, focus, tags, children, aside, wide }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-14 first:border-t-0 first:pt-0">
      <Reveal className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <div>
          <p className="font-mono text-[0.8rem] text-accent">{code}</p>
          <h3 id={`${id}-title`} className="mt-1 text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-tight tracking-tight text-ink">
            {name}
          </h3>
          <p className="mt-2 max-w-2xl text-[0.98rem] text-mute">{focus}</p>
        </div>
        <TagList tone="quiet" items={tags} className="md:max-w-[22rem] md:justify-end" />
      </Reveal>
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <Reveal className="space-y-8 lg:col-span-7">{children}</Reveal>
        <Reveal delay={0.06} className="space-y-5 lg:col-span-5">{aside}</Reveal>
      </div>
      {wide && <Reveal className="mt-10">{wide}</Reveal>}
    </section>
  );
}

/* ---------- section ---------- */

export default function Coursework() {
  return (
    <section id="coursework" aria-labelledby="coursework-title" className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <Reveal as="p" className="eyebrow mb-3">
          Carnegie Mellon · M.S. Computer Vision · Fall 2026
        </Reveal>
        <Reveal as="h2" id="coursework-title" className="display-md">
          CMU Coursework
        </Reveal>
        <Reveal as="p" delay={0.05} className="mt-3 max-w-2xl text-[1.05rem] text-mute">
          Graduate assignments in 3D vision, computer vision and robot learning — the experiments I ran, the numbers I
          got and what I learned from them.
        </Reveal>
        <nav aria-label="Courses" className="mt-8 flex flex-wrap gap-2">
          {[
            ['#cmu-3d', '16-825 · Learning for 3D'],
            ['#cmu-cv', '16-820 · Advanced Computer Vision'],
            ['#cmu-rl', '16-831 · Robot Learning'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-line bg-paper px-4 py-2 text-[0.88rem] text-ink transition-colors hover:border-ink/30">
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-14">
          {/* ===== 16-825 Learning for 3D ===== */}
          <Course
            id="cmu-3d"
            code="16-825"
            name="Learning for 3D"
            focus="Rendering and 3D representations in PyTorch3D, then learning to reconstruct 3D shape from a single image."
            tags={['PyTorch', 'PyTorch3D', 'Voxels', 'Point clouds', 'Meshes']}
            aside={
              <>
                <F1Bars
                  rows={[
                    { label: 'Voxel grid', value: 48.719 },
                    { label: 'Mesh', value: 69.329 },
                    { label: 'Point cloud', value: 73.023 },
                  ]}
                />
                <div className="rounded-[20px] border border-line bg-white p-5">
                  <p className="mb-2 text-[0.85rem] font-semibold text-ink">Chamfer direction weighting (point cloud)</p>
                  <AlphaTable />
                </div>
                <figure className="rounded-[20px] border border-line bg-white p-5">
                  <p className="text-[0.95rem] font-semibold text-ink">Visualized per-point distance heatmaps</p>
                  <p className="mt-1 text-[0.82rem] text-faint">
                    Same chair test. Middle: Precision Error. Right: Recall Error. Blue = close, red = far.
                  </p>
                  <div className="mt-5 grid gap-8">
                    {[
                      {
                        file: 'heatmap_alpha025.jpg',
                        label: 'α = 0.25',
                        text: 'Ground-truth points are mostly blue — the prediction covers the chair — but many predicted points are red and off the surface.',
                      },
                      {
                        file: 'heatmap_alpha075.jpg',
                        label: 'α = 0.75',
                        text: 'Predicted points concentrate on a few accurate regions; large parts of the chair go uncovered, so recall is lowest.',
                      },
                    ].map((h) => (
                      <div key={h.file}>
                        <img
                          src={img(h.file)}
                          width={1400}
                          height={473}
                          loading="lazy"
                          decoding="async"
                          alt={`Distance heatmaps for Chamfer weight ${h.label}: input image, prediction-to-ground-truth distances and ground-truth-to-prediction distances.`}
                          className="h-auto w-full rounded-lg"
                        />
                        <p className="mt-2 text-[0.85rem] leading-relaxed text-mute">
                          <span className="mr-2 font-mono font-semibold text-ink">{h.label}</span>
                          {h.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </figure>
              </>
            }
          >
            <Assignment
              tag="Assignment 2 · Single view to 3D"
              title="Single-View 3D Reconstruction: voxels, point clouds and meshes"
              built="Fitted each 3D representation directly to ground truth with its own loss, then trained models that predict a voxel grid, a point cloud and a mesh from one RGB image, evaluated with F1@0.05."
              insight="Point clouds reconstructed best (F1 73.0), meshes next (69.3) and voxel grids worst (48.7)."
            />
            <Assignment
              tag="Ablation · Chamfer loss"
              title="Precision vs. recall in the Chamfer distance"
              built="Added a weight α between the two Chamfer directions (pred → GT vs. GT → pred) and compared α = 0.25, 0.5, 0.75. Visualized per-point distance heatmaps in both directions to interpret each model."
              insight="Raising α pushes points onto accurate regions — precision 66.9 → 82.4 — but leaves parts of the shape uncovered, so recall falls 81.0 → 64.0. The balanced α = 0.5 gave the best F1."
            />
            <Assignment
              tag="Extension · More training data"
              title="Chair-only vs. chair + car + plane training"
              built="Retrained the point-cloud model on three classes and evaluated on the same chair test set."
              insight="F1 rose from 73.0 to 76.2, with both precision and recall improving; output diversity looked similar to the chair-only model."
            />
            <Assignment
              tag="Assignment 1 · Rendering basics"
              title="Cameras, meshes and 3D representations in PyTorch3D"
              built=""
            >
              <div className="flex flex-col sm:flex-row gap-4 bg-white">
                <p className="text-[0.94rem] leading-relaxed text-mute flex-1">
                  A torus defined as an implicit surface, voxelized and meshed with marching cubes, rendered as a 360° turntable in PyTorch3D.
                </p>
                <img
                  src={img('torus_mesh.gif')}
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  alt="Turntable render of a torus mesh extracted from an implicit function with marching cubes."
                  className="h-32 w-32 shrink-0 rounded-lg bg-mist object-cover"
                />
              </div>
            </Assignment>
          </Course>

          {/* ===== 16-820 Advanced Computer Vision ===== */}
          <Course
            id="cmu-cv"
            code="16-820"
            name="Advanced Computer Vision"
            focus="Image representations and learning, implemented from first principles before reaching for a framework."
            tags={['NumPy', 'HOG', 'k-NN', 'MLP', 'Autoencoder', 'VAE']}
            aside={
              <>
                <Figure
                  src={img('hog.png')}
                  width={1105}
                  height={385}
                  alt="HOG pipeline on a 32 by 32 Imagenette image: the input, its gradient magnitudes and its gradient orientations."
                  caption="My HOG implementation on a 32×32 Imagenette image: input, gradient magnitude, gradient orientation."
                />
                <Figure
                  src={img('nn_weights.jpg')}
                  width={640}
                  height={637}
                  alt="Grid of 64 first-layer weight images after training, showing stroke- and edge-like patterns."
                  caption="First-layer weights of my NumPy network after training on NIST36: random noise at initialization, edge- and stroke-like detectors after."
                />
              </>
            }
          >
            <Assignment
              tag="Homework 1 · Image classification"
              title="From raw pixels to HOG features on Imagenette"
              built="10-class Imagenette (9,000 train / 3,856 test images). Implemented k-NN with fully vectorized L2 distances (13 s vs. 345 s for the two-loop version), descriptor normalization, and HOG from scratch: per-channel max gradients, magnitude-weighted orientation bins and clipped block normalization."
              insight="Hand-crafted structure beat raw pixels by 13 points; tuning input and cell size added 6.5 more (40.2% → 46.6%). An SVD projection shrank HOG descriptors 3× (3,600 → 1,200 dims) with no loss in accuracy."
            >
              <Steps
                items={[
                  { value: '29.5%', label: 'Raw pixels' },
                  { value: '34.2%', label: 'Normalized' },
                  { value: '42.3%', label: 'HOG' },
                ]}
              />
              <p className="mt-2 text-[0.76rem] text-faint">k-NN, k = 3, full test set.</p>
            </Assignment>
            <Assignment
              tag="Homework 2 · Neural networks"
              title="Neural networks from scratch in NumPy"
              built="Weight initialization, sigmoid / softmax, cross-entropy, backpropagation and mini-batch SGD for a 36-class handwritten letter-and-digit classifier (NIST36); then a ReLU autoencoder with momentum, and a VAE with the reparameterization trick and KL divergence."
              insight="One hidden layer of 64 units reached 76.8% test accuracy. Learning rate dominated: 10× the tuned rate collapsed to 46.1%, one-tenth reached 69.9%."
            >
              <div className="grid grid-cols-3 gap-4 rounded-xl border border-line bg-white px-4 py-3">
                <Stat value="76.8%" label="NIST36 test accuracy" />
                <Stat value="15.81 dB" label="autoencoder PSNR (validation)" />
                <Stat value="36" label="classes, A–Z and 0–9" />
              </div>
            </Assignment>
          </Course>

          {/* ===== 16-831 Robot Learning ===== */}
          <Course
            id="cmu-rl"
            code="16-831"
            name="Introduction to Robot Learning"
            focus="Imitation learning and policy-gradient reinforcement learning on MuJoCo continuous-control tasks."
            tags={['PyTorch', 'MuJoCo', 'OpenAI Gym', 'Behavior cloning', 'DAgger', 'GAE']}
            aside={
              <>
                <Figure
                  src={img('dagger_hopper.png')}
                  width={500}
                  height={365}
                  alt="Hopper-v2 learning curve: DAgger return rises from the behavior-cloning level of about 900 to the expert level of about 3,770 by iteration 2."
                  caption="Hopper: DAgger (orange) climbs from the behavior-cloning level (green) to the expert (blue) by iteration 2."
                />
                <Figure
                  src={img('gae_hopper.png')}
                  width={885}
                  height={445}
                  alt="Hopper policy-gradient learning curves for GAE lambda 0, 0.95, 0.99 and 1 over 300 iterations; lambda 0 stays far below the others."
                  caption="Hopper policy gradient with GAE, λ ∈ {0, 0.95, 0.99, 1}."
                />
              </>
            }
          >
            <Assignment
              tag="Assignment 1 · Imitation learning"
              title="Behavior cloning vs. DAgger"
              built="Implemented the training loop, MLP policy, replay buffer and trajectory sampling, then behavior cloning and DAgger against expert policies on Ant and Hopper."
              insight="Behavior cloning matched the expert on Ant (4,686 vs. 4,714) but reached only 24% of the expert on Hopper (898 vs. 3,773) — compounding errors from states the expert never visited. DAgger, which queries the expert on the learner’s own states, closed that gap within two iterations. A depth sweep showed deeper networks did not help Hopper behavior cloning."
            />
            <Assignment
              tag="Assignment 2 · Policy gradients"
              title="Variance reduction for policy gradients"
              built="Implemented reward-to-go, advantage standardization, a learned value-function baseline and Generalized Advantage Estimation, and ran experiments on CartPole, InvertedPendulum, LunarLander, HalfCheetah and Hopper."
              insight="Reward-to-go was more stable than trajectory returns and standardization sped up convergence. On InvertedPendulum the smallest batch that still solved the task was 200 at learning rate 0.02. HalfCheetah reached an average return of 284.78 with a 50,000-step batch. On Hopper, λ = 0 stalled far below the other settings, and λ = 1 gave the most stable return."
            />
          </Course>
        </div>
      </Container>
    </section>
  );
}