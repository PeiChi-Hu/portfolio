import Reveal from './Reveal.jsx';
import { TagList } from './TechTag.jsx';

/**
 * Level-1 scan block for a Selected Work case.
 * category (small) → technical title → subtitle → [visual | metrics + ownership] → secondary tech tags.
 * `media` can be any diagram, or an <img> once a photo you own is available.
 */
export default function CaseIntro({ num, category, titleId, title, subtitle, media, metrics = [], context, role, tags }) {
  return (
    <header>
      <Reveal as="p" className="eyebrow mb-4">
        <span className="mr-2 font-mono text-ink">{num}</span>
        {category}
      </Reveal>
      <Reveal as="h3" id={titleId} delay={0.04} className="text-[clamp(1.9rem,4vw,2.1rem)] font-semibold leading-[1.08] tracking-tightest text-ink text-balance">
        {title}
      </Reveal>
      <Reveal as="p" delay={0.08} className="mt-4 max-w-3xl text-[clamp(1.05rem,1.5vw,1.22rem)] leading-relaxed text-mute">
        {subtitle}
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-7">
          {media}
        </Reveal>
        <Reveal delay={0.14} className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-5">
          {metrics.length > 0 && (
            <dl className="grid grid-cols-2 gap-6">
              {metrics.map((m) => (
                <div key={m.label} className={metrics.length === 1 ? 'col-span-2' : ''}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-[clamp(2.2rem,4.4vw,3.2rem)] font-semibold leading-none tracking-tight text-ink tabular-nums">{m.value}</span>
                    <span className="mt-2 block text-[0.9rem] leading-snug text-mute">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <dl className="space-y-5 border-t border-line pt-6">
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-faint">System context</dt>
              <dd className="mt-1.5 text-[0.96rem] leading-relaxed text-ink/85">{context}</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-accent">My contribution</dt>
              <dd className="mt-1.5 text-[0.96rem] leading-relaxed text-ink">{role}</dd>
            </div>
          </dl>
          {tags && <TagList tone="quiet" items={tags} />}
        </Reveal>
      </div>
    </header>
  );
}
