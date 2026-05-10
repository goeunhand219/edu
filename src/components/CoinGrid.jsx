import { ATTRIBUTES } from '../data/attributes';
import MagicCoin from './MagicCoin';

// CoinGrid — 5속성 단일 선택 라디오 그룹.
// row 1 = 불 / 물 (index 0,1), row 2 = 전기 / 흙 / 바람 (index 2,3,4).
// 단일 선택 의미: 한 동전이 선택되면 나머지는 isDimmed=true.

export default function CoinGrid({ selectedKey, onSelect }) {
  const row1 = ATTRIBUTES.slice(0, 2);
  const row2 = ATTRIBUTES.slice(2, 5);

  const renderCoin = (attr) => (
    <MagicCoin
      key={attr.key}
      emoji={attr.emoji}
      label={attr.label}
      attributeKey={attr.key}
      isSelected={selectedKey === attr.key}
      isDimmed={selectedKey !== null && selectedKey !== attr.key}
      onSelect={onSelect}
    />
  );

  return (
    <div
      role="radiogroup"
      aria-label="마법 속성 선택"
      className="flex flex-col gap-6"
    >
      <div className="flex justify-center gap-6">{row1.map(renderCoin)}</div>
      <div className="flex justify-center gap-6">{row2.map(renderCoin)}</div>
    </div>
  );
}
