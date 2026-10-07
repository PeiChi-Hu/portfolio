import { motion } from 'framer-motion';
import { ease } from './Reveal.jsx';

/**
 * The engineering path: what was tried, where it hit a limit, what changed the direction, and how it was validated.
 * step.kind: 'tried' | 'limit' | 'insight' | 'decision' | 'validated'
 */
const kinds = {
  tried: { label: 'Tried', dot: 'bg-white border-ink/40', text: 'text-faint' },
  limit: { label: 'Hit a limit', dot: 'bg-[#C2410C] border-[#C2410C]', text: 'text-[#B43C0B]' },
  insight: { label: 'Insight', dot: 'bg-accent border-accent', text: 'text-accent' },
  decision: { label: 'Decision', dot: 'bg-ink border-ink', text: 'text-ink' },
  validated: { label: 'Validated', dot: 'bg-emerald-600 border-emerald-600', text: 'text-emerald-700' },
};

export default function ReasoningPath({ title = 'Engineering path', steps, aside, log = false }) {
  if (log) {
    return (
      <ol className="space-y-4" aria-label={title}>
        {steps.map((s) => {
          const k = kinds[s.kind];
          return (
            <li key={s.title} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.12em] sm:pt-1 ${k.text}`}>{k.label}</span>
              <div>
                <p className="text-[0.95rem] font-medium leading-snug text-ink">{s.title}</p>
                {s.detail && <p className="mt-1 text-[0.88rem] leading-relaxed text-mute">{s.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <section aria-label={title} className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h4 className="text-[1.25rem] font-semibold tracking-tight text-ink">{title}</h4>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Legend">
          {Object.values(kinds).map((k) => (
            <li key={k.label} className="flex items-center gap-1.5 text-[0.78rem] text-mute">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full border ${k.dot}`} />
              {k.label}
            </li>
          ))}
        </ul>
        {aside && <div className="mt-8 hidden lg:block">{aside}</div>}
      </div>
      <ol className="relative lg:col-span-8">
        <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
        {steps.map((s, i) => {
          const k = kinds[s.kind];
          const strong = s.kind === 'insight' || s.kind === 'decision';
          return (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, ease, delay: Math.min(i, 4) * 0.04 }}
              className="relative pb-7 pl-8 last:pb-0"
            >
              <span aria-hidden="true" className={`absolute left-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border-2 ${k.dot}`} />
              <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${k.text}`}>{k.label}</p>
              <div className={strong ? `mt-2 rounded-xl px-4 py-3 ${s.kind === 'insight' ? 'bg-accent/[0.06]' : 'bg-mist'}` : 'mt-1'}>
                <p className={`text-[1.02rem] leading-snug ${strong ? 'font-semibold text-ink' : 'font-medium text-ink/90'}`}>{s.title}</p>
                {s.detail && <p className="mt-1.5 text-[0.93rem] leading-relaxed text-mute">{s.detail}</p>}
              </div>
            </motion.li>
          );
        })}
      </ol>
      {aside && <div className="lg:hidden">{aside}</div>}
    </section>
  );
}
