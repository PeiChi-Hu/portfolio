import { motion } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1];

/** Subtle fade + rise when scrolled into view. Reduced motion is handled globally by <MotionConfig>. */
export default function Reveal({ as = 'div', delay = 0, y = 18, className = '', children, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
