export interface ResetControlProps {
  readonly onReset: () => void;
  readonly className?: string;
}

export function ResetControl({ onReset, className = '' }: ResetControlProps) {
  return (
    <button
      className={[
        'inline-flex min-h-14 shrink-0 items-center justify-center rounded border border-slate-300 bg-slate-950 px-5 text-sm font-semibold uppercase tracking-normal text-white shadow-sm',
        'transition-colors duration-150 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700',
        className,
      ].join(' ')}
      onClick={onReset}
      type="button"
    >
      Reset
    </button>
  );
}
