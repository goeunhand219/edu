// HelperText — 비활성 안내문 목록. messages: string[]. 빈 배열이면 렌더 안 함.
// role=status + aria-live=polite 로 스크린리더에 변경 사항 부드럽게 안내.

export default function HelperText({ messages }) {
  if (!messages || messages.length === 0) return null;
  return (
    <ul className="flex flex-col gap-1" role="status" aria-live="polite">
      {messages.map((m) => (
        <li key={m} className="text-label text-magic-cream/80">
          {m}
        </li>
      ))}
    </ul>
  );
}
