import { ChevronDown } from 'lucide-react';

/** Progressive disclosure for depth. Native <details> keeps it keyboard- and screen-reader-friendly. */
export default function EngineeringNotes({ items, label = 'Engineering notes' }) {
  return (
    <details className="group rounded-[18px] border border-line bg-white open:shadow-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[0.98rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        <span>
          {label}
          <span className="ml-2 font-normal text-faint">· {items.length} details for engineers</span>
        </span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-faint transition-transform group-open:rotate-180" />
      </summary>
      <dl className="grid gap-x-10 gap-y-5 border-t border-line px-5 py-5 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.k}>
            <dt className="text-[0.88rem] font-semibold text-ink">{it.k}</dt>
            <dd className="mt-1 text-[0.9rem] leading-relaxed text-mute">{it.v}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

/** Same notes as a plain grid, for use inside another disclosure. */
export function NotesGrid({ items }) {
  return (
    <dl className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      {items.map((it) => (
        <div key={it.k}>
          <dt className="text-[0.88rem] font-semibold text-ink">{it.k}</dt>
          <dd className="mt-1 text-[0.9rem] leading-relaxed text-mute">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}
