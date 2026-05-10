// GreetingHeader — 화면 2 상단 인사말. props: { name }.
// 1행: "어서 와, {name}! 🪄" / 2행: "오늘은 어떤 마법을 부려볼까?"
// 카피 톤(초대 + 질문형) 준수. 좌측 정렬.

export default function GreetingHeader({ name }) {
  return (
    <div className="w-full">
      <h1 className="text-heading font-bold text-white">
        어서 와, {name}! 🪄
      </h1>
      <p className="text-body text-magic-cream mt-1">
        오늘은 어떤 마법을 부려볼까?
      </p>
    </div>
  );
}
