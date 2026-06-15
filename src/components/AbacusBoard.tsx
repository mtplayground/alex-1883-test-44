import { useState } from 'react';

import {
  DEFAULT_WIRE_COUNT,
  createAbacusState,
  isValidWireCount,
} from '../domain/abacus';
import type { AbacusState } from '../domain/abacus';
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

  const [boardState] = useState<AbacusState>(() => {
    if (initialState) {
      return initialState;
    }

    return createAbacusState({ wireCount });
  });

  const displayWires = [...boardState.wires].reverse();

  return (
    <section
      aria-label={`${boardState.wires.length}-wire abacus board`}
      className={['w-full', className].join(' ')}
      data-wire-count={boardState.wires.length}
    >
      <div className="rounded-lg border-[10px] border-amber-950 bg-stone-200 p-4 shadow-xl shadow-slate-950/20 sm:p-6">
        <div className="rounded border border-amber-900/30 bg-stone-100 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-2">
            {displayWires.map((wire) => (
              <Wire key={wire.index} wire={wire} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
