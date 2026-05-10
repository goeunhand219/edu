// EmotionSticker — 단일 감정 스티커 (선택 / 흐림 / 포커스 상태).
// MagicCoin 의 role=radio + aria-checked + shadow-coin-selected/scale-110 패턴 차용.
// 박스 형태: rounded-card, 반투명 흰색 배경, 골드 테두리. 선택 시 1.1배 + 골드 글로우.
// 터치 타깃 ≥48px (PLAT-02). focus-visible 시안 링.
// prefers-reduced-motion: transition duration 자동 단축은 Tailwind 기본이 아니므로
// motion-reduce:transition-none 으로 명시.

export default function EmotionSticker({ emoji, label, emotionKey, isSelected, isDimmed, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`${label} 감정`}
      onClick={() => onSelect(emotionKey)}
      className={[
        'min-h-[88px] min-w-[88px] px-2 py-3',
        'flex flex-col items-center justify-center gap-1',
        'rounded-card bg-white/10 border border-magic-gold/60',
        'text-white cursor-pointer',
        'transition-all duration-300 ease-out motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:shadow-focus-ring',
        isSelected ? 'scale-110 shadow-coin-selected' : '',
        isDimmed ? 'opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      <span className="text-[32px] leading-none select-none" aria-hidden="true">{emoji}</span>
      <span className="text-label leading-tight text-center">{label}</span>
    </button>
  );
}
