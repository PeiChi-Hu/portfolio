import { motion } from 'framer-motion';
import { ease } from './Reveal.jsx';

/**
 * How the solution evolved, in four beats. The turning point is the visual focus.
 * beats: [{ label, text, focus? }]
 */
export default function SolutionArc({ beats, title = 'How the solution evolved' }) {
  return (
    <section aria-label={title}>
      <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-faint">{title}</h4>
      <ol className="mt-5 grid gap-3 md:grid-cols-4 md:gap-0">
        {beats.map((b, i) => (
          <motion.li
            key={b.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, ease, delay: i * 0.08 }}
            className={`relative flex flex-col p-5 md:p-6 ${
              b.focus
                // ? 'rounded-[20px] bg-ink text-white md:-my-3'
                ? 'rounded-[20px] border-2 border-accent !text-ink shadow-soft md:-my-3'
                : 'rounded-[20px] border border-line bg-white md:rounded-none md:border-0 md:border-t md:border-line md:bg-transparent'
            }`}
          >
            <span className={`font-mono text-[0.72rem] ${b.focus ? 'text-accent' : 'text-faint'}`}>0{i + 1}</span>
            <span className={`mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.12em] ${b.focus ? 'text-[#3B82F6]' : 'text-ink'}`}>
              {b.label}
            </span>
            <p className={`mt-3 leading-relaxed ${b.focus ? 'text-[1.05rem] font-medium text-accent' : 'text-[0.95rem] text-mute'}`}>{b.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
