import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { ease } from './Reveal.jsx';

/**
 * Sequence of nodes joined by arrows.
 * direction: 'responsive' (vertical on mobile, horizontal from md), 'vertical', 'horizontal'
 * steps: [{ label, sub?, tone?: 'default' | 'muted' | 'accent' | 'bad' }]
 */
export default function FlowDiagram({ steps, direction = 'responsive', ariaLabel, className = '', compact = false }) {
  const isResp = direction === 'responsive';
  const isVert = direction === 'vertical';
  const listClass = isVert
    ? 'flex flex-col items-stretch'
    : isResp
      ? 'flex flex-col items-stretch md:flex-row md:items-stretch'
      : 'flex flex-row items-stretch';

  const tones = {
    default: 'border-line bg-white text-ink',
    muted: 'border-line bg-mist/60 text-mute',
    accent: 'border-accent/30 bg-accent/[0.05] text-accent',
    bad: 'border-line bg-white text-faint line-through decoration-faint/60',
    ink: 'border-ink bg-ink text-white',
  };

  return (
    <ol className={`${listClass} ${className}`} aria-label={ariaLabel}>
      {steps.map((s, i) => (
        <li key={s.label} className={`flex ${isVert ? 'flex-col' : isResp ? 'flex-col md:flex-row' : 'flex-row'} ${isVert ? '' : 'md:flex-1'} items-center`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, ease, delay: i * 0.08 }}
            className={`w-full rounded-2xl border ${compact ? 'px-3 py-2.5' : 'px-4 py-4'} text-center shadow-soft ${tones[s.tone ?? 'default']} ${isVert ? '' : 'md:h-full md:flex md:flex-col md:justify-center'}`}
          >
            <span className={`block font-semibold ${compact ? 'text-[0.9rem]' : 'text-[0.98rem]'} leading-snug`}>{s.label}</span>
            {s.sub && <span className="mt-1 block text-[0.8rem] leading-snug text-faint no-underline">{s.sub}</span>}
          </motion.div>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="flex shrink-0 items-center justify-center p-1.5 text-faint">
              {isVert ? (
                <ArrowDown className="h-4 w-4" />
              ) : isResp ? (
                <>
                  <ArrowDown className="h-4 w-4 md:hidden" />
                  <ArrowRight className="hidden h-4 w-4 md:block" />
                </>
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
