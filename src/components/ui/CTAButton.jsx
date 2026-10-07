import { ArrowUpRight } from 'lucide-react';

/** Link styled as a button. variant: 'primary' | 'secondary' | 'ghost' */
export default function CTAButton({ href, children, variant = 'primary', external = false, icon = null, className = '', ...rest }) {
  const variants = {
    primary: 'bg-ink text-white hover:bg-black',
    secondary: 'border border-line bg-white text-ink hover:border-ink/30',
    ghost: 'text-accent hover:text-ink',
  };
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[0.95rem] font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...ext}
      {...rest}
    >
      {icon}
      {children}
      {external && variant !== 'primary' && <ArrowUpRight aria-hidden="true" className="h-4 w-4 opacity-60" />}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
