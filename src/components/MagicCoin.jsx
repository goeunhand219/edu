// MagicCoin — 단일 동전 (idle / hover-rotate / selected / dimmed).
// 동전 본체 80x80, 골드 그라데이션, idle "breathing" float.
// 선택 시: 회전 멈춤 + 골드 글로우 + 1.1배 확대.
// 비선택 동전 (다른 게 선택됨): opacity 0.4 로 흐려짐.
// role=radio 로 a11y 그룹 의미 유지, focus-visible 시안 링.

export default function MagicCoin({ emoji, label, attributeKey, isSelected, isDimmed, onSelect }) {
  // 선택 안 된 상태에서만 hover 회전 적용. 선택된 동전은 회전 멈춤.
  const hoverRotateClasses = !isSelected
    ? 'hover:animate-coin-spin hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
    : '';
  const coinStateClasses = isSelected
    ? 'shadow-coin-selected scale-110'
    : 'animate-float';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`${label} 마법`}
      onClick={() => onSelect(attributeKey)}
      className={[
        'min-h-[48px] min-w-[48px]',
        'flex flex-col items-center gap-2',
        'bg-transparent border-0 p-0 cursor-pointer',
        'focus-visible:outline-none focus-visible:shadow-focus-ring rounded-full',
        'transition-opacity duration-300',
        isDimmed ? 'opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      <span
        className={[
          'w-20 h-20 rounded-full bg-coin-gold relative',
          'flex items-center justify-center',
          'transition-all duration-300 ease-out',
          coinStateClasses,
          hoverRotateClasses,
        ].join(' ')}
        style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
      >
        <span className="text-[40px] leading-none select-none" aria-hidden="true">
          {emoji}
        </span>
      </span>
      <span className="text-label text-white">{label}</span>
    </button>
  );
}
