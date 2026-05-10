// ToastMessage — 화면 하단 임시 안내 토스트.
// props: { message, visible } — 부모가 visible 토글 (1.8s 후 자동 사라짐).
// "다음 업데이트에서 만나요!" 같은 placeholder 안내용.
// pointer-events-none + role="status" + aria-live="polite" — 인터랙션 방해 없이 스크린리더 알림.

export default function ToastMessage({ message, visible }) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute left-1/2 -translate-x-1/2 bottom-20 z-30 pointer-events-none
                 bg-white/10 border border-magic-gold/60 rounded-card px-4 py-2
                 text-body text-white
                 transition-opacity duration-300"
    >
      {message}
    </div>
  );
}
