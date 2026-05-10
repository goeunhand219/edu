import { useMemo, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import ScreenTitle from '../components/ScreenTitle';
import PrimaryButton from '../components/PrimaryButton';
import BackButton from '../components/BackButton';
import RecordTextField from '../components/RecordTextField';
import RecordAmountField from '../components/RecordAmountField';
import EmotionStickerGrid from '../components/EmotionStickerGrid';
import HelperText from '../components/HelperText';

// RecordingScreen — 화면 3 (오늘의 마법서, 기록).
// REC-01~05 합성 + 검증.
// onSave(record): localStorage 저장은 부모(App)에서 담당. 여기는 record 객체만 만들어 전달.
// onBack(): 입력 폐기 후 화면 2 복귀.
//
// 검증:
//   isValid = item.trim() !== '' && amount > 0 && emotion !== null
// helperMessages 도출 (비어있는 항목별 1줄):
//   item 비어있으면        → '무엇을 샀는지 알려줘!'
//   amount <= 0 이면       → '얼마였는지 알려줘!'
//   emotion 비어있으면     → '마음이 어땠는지 알려줘!'
//
// record shape (PRD PART 5):
//   { item: string(trim), amount: number, emotion: 'need'|..., timestamp: ISO string }

export default function RecordingScreen({ onSave, onBack }) {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);
  const [emotion, setEmotion] = useState(null);

  const helperMessages = useMemo(() => {
    const msgs = [];
    if (item.trim() === '') msgs.push('무엇을 샀는지 알려줘!');
    if (amount <= 0) msgs.push('얼마였는지 알려줘!');
    if (emotion === null) msgs.push('마음이 어땠는지 알려줘!');
    return msgs;
  }, [item, amount, emotion]);

  const isValid = helperMessages.length === 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSave({
      item: item.trim(),
      amount,
      emotion,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <MobileFrame>
      <SparkleBackground />
      <div className="relative z-10 flex flex-col min-h-[667px] max-h-[667px] overflow-y-auto px-4 py-4 gap-4">
        <div className="flex">
          <BackButton onBack={onBack} />
        </div>

        <div className="flex flex-col gap-1">
          <ScreenTitle>📖 오늘의 마법서</ScreenTitle>
          <p className="text-body text-magic-cream text-center">오늘 너의 모험을 적어볼까?</p>
        </div>

        <RecordTextField
          id="record-item"
          label="무엇을 샀어?"
          value={item}
          onChange={setItem}
        />

        <RecordAmountField
          id="record-amount"
          label="얼마였어?"
          value={amount}
          onChange={setAmount}
        />

        <div className="flex flex-col gap-2">
          <span className="text-body text-magic-cream">살 때 마음이 어땠어?</span>
          <EmotionStickerGrid value={emotion} onChange={setEmotion} />
        </div>

        <HelperText messages={helperMessages} />

        <div className="mt-auto pt-2">
          <PrimaryButton disabled={!isValid} onClick={handleSubmit}>
            마법서에 적기 ✍️
          </PrimaryButton>
        </div>
      </div>
    </MobileFrame>
  );
}
