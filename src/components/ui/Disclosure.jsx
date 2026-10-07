import { ChevronDown } from 'lucide-react';

/** Native <details> wrapper for engineering depth: keyboard- and screen-reader-friendly. */
export default function Disclosure({ label, hint, children }) {
  return (
    <details className="group rounded-[18px] border border-line bg-white open:shadow-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[0.98rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        <span>
          {label}
          {hint && <span className="ml-2 font-normal text-faint">· {hint}</span>}
        </span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-faint transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-line px-5 py-6">{children}</div>
    </details>
  );
}
