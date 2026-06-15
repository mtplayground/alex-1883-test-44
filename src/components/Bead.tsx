import type { BeadIndex } from '../domain/abacus';

export interface BeadProps {
  readonly index: BeadIndex;
  readonly isActive?: boolean;
  readonly className?: string;
}

export function Bead({ index, isActive = false, className = '' }: BeadProps) {
  const stateClasses = isActive
    ? 'border-teal-900 bg-teal-600 shadow-[inset_-10px_-8px_14px_rgb(15_118_110_/_45%),inset_8px_7px_12px_rgb(255_255_255_/_28%)]'
    : 'border-slate-800 bg-slate-500 shadow-[inset_-10px_-8px_14px_rgb(30_41_59_/_45%),inset_8px_7px_12px_rgb(255_255_255_/_24%)]';

  return (
    <div
      aria-label={`Bead ${index + 1}, ${isActive ? 'active' : 'inactive'}`}
      className={[
        'relative z-10 h-9 w-9 shrink-0 rounded-full border',
        'transition-colors duration-150 sm:h-10 sm:w-10',
        stateClasses,
        className,
      ].join(' ')}
      data-active={isActive}
      data-bead-index={index}
    />
  );
}
