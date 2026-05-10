// PrimaryButton — 마젠타 CTA. disabled / active / pressed 상태.
// HTML disabled 속성은 사용하지 않고 aria-disabled 만 사용 (UI-SPEC accessibility).
// → 키보드 포커스를 유지해 스크린리더가 비활성 상태를 안내할 수 있게 한다.

export default function PrimaryButton({ children, disabled = false, onClick }) {
  const stateClasses = disabled
    ? 'bg-white/20 text-white/40 cursor-not-allowed'
    : 'bg-cta-magenta text-white hover:shadow-cta-hover hover:-translate-y-px active:scale-[0.98]';

  return (
    <button
      type="button"
      aria-disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={[
        'min-h-[48px] w-full px-8',
        'rounded-button text-body font-bold',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:shadow-focus-ring',
        stateClasses,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
