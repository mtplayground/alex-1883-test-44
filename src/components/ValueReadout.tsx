import { computeAbacusValue } from '../domain/abacus';
import type { AbacusState } from '../domain/abacus';

export interface ValueReadoutProps {
  readonly state: AbacusState;
  readonly className?: string;
}

const numberFormatter = new Intl.NumberFormat('en-US');

export function ValueReadout({ state, className = '' }: ValueReadoutProps) {
  const value = computeAbacusValue(state);

  return (
    <output
      aria-label={`Current abacus value is ${value}`}
      aria-live="polite"
      className={[
        'flex w-full items-end justify-between gap-4 rounded border border-slate-200 bg-white px-4 py-3 shadow-sm',
        className,
      ].join(' ')}
    >
      <span className="text-sm font-semibold uppercase tracking-normal text-slate-600">
        Current value
      </span>
      <span className="font-mono text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
        {numberFormatter.format(value)}
      </span>
    </output>
  );
}
