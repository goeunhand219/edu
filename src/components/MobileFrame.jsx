// MobileFrame — desktop 에서는 375×667 가운데 카드, 모바일에서는 풀블리드.
// 외부/내부 모두 같은 딥 퍼플 톤이라 데스크톱 풀스크린에서도 톤 끊김 없음.
// 자식 콘텐츠를 z-10 으로 올려 SparkleBackground 위에 보이게 한다.

export default function MobileFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-magic-bg-deep flex items-center justify-center">
      <div className="w-full max-w-[375px] min-h-[667px] bg-magic-bg relative overflow-hidden shadow-2xl">
        <div className="relative z-10 min-h-[667px]">{children}</div>
      </div>
    </div>
  );
}
