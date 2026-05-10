import { useEffect, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import ScreenTitle from '../components/ScreenTitle';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';
import ToastMessage from '../components/ToastMessage';
import {
  loadLessons,
  markLessonComplete,
  loadCoins,
  saveCoins,
} from '../lib/storage';

// LessonScreen — 화면 5 (오늘의 마법 수업).
// LESN-01: 카드 본문 + "다 읽었어!" → coins +5 영속화.
// LESN-02: 이미 완료된 수업이면 본문 대신 "이미 완료한 수업이야!" 표시.
//
// Props:
//   onBack — 좌상단 BackButton + 보상 토스트 후 자동 복귀.

const LESSON_ID = 1;
const REWARD_COINS = 5;
const TOAST_MS = 1500;

export default function LessonScreen({ onBack }) {
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const lessons = loadLessons();
    if (lessons[LESSON_ID]?.completed) setAlreadyDone(true);
  }, []);

  const handleFinish = () => {
    markLessonComplete(LESSON_ID);
    saveCoins(loadCoins() + REWARD_COINS);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      onBack?.();
    }, TOAST_MS);
  };

  return (
    <MobileFrame>
      <SparkleBackground />
      <div className="relative z-10 flex flex-col min-h-[667px] px-4 py-4 gap-4">
        <div className="flex">
          <BackButton onBack={onBack} />
        </div>

        <ScreenTitle>📚 오늘의 마법 수업</ScreenTitle>

        {alreadyDone ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center">
            <div className="text-[80px]" aria-hidden="true">✅</div>
            <p className="text-body text-magic-cream">이미 완료한 수업이야!</p>
            <p className="text-body text-white/70">내일 새로운 수업을 만나러 와줘 ✨</p>
          </div>
        ) : (
          <>
            <div className="w-full bg-white/10 border border-magic-gold/60 rounded-card p-4 flex flex-col gap-3">
              <h2 className="text-heading font-bold text-white">
                용돈은 어디서 오는 걸까?
              </h2>
              <p className="text-body text-magic-cream leading-relaxed">
                용돈은 마법처럼 그냥 생기는 게 아니야. 부모님이 일해서 번 마법 동전이
                너에게 도착한 거야. 그래서 한 닢 한 닢이 소중한 마법이지.
              </p>
            </div>

            <div className="mt-auto">
              <PrimaryButton onClick={handleFinish}>다 읽었어! ✨</PrimaryButton>
            </div>
          </>
        )}
      </div>

      <ToastMessage message="마법 동전 5개 받았어! 🪙" visible={toastVisible} />
    </MobileFrame>
  );
}
