/** Quiet surface used to frame a diagram. */
export default function Panel({ children, className = '', label }) {
  return (
    <figure className={`rounded-[28px] border border-line bg-white/70 p-5 sm:p-8 ${className}`}>
      {children}
      {label && <figcaption className="mt-6 text-center text-sm text-faint">{label}</figcaption>}
    </figure>
  );
}
