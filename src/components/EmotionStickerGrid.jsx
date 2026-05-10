// EmotionStickerGrid — 5종 감정 스티커 라디오그룹.
// 그리드: 1줄 3개 + 2줄 2개. PRD PART 3 와이어프레임 그대로.
// value: 현재 선택된 emotion key (or null). onChange(key) 호출.
// 단일 선택 시 나머지 4개는 isDimmed=true (opacity 0.4)로 흐려진다 — MagicCoin 패턴 차용.

import { EMOTIONS } from '../data/emotions';
import EmotionSticker from './EmotionSticker';

export default function EmotionStickerGrid({ value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="구매 시 감정 선택"
      className="grid grid-cols-3 gap-2 justify-items-center"
    >
      {EMOTIONS.map((e) => (
        <EmotionSticker
          key={e.key}
          emoji={e.emoji}
          label={e.label}
          emotionKey={e.key}
          isSelected={value === e.key}
          isDimmed={value !== null && value !== e.key}
          onSelect={onChange}
        />
      ))}
    </div>
  );
}
