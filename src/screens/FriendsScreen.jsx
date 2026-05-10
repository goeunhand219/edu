import { useEffect, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import PrimaryButton from '../components/PrimaryButton';
import {
  EMOTION_TO_FRIEND,
  findMonster,
  findFriend,
} from '../data/friends';
import { markFriendMet } from '../lib/storage';

// FriendsScreen — 화면 4 (친구 만나기).
// 3-단계 시퀀스: 몬스터 등장 → 마법 발동 → 친구 변신.
//
// Props:
//   emotion — record.emotion (need|considered|impulse|regret|satisfied)
//   onDone  — 사용자가 "다음으로 →" 클릭 시 호출, App 이 dashboard 복귀.
//
// 매핑 없는 emotion(방어)은 즉시 onDone() — 흐름 차단 X.

const STAGE_MS = { monster: 2000, cast: 1000 };

export default function FriendsScreen({ emotion, onDone }) {
  const mapping = EMOTION_TO_FRIEND[emotion];
  const monster = mapping ? findMonster(mapping.monsterId) : null;
  const friend  = mapping ? findFriend(mapping.friendId)   : null;

  const [stage, setStage] = useState('monster'); // 'monster' | 'cast' | 'friend'

  // 매핑 누락 시 방어적으로 즉시 종료
  useEffect(() => {
    if (!mapping) {
      onDone?.();
    }
  }, [mapping, onDone]);

  // 단계 진행 타이머
  useEffect(() => {
    if (!mapping) return undefined;
    if (stage === 'monster') {
      const t = setTimeout(() => setStage('cast'), STAGE_MS.monster);
      return () => clearTimeout(t);
    }
    if (stage === 'cast') {
      const t = setTimeout(() => setStage('friend'), STAGE_MS.cast);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [stage, mapping]);

  // friend 단계 진입 시 도감 영속화 (idempotent)
  useEffect(() => {
    if (stage === 'friend' && friend) {
      markFriendMet(friend.id);
    }
  }, [stage, friend]);

  if (!mapping) return null;

  return (
    <MobileFrame>
      <SparkleBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[667px] px-4 py-6 gap-6 text-center">
        {stage === 'monster' && monster && (
          <>
            <div className="text-[120px] leading-none animate-pulse" aria-hidden="true">
              {monster.emoji}
            </div>
            <h2 className="text-heading font-bold text-magic-cream">
              {monster.name}가 나타났어!
            </h2>
            <p className="text-body text-white/70">마법을 준비해…</p>
          </>
        )}

        {stage === 'cast' && (
          <div className="text-[40px] font-bold text-magic-gold animate-pulse">
            ✨ 마법 발동! ✨
          </div>
        )}

        {stage === 'friend' && friend && (
          <>
            <div
              className="text-[120px] leading-none transition-transform duration-500 ease-out"
              style={{ transform: 'scale(1.05)' }}
              aria-hidden="true"
            >
              {friend.emoji}
            </div>
            <h2 className="text-heading font-bold text-magic-gold">
              {friend.name}를 만났어!
            </h2>
            <p className="text-body text-magic-cream">도감에 추가됐어 ✨</p>
            <div className="w-full mt-4">
              <PrimaryButton onClick={onDone}>다음으로 →</PrimaryButton>
            </div>
          </>
        )}
      </div>
    </MobileFrame>
  );
}
