// FloatingCharacter — 선택 속성의 큰 emoji 가 위아래 ±6px, 3초 주기로 떠다닌다.
// props: { emoji, label }
// emoji 자체에는 색 필터 적용 금지 (5속성 색은 CharacterCard 1곳만).
// prefers-reduced-motion 은 src/index.css 글로벌 룰이 자동 차단.

export default function FloatingCharacter({ emoji, label }) {
  return (
    <div
      className="w-full h-[120px] flex items-center justify-center"
      role="img"
      aria-label={`${label} 마법사 캐릭터`}
    >
      <span
        className="animate-float-character select-none"
        style={{ fontSize: '72px', lineHeight: 1 }}
      >
        {emoji}
      </span>
    </div>
  );
}
