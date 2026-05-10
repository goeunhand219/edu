// BackButton — 좌상단 ← 돌아가기. 클릭 시 onBack 호출.
// 터치 타깃 ≥48px (PLAT-02). 텍스트 cream, 투명 배경.

export default function BackButton({ onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="뒤로 가기"
      className={[
        'inline-flex items-center gap-1',
        'min-h-[48px] px-3 py-2',
        'text-body text-magic-cream',
        'bg-transparent border-0 cursor-pointer',
        'rounded-card',
        'focus-visible:outline-none focus-visible:shadow-focus-ring',
      ].join(' ')}
    >
      <span aria-hidden="true">←</span>
      <span>돌아가기</span>
    </button>
  );
}
