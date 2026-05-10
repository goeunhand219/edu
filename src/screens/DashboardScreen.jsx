import { useEffect } from 'react';
import { ATTRIBUTES } from '../data/attributes';
import { user, today } from '../data/dummyData';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import GreetingHeader from '../components/GreetingHeader';
import CharacterCard from '../components/CharacterCard';
import FloatingCharacter from '../components/FloatingCharacter';
import LessonCard from '../components/LessonCard';
import MissionCard from '../components/MissionCard';
import ParentLink from '../components/ParentLink';
import PrimaryButton from '../components/PrimaryButton';

// DashboardScreen — 화면 2 (메인 대시보드).
// 합성 순서: GreetingHeader → CharacterCard → FloatingCharacter →
//             LessonCard → MissionCard → "오늘의 소비 기록하기" CTA → ParentLink.
//
// Props:
//   selectedKey         — localStorage 의 selectedMagic. ATTRIBUTES 에 없으면 가드 발동.
//   onRecord            — 마젠타 CTA 클릭 시 화면 3(recording)으로 라우팅.
//   onOpenLesson        — LessonCard 클릭 시 화면 5(lesson)으로 라우팅.
//   onOpenParent        — ParentLink 클릭 시 화면 6(parent)으로 라우팅.
//   onBackToOnboarding  — selectedKey 가 유효하지 않으면 부모가 호출해 화면 1로 복귀.
//
// 가드: selectedKey 가 ATTRIBUTES 에 없으면 useEffect 로 onBackToOnboarding 호출 +
//       그 사이 깜박임 방지를 위해 null 렌더.
//
// MissionCard 는 아직 진짜 화면이 없어 클릭 시 noop (toast placeholder 제거됨).

export default function DashboardScreen({
  selectedKey,
  onRecord,
  onOpenLesson,
  onOpenParent,
  onBackToOnboarding,
}) {
  const attribute = ATTRIBUTES.find((a) => a.key === selectedKey);

  useEffect(() => {
    if (!attribute) {
      onBackToOnboarding?.();
    }
  }, [attribute, onBackToOnboarding]);

  if (!attribute) return null;

  return (
    <MobileFrame>
      <SparkleBackground />
      <div className="relative z-10 flex flex-col min-h-[667px] px-4 py-6 gap-4">
        <GreetingHeader name={user.name} />

        <CharacterCard attribute={attribute} level={user.level} coins={user.coins} />

        <FloatingCharacter emoji={attribute.emoji} label={attribute.label} />

        <LessonCard title={today.lesson.title} onOpen={onOpenLesson} />

        <MissionCard
          title={today.weeklyMission.title}
          progress={today.weeklyMission.progress}
          progressText={today.weeklyMission.progressText}
          onOpen={() => {}}
        />

        <div className="mt-auto flex flex-col gap-3">
          <PrimaryButton onClick={onRecord}>✏️ 오늘의 소비 기록하기</PrimaryButton>
          <ParentLink onOpen={onOpenParent} />
        </div>
      </div>
    </MobileFrame>
  );
}
