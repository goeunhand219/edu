// LessonCard — 오늘의 마법 수업 카드. props: { title, onOpen }
// 클릭 가능한 카드 — onOpen 으로 토스트 노출 (Phase 3 에서 화면 5 라우팅으로 교체 예정).

export default function LessonCard({ title, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full min-h-[48px] bg-white/10 border border-magic-gold/60 rounded-card p-4 text-left
                 transition-all duration-200 hover:bg-white/15
                 focus-visible:outline-none focus-visible:shadow-focus-ring"
    >
      <div className="text-label text-magic-cream">📚 오늘의 마법 수업</div>
      <div className="text-body text-white mt-1">"{title}"</div>
      <div className="text-body text-magic-gold mt-2 text-right">수업 들으러 가기 →</div>
    </button>
  );
}
