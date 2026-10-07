import Reveal from './Reveal.jsx';

export default function PullQuote({ children, className = '' }) {
  return (
    <Reveal as="blockquote" className={`border-l-2 border-accent pl-5 text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium leading-snug text-ink ${className}`}>
      {children}
    </Reveal>
  );
}
