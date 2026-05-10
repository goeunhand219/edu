// ScreenTitle — 골드 24px 헤더. 화면마다 children 으로 전달.

export default function ScreenTitle({ children }) {
  return <h1 className="text-heading font-bold text-magic-gold text-center">{children}</h1>;
}
