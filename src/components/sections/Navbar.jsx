import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Menu, X } from 'lucide-react';
import { navLinks, site } from '../../data/site.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons.jsx';

const ids = navLinks.map((l) => l.id);

function IconLink({ href, label, children, external = true }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-mist hover:text-ink"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-b border-line/80 bg-paper/80 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-page items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#top" className="text-[0.98rem] font-semibold tracking-tight text-ink">
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-[0.86rem] transition-colors ${
                    isActive ? 'text-ink' : 'text-mute hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-mist"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <div className="hidden items-center sm:flex">
            <IconLink href={site.github} label="GitHub">
              <GitHubIcon className="h-[18px] w-[18px]" />
            </IconLink>
            <IconLink href={site.linkedin} label="LinkedIn">
              <LinkedInIcon className="h-[17px] w-[17px]" />
            </IconLink>
            <IconLink href={`mailto:${site.email}`} label={`Email ${site.email}`} external={false}>
              <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
            </IconLink>
          </div>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex h-8 items-center rounded-full bg-ink px-4 text-[0.82rem] font-medium text-white transition-colors hover:bg-black"
          >
            Resume<span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <button
            type="button"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="px-5 pb-4 pt-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line/70 py-3 text-lg ${active === l.id ? 'text-ink' : 'text-mute'}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-2 pt-4">
                <IconLink href={site.github} label="GitHub">
                  <GitHubIcon className="h-5 w-5" />
                </IconLink>
                <IconLink href={site.linkedin} label="LinkedIn">
                  <LinkedInIcon className="h-5 w-5" />
                </IconLink>
                <IconLink href={`mailto:${site.email}`} label={`Email ${site.email}`} external={false}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </IconLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
