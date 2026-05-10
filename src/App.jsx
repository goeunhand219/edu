import { useEffect, useState } from 'react';
import { ATTRIBUTES } from './data/attributes';
import { appendRecord } from './lib/storage';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecordingScreen from './screens/RecordingScreen';

// App — 화면 라우팅 머신.
// state: 'onboarding' | 'dashboard' | 'recording'
// 마운트 시 localStorage.selectedMagic 이 ATTRIBUTES 에 존재하는 유효 키면 'dashboard' 로 진입.
// 'recording' 은 화면 3 — RecordingScreen. onSave 시 records 영속화 + 대시보드 복귀.
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
          setScreen('dashboard');
        }}
        onBack={() => setScreen('dashboard')}
      />
    );
  }
  if (screen === 'dashboard') {
    return (
      <DashboardScreen
        selectedKey={selectedKey}
        onRecord={() => setScreen('recording')}
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
