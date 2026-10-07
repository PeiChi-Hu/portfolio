import { ArrowDown } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';

const chain = ['ROS Navigation', 'Kinematic Model', 'UART', 'STM32', 'PWM', 'Motors'];

function Rail({ kind, label }) {
  // Draws the encoder-feedback return path in a column beside the control chain.
  const line = 'absolute bg-accent/70';
  return (
    <div aria-hidden="true" className="relative w-12 self-stretch sm:w-16">
      {kind === 'start' && (
        <>
          <span className={`${line} left-0 top-1/2 h-px w-5`} />
          <span className="absolute left-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[4px] border-r-[6px] border-y-transparent border-r-accent" />
          <span className={`${line} bottom-0 left-5 top-1/2 w-px`} />
        </>
      )}
      {kind === 'through' && <span className={`${line} bottom-0 left-5 top-0 w-px`} />}
      {kind === 'end' && (
        <>
          <span className={`${line} left-5 top-0 h-1/2 w-px`} />
          <span className={`${line} left-0 top-1/2 h-px w-5`} />
        </>
      )}
      {label && (
        <span className="absolute left-7 top-1/2 -translate-y-1/2 text-[0.7rem] font-medium leading-tight text-accent">
          Encoder
          <br />
          feedback
        </span>
      )}
    </div>
  );
}

export function ControlLoop() {
  const from = chain.indexOf('STM32');
  const to = chain.indexOf('Motors');
  const kindFor = (i) => (i === from ? 'start' : i === to ? 'end' : i > from && i < to ? 'through' : null);
  return (
    <figure className="rounded-[20px] border border-line bg-paper p-5 sm:p-6">
      <ol
        aria-label="Control stack: ROS Navigation, Kinematic Model, UART, STM32, PWM, Motors, with encoder feedback returning from the motors to the STM32."
        className="mx-auto max-w-sm"
      >
        {chain.map((c, i) => (
          <li key={c}>
            <div className="flex items-stretch">
              <Reveal
                delay={i * 0.06}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-center text-[0.95rem] font-medium ${
                  c === 'STM32' ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink'
                }`}
              >
                {c}
              </Reveal>
              <Rail kind={kindFor(i)} />
            </div>
            {i < chain.length - 1 && (
              <div className="flex items-stretch" aria-hidden="true">
                <div className="flex flex-1 justify-center py-1">
                  <ArrowDown className="h-4 w-4 text-faint" />
                </div>
                <Rail kind={i >= from && i < to ? 'through' : null} label={i === from} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

