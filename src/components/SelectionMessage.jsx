// SelectionMessage — 선택 후 1초간 떠있는 풀스크린 오버레이.
// title (32px, white + 속성 색 textShadow glow halo) + subtitle (16px, cream).
// pointer-events-none 로 다른 인터랙션 차단 + fadeIn 애니메이션.

export default function SelectionMessage({ attribute }) {
  if (!attribute) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-magic-bg-deep/80 backdrop-blur-sm flex items-center justify-center animate-fade-in pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="text-center px-6">
        <p
          className="text-display font-bold text-white"
          style={{ textShadow: `0 0 24px ${attribute.color}, 0 0 48px ${attribute.color}` }}
        >
          {attribute.title}
        </p>
        <p className="text-body text-magic-cream mt-4">{attribute.subtitle}</p>
      </div>
    </div>
  );
}
