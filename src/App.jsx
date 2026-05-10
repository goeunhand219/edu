import { useEffect, useState } from 'react';
import { ATTRIBUTES } from './data/attributes';
import { appendRecord } from './lib/storage';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecordingScreen from './screens/RecordingScreen';
import FriendsScreen from './screens/FriendsScreen';
import LessonScreen from './screens/LessonScreen';
import ParentScreen from './screens/ParentScreen';

// App — 화면 라우팅 머신.
// state: 'onboarding' | 'dashboard' | 'recording' | 'friends' | 'lesson' | 'parent'
//
// 마운트 시 localStorage.selectedMagic 이 ATTRIBUTES 에 존재하는 유효 키면 'dashboard' 로 진입.
// recording 저장 → 'friends' 직행 (lastEmotion 으로 매핑 트리거) → 'dashboard' 복귀.
// dashboard 에서 lesson / parent 로 분기, 각자 onBack 으로 dashboard 복귀.
// (외부 라우터 라이브러리 미사용 — Sunday prototype 범위 최소화.)

function readStoredMagic() {
  try {
    return localStorage.getItem('selectedMagic');
  } catch (e) {
    return null;
  }
}

function isValidMagic(key) {
  return !!key && ATTRIBUTES.some((a) => a.key === key);
}

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [selectedKey, setSelectedKey] = useState(null);
  const [lastEmotion, setLastEmotion] = useState(null);

  useEffect(() => {
    const stored = readStoredMagic();
    if (isValidMagic(stored)) {
      setSelectedKey(stored);
      setScreen('dashboard');
    }
  }, []);

  const goToOnboarding = () => {
    setSelectedKey(null);
    setScreen('onboarding');
  };

  if (screen === 'recording') {
    return (
      <RecordingScreen
        onSave={(record) => {
          appendRecord(record);
          setLastEmotion(record.emotion);
          setScreen('friends');
        }}
        onBack={() => setScreen('dashboard')}
      />
    );
  }
  if (screen === 'friends') {
    return (
      <FriendsScreen
        emotion={lastEmotion}
        onDone={() => {
          setLastEmotion(null);
          setScreen('dashboard');
        }}
      />
    );
  }
  if (screen === 'lesson') {
    return <LessonScreen onBack={() => setScreen('dashboard')} />;
  }
  if (screen === 'parent') {
    return <ParentScreen onBack={() => setScreen('dashboard')} />;
  }
  if (screen === 'dashboard') {
    return (
      <DashboardScreen
        selectedKey={selectedKey}
        onRecord={() => setScreen('recording')}
        onOpenLesson={() => setScreen('lesson')}
        onOpenParent={() => setScreen('parent')}
        onBackToOnboarding={goToOnboarding}
      />
    );
  }
  return (
    <OnboardingScreen
      onComplete={(key) => {
        setSelectedKey(key);
        setScreen('dashboard');
      }}
    />
  );
}
