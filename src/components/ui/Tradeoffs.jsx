/** Real, defensible trade-offs: choice → what it buys → what it costs → what I did about it. */
export default function Tradeoffs({ rows, title = 'Trade-offs' }) {
  return (
    <section aria-label={title}>
      <h4 className="text-[1rem] font-semibold text-ink">{title}</h4>
      <div className="mt-4 overflow-hidden rounded-[18px] border border-line bg-white">
        {rows.map((r, i) => (
          <div key={r.choice} className={`grid gap-2 px-5 py-4 md:grid-cols-[1.1fr_1fr_1fr_1.3fr] md:gap-5 ${i ? 'border-t border-line' : ''}`}>
            <p className="text-[0.95rem] font-semibold text-ink">{r.choice}</p>
            <p className="text-[0.9rem] text-mute"><span className="mr-1 font-semibold text-emerald-700" aria-label="gain">+</span>{r.gain}</p>
            <p className="text-[0.9rem] text-mute"><span className="mr-1 font-semibold text-[#B43C0B]" aria-label="cost">−</span>{r.cost}</p>
            <p className="text-[0.9rem] text-ink/85"><span className="mr-1 text-faint" aria-hidden="true">→</span>{r.resolution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
