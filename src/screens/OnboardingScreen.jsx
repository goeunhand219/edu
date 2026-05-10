import { useState } from 'react';
import { ATTRIBUTES } from '../data/attributes';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import ScreenTitle from '../components/ScreenTitle';
import CoinGrid from '../components/CoinGrid';
import PrimaryButton from '../components/PrimaryButton';
import SelectionMessage from '../components/SelectionMessage';

// OnboardingScreen — 화면 1 합성 + selectedKey 상태 + localStorage 저장 + 다음 화면 라우팅.
// 흐름:
//   1. 사용자가 동전 5개 중 하나를 선택 → CTA 활성
//   2. CTA 클릭 → localStorage.setItem('selectedMagic', key)
//   3. SelectionMessage 1초간 표시 (그 동안 추가 인터랙션 차단)
//   4. onComplete 콜백으로 App.jsx 가 PlaceholderScreen 으로 전환

const HOLD_MS = 1000; // ONBO-03: 1초 메시지 hold

export default function OnboardingScreen({ onComplete }) {
  const [selectedKey, setSelectedKey] = useState(null);
  const [messageAttr, setMessageAttr] = useState(null);

  const isTransitioning = messageAttr !== null;

  const handleSelect = (key) => {
    if (isTransitioning) return; // 메시지 떠있는 동안 추가 클릭 무시
    setSelectedKey(key);
  };

  const handleSubmit = () => {
    if (!selectedKey || isTransitioning) return;
    const attr = ATTRIBUTES.find((a) => a.key === selectedKey);
    if (!attr) return;

    // localStorage 저장 (Phase 2 가 이 키를 읽음)
    try {
      localStorage.setItem('selectedMagic', selectedKey);
    } catch (e) {
      // 사파리 시크릿 모드 등에서 setItem 이 throw 할 수 있음 — 흐름은 계속.
      console.warn('localStorage.setItem failed:', e);
    }

    setMessageAttr(attr);
    setTimeout(() => {
      onComplete(selectedKey);
    }, HOLD_MS);
  };

  return (
    <>
      <MobileFrame>
        <SparkleBackground />
        <div className="relative z-10 flex flex-col items-center justify-between min-h-[667px] px-4 py-8">
          {/* 상단: 타이틀 + 부제 + 행동 가이드 */}
          <div className="w-full">
            <ScreenTitle>✨ 경제 마법사 학교 ✨</ScreenTitle>
            <p className="text-body text-white text-center mt-6">
              네 안에 어떤 마법의 힘이
              <br />
              깨어나고 있을까?
            </p>
            <p className="text-body text-magic-cream text-center mt-2">동전을 돌려서 느껴봐</p>
          </div>

          {/* 가운데: 5속성 동전 그리드 */}
          <div
            className={isTransitioning ? 'pointer-events-none' : ''}
            aria-hidden={isTransitioning}
          >
            <CoinGrid selectedKey={selectedKey} onSelect={handleSelect} />
          </div>

          {/* 하단: CTA */}
          <div className="w-full">
            <PrimaryButton disabled={!selectedKey || isTransitioning} onClick={handleSubmit}>
              선택 완료 ▶
            </PrimaryButton>
          </div>
        </div>
      </MobileFrame>

      {messageAttr && <SelectionMessage attribute={messageAttr} />}
    </>
  );
}
