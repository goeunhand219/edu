import { useEffect, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import ScreenTitle from '../components/ScreenTitle';
import BackButton from '../components/BackButton';
import { loadAppState } from '../lib/storage';
import { today, parentTalk } from '../data/dummyData';

// ParentScreen — 화면 6 (부모 화면).
// PRNT-01: 4개 통계 카드 (storage 실수치).
// PRNT-02: 이번 주 대화 가이드 카드 1개.
//
// Props: { onBack } — 좌상단 BackButton.

function StatCard({ icon, label, value, unit }) {
  return (
    <div className="bg-white/10 border border-magic-gold/60 rounded-card p-4 text-center flex flex-col gap-1">
      <span className="text-label text-magic-cream">
        {icon} {label}
      </span>
      <span className="text-[32px] leading-none font-bold text-magic-gold">{value}</span>
      <span className="text-label text-white">{unit}</span>
    </div>
  );
}

export default function ParentScreen({ onBack }) {
  const [stats, setStats] = useState({ recordCount: 0, friendCount: 0, lessonCount: 0 });

  useEffect(() => {
    const { records, friends, lessons } = loadAppState();
    setStats({
      recordCount: records.length,
      friendCount: friends.filter((f) => f.met).length,
      lessonCount: Object.keys(lessons).length,
    });
  }, []);

  return (
    <MobileFrame>
      <SparkleBackground />
      <div className="relative z-10 flex flex-col min-h-[667px] px-4 py-4 gap-4">
        <div className="flex">
          <BackButton onBack={onBack} />
        </div>

        <ScreenTitle>👪 부모님 화면</ScreenTitle>
        <p className="text-body text-magic-cream text-center">이번 주 우리 아이의 마법 여정</p>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon="📖" label="기록 횟수" value={stats.recordCount} unit="개" />
          <StatCard icon="✨" label="만난 친구" value={stats.friendCount} unit="명" />
          <StatCard icon="📚" label="완료 수업" value={stats.lessonCount} unit="개" />
          <StatCard
            icon="🎯"
            label="임무 진행"
            value={today.weeklyMission.progressText}
            unit=" "
          />
        </div>

        <div className="bg-white/10 border border-magic-gold/60 rounded-card p-4 mt-2">
          <div className="text-label text-magic-cream">💬 {parentTalk.title}</div>
          <p className="text-body text-white leading-relaxed mt-2">{parentTalk.body}</p>
        </div>
      </div>
    </MobileFrame>
  );
}
