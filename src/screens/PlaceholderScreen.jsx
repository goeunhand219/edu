import { ATTRIBUTES } from '../data/attributes';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';

// PlaceholderScreen — Phase 2 (대시보드) 전 임시 다음 화면.
// 새로고침 후 selectedMagic 영속화 검증용 — 선택했던 속성을 다시 보여준다.
// props.selectedKey 가 없으면 localStorage 에서 fallback 으로 읽음.

function readStored() {
  try {
    return localStorage.getItem('selectedMagic');
  } catch (e) {
    return null;
  }
}

export default function PlaceholderScreen({ selectedKey }) {
  const key = selectedKey ?? readStored();
  const attr = ATTRIBUTES.find((a) => a.key === key);

  return (
    <MobileFrame>
      <SparkleBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[667px] px-6 py-8">
        <h2 className="text-heading font-bold text-magic-gold text-center">다음 화면 준비 중</h2>
        {attr ? (
          <>
            <p className="text-display mt-6 text-center text-white">
              {attr.emoji} {attr.label} 마법사
            </p>
            <p className="text-body text-magic-cream mt-4 text-center">{attr.subtitle}</p>
          </>
        ) : (
          <p className="text-body text-magic-cream mt-6 text-center">
            아직 마법을 고르지 않았어
          </p>
        )}
        <p className="text-label text-white/60 mt-8 text-center">
          Phase 2 (대시보드) 가 곧 이 자리에 들어와
        </p>
      </div>
    </MobileFrame>
  );
}
