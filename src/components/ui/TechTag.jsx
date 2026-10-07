export default function TechTag({ children, tone = 'default' }) {
  const tones = {
    default: 'border-line bg-white text-mute',
    quiet: 'border-transparent bg-mist text-mute',
    accent: 'border-accent/20 bg-accent/[0.06] text-accent',
  };
  return (
    <li className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.8rem] font-medium ${tones[tone]}`}>
      {children}
    </li>
  );
}

export function TagList({ items, tone, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {items.map((t) => (
        <TechTag key={t} tone={tone}>
          {t}
        </TechTag>
      ))}
    </ul>
  );
}
