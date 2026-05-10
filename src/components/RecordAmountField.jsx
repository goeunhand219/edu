// RecordAmountField — 금액 숫자 입력 + 자동 콤마 포맷 + 우측 "원" 접미사.
// REC-01: 숫자만 허용. 표시는 콤마 (toLocaleString('ko-KR')). 부모 state 는 raw number.
// 빈 입력 = 0. 콤마/공백/한글 등은 입력 시 자동 제거 후 다시 포맷.
// inputMode="numeric" + pattern="[0-9,]*" 로 모바일 숫자 키패드 유도.

export default function RecordAmountField({ id, label, value, onChange }) {
  // value 는 number (0 이면 빈 표시).
  const display = value > 0 ? value.toLocaleString('ko-KR') : '';

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw === '') {
      onChange(0);
      return;
    }
    const n = Number(raw);
    if (Number.isNaN(n)) {
      onChange(0);
      return;
    }
    onChange(n);
  };

  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className="text-body text-magic-cream">{label}</span>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          value={display}
          onChange={handleChange}
          className={[
            'min-h-[48px] w-full pl-3 pr-10 py-2',
            'rounded-card bg-white/15 border border-magic-gold/60',
            'text-body text-white placeholder-white/40',
            'focus:outline-none focus:border-magic-cyan focus:shadow-[0_0_12px_rgba(34,211,238,0.5)]',
            'transition-shadow motion-reduce:transition-none',
          ].join(' ')}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-body text-magic-cream pointer-events-none"
          aria-hidden="true"
        >
          원
        </span>
      </div>
    </label>
  );
}
