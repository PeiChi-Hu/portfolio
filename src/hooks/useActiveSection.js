import { useEffect, useState } from 'react';

/** Returns the id of the nav section currently crossing the upper part of the viewport. */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.target.offsetTop);
          else visible.delete(e.target.id);
        });
        if (!visible.size) {
          setActive(null);
          return;
        }
        // The section that started lowest on the page among those in the band is the current one.
        const current = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
        setActive(current);
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
