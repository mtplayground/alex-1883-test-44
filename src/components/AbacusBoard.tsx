import { useEffect, useState } from 'react';

import {
  DEFAULT_WIRE_COUNT,
  createAbacusState,
  isValidWireCount,
  resetAbacusState,
  slideAbacusBead,
} from '../domain/abacus';
import type { AbacusState, BeadIndex, WireIndex } from '../domain/abacus';
import { ResetControl } from './ResetControl';
import { ValueReadout } from './ValueReadout';
import { Wire } from './Wire';

export interface AbacusBoardProps {
  readonly wireCount?: number;
  readonly initialState?: AbacusState;
  readonly className?: string;
}

export function AbacusBoard({
  wireCount = DEFAULT_WIRE_COUNT,
  initialState,
  className = '',
}: AbacusBoardProps) {
  if (!isValidWireCount(wireCount)) {
    throw new RangeError('Abacus board wire count must be a positive integer.');
  }

  const [boardState, setBoardState] = useState<AbacusState>(() => {
    if (initialState) {
      return initialState;
    }

    return createAbacusState({ wireCount });
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const stopDragging = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointercancel', stopDragging);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      window.removeEventListener('pointercancel', stopDragging);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [isDragging]);

  const handleBeadSlide = (wireIndex: WireIndex, beadIndex: BeadIndex) => {
    setBoardState((currentState) =>
      slideAbacusBead(currentState, wireIndex, beadIndex),
    );
  };
  const handleReset = () => {
    setIsDragging(false);
    setBoardState((currentState) => resetAbacusState(currentState));
  };

  const displayWires = [...boardState.wires].reverse();

  return (
    <section
      aria-label={`${boardState.wires.length}-wire abacus board`}
      className={['flex w-full flex-col gap-4', className].join(' ')}
      data-wire-count={boardState.wires.length}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <ValueReadout className="sm:flex-1" state={boardState} />
        <ResetControl onReset={handleReset} />
      </div>

      <div className="rounded-lg border-[10px] border-amber-950 bg-stone-200 p-4 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="rounded border border-amber-900/30 bg-stone-100 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-2">
            {displayWires.map((wire) => (
              <Wire
                isDragging={isDragging}
                key={wire.index}
                onBeadDragStart={() => {
                  setIsDragging(true);
                }}
                onBeadSlide={handleBeadSlide}
                wire={wire}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
