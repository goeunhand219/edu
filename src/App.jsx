import { useState, useEffect } from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

// App — 화면 라우팅 머신.
// screen state: 'onboarding' | 'next'
// 첫 마운트 시 localStorage.getItem('selectedMagic') 이 truthy 면 바로 'next' 로 시작 (영속화).
// OnboardingScreen 의 onComplete 가 발사되면 selectedKey 를 저장하고 'next' 로 전환.
// (외부 라우터 라이브러리 미사용 — Phase 1 prototype 범위 최소화.)

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem('selectedMagic');
    } catch (e) {
      stored = null;
    }
    if (stored) {
      setSelectedKey(stored);
      setScreen('next');
    }
  }, []);

  if (screen === 'next') {
    return <PlaceholderScreen selectedKey={selectedKey} />;
  }
  return (
    <OnboardingScreen
      onComplete={(key) => {
        setSelectedKey(key);
        setScreen('next');
      }}
    />
  );
}
