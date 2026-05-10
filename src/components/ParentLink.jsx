// ParentLink — 화면 하단 부모님 화면 진입 보조 링크.
// props: { onOpen } — Phase 3 에서 화면 6 라우팅으로 교체 예정 (현재는 토스트만).

export default function ParentLink({ onOpen }) {
  return (
    <div className="w-full text-center">
      <button
        type="button"
        onClick={onOpen}
        className="min-h-[48px] px-4 text-label text-white/70 underline
                   focus-visible:outline-none focus-visible:shadow-focus-ring rounded-button"
      >
        👨‍👩‍👧 부모님 화면 보기
      </button>
    </div>
  );
}
