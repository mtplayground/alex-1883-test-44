import type { KeyboardEventHandler, PointerEventHandler } from 'react';

import type { BeadIndex } from '../domain/abacus';

export interface BeadProps {
  readonly index: BeadIndex;
  readonly isActive?: boolean;
  readonly className?: string;
  readonly onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  readonly onPointerDown?: PointerEventHandler<HTMLButtonElement>;
  readonly onPointerEnter?: PointerEventHandler<HTMLButtonElement>;
}

export function Bead({
  index,
  isActive = false,
  className = '',
  onKeyDown,
  onPointerDown,
  onPointerEnter,
}: BeadProps) {
  const stateClasses = isActive
    ? 'border-teal-900 bg-teal-600 shadow-[inset_-10px_-8px_14px_rgb(15_118_110_/_45%),inset_8px_7px_12px_rgb(255_255_255_/_28%)]'
    : 'border-slate-800 bg-slate-500 shadow-[inset_-10px_-8px_14px_rgb(30_41_59_/_45%),inset_8px_7px_12px_rgb(255_255_255_/_24%)]';

  return (
    <button
      aria-pressed={isActive}
      type="button"
      aria-label={`Bead ${index + 1}, ${isActive ? 'active' : 'inactive'}`}
      className={[
        'relative z-10 h-[clamp(1.25rem,6vw,2.5rem)] w-[clamp(1.25rem,6vw,2.5rem)] shrink-0 rounded-full border',
        'cursor-grab touch-none transition-[background-color,box-shadow,transform] duration-150 active:cursor-grabbing active:scale-95 hover:scale-105',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700',
        'hover:ring-2 hover:ring-teal-300 hover:ring-offset-1 hover:ring-offset-stone-100',
        stateClasses,
        className,
      ].join(' ')}
      data-active={isActive}
      data-bead-index={index}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
    />
  );
}
