// CharacterCard — 선택 속성 + 레벨 + 마법 동전 수.
// props: { attribute, level, coins }
//   attribute: ATTRIBUTES.find() 결과 객체 ({ emoji, label, color, ... })
// 5속성 색은 좌측 작은 dot 한 곳에만 사용 (UI-SPEC: 5속성 색은 1곳 제한).

export default function CharacterCard({ attribute, level, coins }) {
  return (
    <div className="bg-white/10 border border-magic-gold/60 rounded-card p-4">
      {/* 1행: 속성 dot + 라벨 + 레벨 */}
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: attribute.color, boxShadow: `0 0 8px ${attribute.color}` }}
        />
        <span className="text-body font-bold text-white">
          {attribute.emoji} {attribute.label} 마법사 Lv.{level}
        </span>
      </div>

      {/* 2행: 마법 동전 수 */}
      <div className="text-body text-magic-cream mt-2">
        <span className="text-magic-gold">🪙</span> 마법 동전 {coins}개
      </div>
    </div>
  );
}
