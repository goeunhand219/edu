// RecordTextField — 품목 텍스트 입력. 라벨 위 + 반투명 흰색 input.
// 한글 IME 입력 보존을 위해 단순 controlled input (React 19 가 IME 처리).
// 골드 60% 테두리, 포커스 시 시안 글로우 (UI-SPEC sub-accent).

export default function RecordTextField({ id, label, value, onChange, placeholder = '' }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className="text-body text-magic-cream">{label}</span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          'min-h-[48px] w-full px-3 py-2',
          'rounded-card bg-white/15 border border-magic-gold/60',
          'text-body text-white placeholder-white/40',
          'focus:outline-none focus:border-magic-cyan focus:shadow-[0_0_12px_rgba(34,211,238,0.5)]',
          'transition-shadow motion-reduce:transition-none',
        ].join(' ')}
      />
    </label>
  );
}
