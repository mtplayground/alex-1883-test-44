import { BEADS_PER_WIRE, isValidActiveBeadCount } from '../domain/abacus';
import type { BeadIndex, WireState } from '../domain/abacus';
import { Bead } from './Bead';

export interface WireProps {
  readonly wire: WireState;
  readonly className?: string;
}

const BEAD_INDEXES = Array.from(
  { length: BEADS_PER_WIRE },
  (_, index) => index as BeadIndex,
);

export function Wire({ wire, className = '' }: WireProps) {
  if (!isValidActiveBeadCount(wire.activeBeadCount)) {
    throw new RangeError('Wire active bead count is outside the bead range.');
  }

  const activeBeads = BEAD_INDEXES.slice(0, wire.activeBeadCount);
  const inactiveBeads = BEAD_INDEXES.slice(wire.activeBeadCount);

  return (
    <div
      aria-label={`Decimal place ${wire.decimalPlace}, ${wire.activeBeadCount} active beads`}
      className={[
        'relative flex min-h-14 w-full items-center gap-4 py-2',
        className,
      ].join(' ')}
      data-active-bead-count={wire.activeBeadCount}
      data-wire-index={wire.index}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-700"
      />
      <div className="relative z-10 flex min-w-0 flex-1 items-center gap-1.5">
        {activeBeads.map((beadIndex) => (
          <Bead index={beadIndex} isActive key={beadIndex} />
        ))}
      </div>
      <div className="relative z-10 flex min-w-0 flex-1 items-center justify-end gap-1.5">
        {inactiveBeads.map((beadIndex) => (
          <Bead index={beadIndex} key={beadIndex} />
        ))}
      </div>
    </div>
  );
}
