import { BEADS_PER_WIRE, isValidActiveBeadCount } from '../domain/abacus';
import type { BeadIndex, WireIndex, WireState } from '../domain/abacus';
import { Bead } from './Bead';

export type WireBeadInteractionHandler = (
  wireIndex: WireIndex,
  beadIndex: BeadIndex,
) => void;

export interface WireProps {
  readonly wire: WireState;
  readonly className?: string;
  readonly isDragging?: boolean;
  readonly onBeadDragStart?: () => void;
  readonly onBeadSlide?: WireBeadInteractionHandler;
}

const BEAD_INDEXES = Array.from(
  { length: BEADS_PER_WIRE },
  (_, index) => index as BeadIndex,
);

export function Wire({
  wire,
  className = '',
  isDragging = false,
  onBeadDragStart,
  onBeadSlide,
}: WireProps) {
  if (!isValidActiveBeadCount(wire.activeBeadCount)) {
    throw new RangeError('Wire active bead count is outside the bead range.');
  }

  const activeBeads = BEAD_INDEXES.slice(0, wire.activeBeadCount);
  const inactiveBeads = BEAD_INDEXES.slice(wire.activeBeadCount);
  const renderBead = (beadIndex: BeadIndex, isActive = false) => (
    <Bead
      index={beadIndex}
      isActive={isActive}
      key={beadIndex}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }

        event.preventDefault();
        onBeadSlide?.(wire.index, beadIndex);
      }}
      onPointerDown={(event) => {
        event.preventDefault();
        onBeadDragStart?.();
        onBeadSlide?.(wire.index, beadIndex);
      }}
      onPointerEnter={() => {
        if (!isDragging) {
          return;
        }

        onBeadSlide?.(wire.index, beadIndex);
      }}
    />
  );

  return (
    <div
      aria-label={`Decimal place ${wire.decimalPlace}, ${wire.activeBeadCount} active beads`}
      className={[
        'relative flex min-h-[clamp(2.75rem,11vw,3.5rem)] w-full items-center py-1.5 sm:py-2',
        className,
      ].join(' ')}
      data-active-bead-count={wire.activeBeadCount}
      data-wire-index={wire.index}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-700"
      />
      <div className="relative z-10 flex w-full items-center gap-1">
        <div className="flex min-w-0 items-center gap-0.5 sm:gap-1.5">
          {activeBeads.map((beadIndex) => renderBead(beadIndex, true))}
        </div>
        <div className="min-w-3 flex-1" />
        <div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1.5">
          {inactiveBeads.map((beadIndex) => renderBead(beadIndex))}
        </div>
      </div>
    </div>
  );
}
