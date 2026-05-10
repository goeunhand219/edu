// MissionCard — 이번 주 마법 임무 카드 + 진행률 바.
// props: { title, progress, progressText, onOpen }
// 진행률 바: bg-white/20 트랙 + bg-magic-gold 채움. width 는 inline style.

export default function MissionCard({ title, progress, progressText, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full min-h-[48px] bg-white/10 border border-magic-gold/60 rounded-card p-4 text-left
                 transition-all duration-200 hover:bg-white/15
                 focus-visible:outline-none focus-visible:shadow-focus-ring"
    >
      <div className="text-label text-magic-cream">🎯 이번 주 마법 임무</div>
      <div className="text-body text-white mt-1">"{title}"</div>

      {/* 진행률 바 */}
      <div
        className="bg-white/20 h-2 rounded-full overflow-hidden mt-3"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="이번 주 임무 진행률"
      >
        <div
          className="bg-magic-gold h-full rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-label text-magic-cream mt-1">
        진행 {progress}% ({progressText})
      </div>
    </button>
  );
}
