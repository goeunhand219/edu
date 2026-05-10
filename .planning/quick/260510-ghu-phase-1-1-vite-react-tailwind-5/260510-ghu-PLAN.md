---
phase: quick
plan: 260510-ghu
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - package-lock.json
  - vite.config.js
  - tailwind.config.js
  - postcss.config.js
  - index.html
  - .gitignore
  - src/main.jsx
  - src/App.jsx
  - src/index.css
  - src/data/attributes.js
  - src/components/MobileFrame.jsx
  - src/components/SparkleBackground.jsx
  - src/components/ScreenTitle.jsx
  - src/components/MagicCoin.jsx
  - src/components/CoinGrid.jsx
  - src/components/PrimaryButton.jsx
  - src/components/SelectionMessage.jsx
  - src/screens/OnboardingScreen.jsx
  - src/screens/PlaceholderScreen.jsx
autonomous: false
requirements:
  - DSGN-01
  - DSGN-02
  - DSGN-03
  - PLAT-01
  - PLAT-02
  - ONBO-01
  - ONBO-02
  - ONBO-03
must_haves:
  truths:
    - "프로젝트 루트에 Vite + React + Tailwind 프로젝트가 셋업되어 npm run dev 한 줄로 dev 서버가 뜨고 브라우저에서 화면이 열린다"
    - "앱을 열면 딥 퍼플 그라데이션 배경에 별가루 입자가 떠다니고 ✨ 경제 마법사 학교 ✨ 타이틀, 부제 2줄, 행동 가이드 1줄, 5개 골드 동전, 비활성 선택완료 버튼이 보인다"
    - "데스크톱에서 열어도 콘텐츠는 375×667 모바일 프레임 안에 들어가고, 프레임 밖은 같은 딥 퍼플 배경이다"
    - "동전에 마우스를 올리면 Y축 회전 애니메이션이 돌고, 클릭하면 회전이 멈추고 골드 테두리·1.1배 확대로 강조되며 나머지 4개는 opacity 0.4로 흐려진다"
    - "동전을 한 번 클릭하면 선택완료 버튼이 마젠타 활성 상태로 바뀌고, 다른 동전을 클릭하면 선택이 즉시 옮겨간다 (단일 선택)"
    - "선택완료 클릭 시 속성에 맞는 메시지 (예: 💧 물의 힘이 깨어났어! / 차분한 인내심의 마법사) 가 1초간 가운데에 떠오르고, 그 후 '다음 화면 준비 중' 플레이스홀더 화면으로 전환된다"
    - "selectedMagic 값이 localStorage에 저장되어 있고, 새로고침 후 placeholder 화면에서 선택했던 속성이 그대로 보인다"
    - "모든 인터랙션 요소(동전 5개·CTA 버튼)는 높이/너비 ≥ 48px, 한글은 Pretendard 폰트로 렌더되고, 본문 16px / 제목 24px / 강조 32px 사이즈가 적용되어 있다"
    - "prefers-reduced-motion: reduce 환경에서는 회전·확대·페이드 애니메이션이 정지된 정적 표현으로 대체된다"
  artifacts:
    - path: "package.json"
      provides: "Vite + React + Tailwind 의존성과 dev/build 스크립트"
      contains: "\"dev\""
    - path: "tailwind.config.js"
      provides: "magic 컬러/폰트/사이즈/애니메이션 토큰 (UI-SPEC Tailwind Token Mapping 그대로)"
      contains: "magic"
    - path: "src/data/attributes.js"
      provides: "5속성 메타데이터 (key, emoji, label, color, message, subtitle)"
      contains: "water"
    - path: "src/components/MagicCoin.jsx"
      provides: "단일 동전 컴포넌트 (idle/hover-rotate/selected/dimmed 상태)"
      min_lines: 30
    - path: "src/components/CoinGrid.jsx"
      provides: "5개 동전 단일 선택 그리드 (2 + 3 행)"
      min_lines: 20
    - path: "src/components/PrimaryButton.jsx"
      provides: "마젠타 CTA (disabled/active/pressed 상태)"
      min_lines: 15
    - path: "src/components/SelectionMessage.jsx"
      provides: "1초 풀스크린 메시지 오버레이"
      min_lines: 15
    - path: "src/screens/OnboardingScreen.jsx"
      provides: "화면 1 전체 합성 + 선택 상태 관리 + localStorage 저장 + 다음 화면 라우팅"
      min_lines: 40
    - path: "src/screens/PlaceholderScreen.jsx"
      provides: "Phase 2 전 임시 다음 화면 (선택한 속성을 다시 보여줘 흐름 확인)"
      min_lines: 15
  key_links:
    - from: "src/components/MagicCoin.jsx"
      to: "tailwind.config.js"
      via: "Tailwind utility classes (bg-magic-*, animate-coin-spin, shadow-coin-selected, focus-ring)"
      pattern: "magic-|coin-spin|shadow-coin-selected"
    - from: "src/screens/OnboardingScreen.jsx"
      to: "localStorage"
      via: "localStorage.setItem('selectedMagic', key) on CTA click"
      pattern: "localStorage\\.setItem.*selectedMagic"
    - from: "src/screens/OnboardingScreen.jsx"
      to: "src/components/SelectionMessage.jsx"
      via: "1초 동안 메시지 렌더 후 PlaceholderScreen으로 전환"
      pattern: "SelectionMessage"
    - from: "src/screens/PlaceholderScreen.jsx"
      to: "localStorage"
      via: "localStorage.getItem('selectedMagic') 으로 선택값 echo"
      pattern: "localStorage\\.getItem.*selectedMagic"
    - from: "index.html"
      to: "Pretendard CDN"
      via: "<link rel=stylesheet> 로 Pretendard Variable 로드"
      pattern: "pretendard"
---

<objective>
프로젝트 루트가 비어있는 상태에서 Vite + React + Tailwind 프로젝트를 셋업하고, UI-SPEC.md 가 정의한 디자인 토큰을 Tailwind config 에 그대로 옮긴 다음, 화면 1 (5속성 마법사 동전 선택 온보딩)을 구현해 dev 서버에서 작동하는 프로토타입까지 만든다.

Purpose: Phase 1 의 모든 요구사항(DSGN-01/02/03, PLAT-01/02, ONBO-01/02/03)을 충족시키고, 화면 1 → "선택 후 메시지" → 다음 화면(placeholder)의 마법학교 톤 흐름을 시연 가능한 상태로 만드는 것. 이후 Phase 2 (대시보드) 가 그대로 placeholder 자리를 대체할 수 있도록 컴포넌트·라우팅·localStorage 계약을 잡는다.

Output: 프로젝트 루트에 동작하는 Vite + React + Tailwind 코드베이스 (package.json, tailwind.config.js, src/components/*, src/screens/*) 와 npm run dev 로 띄울 수 있는 dev 서버, 그리고 브라우저에서 직접 확인된 화면 1 흐름.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/01-foundation-onboarding/01-UI-SPEC.md
@CLAUDE.md
@경제마법사학교_기능설명서.md

<interfaces>
<!-- UI-SPEC.md 가 정의한 계약. 이 plan 의 단일 진실의 원천(LOCKED). -->
<!-- 어떤 색/폰트/카피/간격도 임의로 변경하지 말 것. 의문이 생기면 UI-SPEC 을 다시 읽는다. -->

5 magic attributes (UI-SPEC "Copywriting Contract" + "Color" 두 섹션 합본):

```js
// src/data/attributes.js (executor 가 만들 파일의 모양 — 이대로 만들 것)
export const ATTRIBUTES = [
  { key: 'fire',     emoji: '🔥', label: '불',   color: '#F97316',
    title: '🔥 불의 힘이 깨어났어!',   subtitle: '용기와 결단력의 마법사' },
  { key: 'water',    emoji: '💧', label: '물',   color: '#38BDF8',
    title: '💧 물의 힘이 깨어났어!',   subtitle: '차분한 인내심의 마법사' },
  { key: 'electric', emoji: '⚡', label: '전기', color: '#FACC15',
    title: '⚡ 전기의 힘이 깨어났어!', subtitle: '빠른 통찰의 마법사' },
  { key: 'earth',    emoji: '🌱', label: '흙',   color: '#84CC16',
    title: '🌱 흙의 힘이 깨어났어!',   subtitle: '단단한 꾸준함의 마법사' },
  { key: 'wind',     emoji: '🌬️', label: '바람', color: '#C084FC',
    title: '🌬️ 바람의 힘이 깨어났어!', subtitle: '따뜻한 나눔의 마법사' },
];
```

Coin grid layout: row 1 = 불 / 물 (2개), row 2 = 전기 / 흙 / 바람 (3개) — UI-SPEC 화면 구성 ASCII 와 PRD 1-3 그대로.

Tailwind config tokens: UI-SPEC.md "Tailwind Token Mapping" 섹션의 JS 객체를 tailwind.config.js `theme.extend` 에 그대로 옮긴다 (colors.magic.*, fontFamily.sans, fontSize.label/body/heading/display, borderRadius.card/button, boxShadow.coin-selected/cta-hover/focus-ring, backgroundImage.magic-bg/coin-gold/cta-magenta, animation+keyframes 3종).

Pretendard CDN (index.html `<head>` 안):
```html
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
```

LocalStorage 계약 (Phase 2 가 이걸 읽는다):
- key: `selectedMagic`
- value: `'fire' | 'water' | 'electric' | 'earth' | 'wind'`
- 저장 시점: 사용자가 "선택 완료 ▶" 버튼을 눌러 메시지 오버레이가 뜨기 시작하는 순간

Forbidden phrases (UI-SPEC Copywriting Contract 그대로):
- ❌ "선택해주세요"  ✅ "동전을 돌려서 느껴봐"
- ❌ "필수 항목입니다" ✅ (CTA 비활성 자체가 메시지)
- ❌ "포인트"  ✅ "마법 동전"
- ❌ "기록하기"  ✅ "마법서에 적기"
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Scaffold Vite + React + Tailwind 프로젝트와 디자인 시스템 토큰 작성</name>
  <files>
    package.json, package-lock.json, vite.config.js, tailwind.config.js,
    postcss.config.js, index.html, .gitignore, src/main.jsx, src/App.jsx,
    src/index.css, src/data/attributes.js
  </files>
  <action>
프로젝트 루트(`/Users/gowonho/Downloads/20260510/project1/`) 에서 작업한다. 현재 루트에 `package.json` 이 없고 `.git` / `.planning` / `CLAUDE.md` / `경제마법사학교_기능설명서.md` 만 존재하므로 cleanly 셋업할 수 있다.

1) Vite React 템플릿으로 in-place 셋업 — `npm create vite@latest . -- --template react` 가 빈 디렉토리가 아니라 거부할 수 있으니, 다음 절차로 진행:
   - `npx --yes degit vitejs/vite/packages/create-vite/template-react vite-tmp` 로 임시 디렉토리에 템플릿을 가져오고, `vite-tmp/` 안의 `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `.gitignore`, `public/` 등 필요한 파일을 루트로 옮긴 뒤 `vite-tmp/` 와 그 안에 들어있던 `src/App.css`, `public/vite.svg`, `src/assets/` 의 react 로고 등 이 plan 에서 쓰지 않는 데모 자산은 삭제한다.
   - degit 이 막히면 대안: `npm create vite@latest .  -- --template react` 를 실행하고 `--force`/yes 입력으로 진행. (둘 중 성공한 방법으로 계속.)
   - 결과: 루트에 `package.json` (name 은 `economic-wizard-school`, type module), `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `.gitignore` 가 존재.

2) `npm install` 실행 — base 의존성(react, react-dom, vite, @vitejs/plugin-react) 설치. 끝나면 `npm install -D tailwindcss@^3 postcss autoprefixer` 추가 설치 (Tailwind v3 명시 — v4 의 새 PostCSS 플러그인 형태는 이 plan 의 config 와 호환 안 됨).

3) `npx tailwindcss init -p` 로 `tailwind.config.js` 와 `postcss.config.js` 생성.

4) `tailwind.config.js` 를 다음과 같이 작성 — UI-SPEC.md "Tailwind Token Mapping" 섹션의 객체를 그대로 옮겨 넣고 `content` 만 추가:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        magic: {
          'bg-deep': '#1E1B4B',
          'bg-mid': '#312E81',
          'bg-light': '#4C1D95',
          gold: '#FBBF24',
          cyan: '#22D3EE',
          magenta: '#EC4899',
          'magenta-deep': '#DB2777',
          water: '#38BDF8',
          fire: '#F97316',
          electric: '#FACC15',
          earth: '#84CC16',
          wind: '#C084FC',
          cream: '#FEF3C7',
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '"Nanum Gothic"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        label:   ['14px', { lineHeight: '1.4' }],
        body:    ['16px', { lineHeight: '1.6' }],
        heading: ['24px', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        display: ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      borderRadius: { card: '16px', button: '24px' },
      boxShadow: {
        'coin-selected': '0 0 0 3px #FBBF24, 0 0 24px rgba(251, 191, 36, 0.6)',
        'cta-hover':     '0 8px 24px rgba(236, 72, 153, 0.5)',
        'focus-ring':    '0 0 0 3px #22D3EE',
      },
      backgroundImage: {
        'magic-bg':    'linear-gradient(180deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)',
        'coin-gold':   'linear-gradient(135deg, #FCD34D 0%, #FBBF24 50%, #B45309 100%)',
        'cta-magenta': 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
      },
      animation: {
        float:        'float 2s ease-in-out infinite alternate',
        'coin-spin':  'coinSpin 1.5s linear infinite',
        'sparkle-up': 'sparkleUp 10s linear infinite',
      },
      keyframes: {
        float:     { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-2px)' } },
        coinSpin:  { '0%': { transform: 'rotateY(0deg)' }, '100%': { transform: 'rotateY(360deg)' } },
        sparkleUp: { '0%': { transform: 'translateY(0)', opacity: '0' }, '50%': { opacity: '1' }, '100%': { transform: 'translateY(-100vh)', opacity: '0' } },
      },
    },
  },
  plugins: [],
};
```

5) `postcss.config.js` 는 `tailwindcss init -p` 가 만든 것 그대로 (tailwindcss + autoprefixer) 두면 됨 — module 형태인지 확인.

6) `src/index.css` 를 다음 내용으로 덮어쓰기 (Tailwind directives + 전역 base):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; margin: 0; }
body { font-family: 'Pretendard Variable', Pretendard, 'Nanum Gothic', system-ui, sans-serif; background: #1E1B4B; color: #FFFFFF; -webkit-font-smoothing: antialiased; }
/* Reduced motion 정책 — UI-SPEC Accessibility 항목 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0ms !important;
  }
}
```

7) `index.html` 의 `<head>` 에 다음을 추가/수정 — `<title>` 을 `경제 마법사 학교` 로, `<html lang="ko">` 로, viewport meta 유지, 그리고 Pretendard CDN 로드:
```html
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
```
바디는 `<div id="root"></div>` + Vite 가 만든 `<script type="module" src="/src/main.jsx">` 만 남긴다.

8) `src/main.jsx` 는 React 18 표준 — `createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)`. `import './index.css'` 한 줄 잊지 말 것.

9) `src/App.jsx` 는 일단 placeholder 로 두기 (Task 2 가 덮어씀):
```jsx
export default function App() {
  return <div className="text-white">scaffolding</div>;
}
```

10) `src/data/attributes.js` 를 위 `<interfaces>` 블록의 ATTRIBUTES 배열 그대로 작성. (5속성 순서: fire → water → electric → earth → wind, 그리드 렌더 순서와 동일)

`.gitignore` 에 `node_modules`, `dist`, `.DS_Store`, `vite-tmp/` (혹시 남았을 경우) 가 들어있는지 확인.

ABSOLUTE: tailwind.config.js / index.css / index.html 의 색·폰트·키프레임·CDN URL 은 위 코드 블록과 글자 한 자라도 다르면 안 됨. 색을 줄이거나, 폰트를 바꾸거나, 애니메이션을 단순화하지 말 것.
  </action>
  <verify>
    <automated>cd /Users/gowonho/Downloads/20260510/project1 && test -f package.json && test -f tailwind.config.js && test -f postcss.config.js && test -f src/data/attributes.js && grep -q '"dev"' package.json && grep -q "magic-bg-deep\|'bg-deep'" tailwind.config.js && grep -q "Pretendard Variable" tailwind.config.js && grep -q "coinSpin" tailwind.config.js && grep -q "sparkleUp" tailwind.config.js && grep -q "pretendardvariable" index.html && grep -q "lang=\"ko\"" index.html && grep -q "fire\|water\|electric\|earth\|wind" src/data/attributes.js && node -e "import('./tailwind.config.js').then(m=>{const c=m.default.theme.extend.colors.magic; if(c['bg-deep']!=='#1E1B4B'||c.gold!=='#FBBF24'||c.magenta!=='#EC4899'||c.water!=='#38BDF8'||c.fire!=='#F97316') process.exit(1)})" && echo OK</automated>
  </verify>
  <done>
프로젝트 루트에 package.json (react/react-dom/vite/@vitejs/plugin-react + tailwindcss/postcss/autoprefixer 의존성), tailwind.config.js (UI-SPEC 토큰 그대로), postcss.config.js, index.html (한국어 lang + Pretendard CDN), src/main.jsx, src/App.jsx (임시), src/index.css (Tailwind + reduced-motion), src/data/attributes.js (5속성 메타) 가 모두 존재하며 위 verify 명령이 OK 출력. node_modules 가 설치되어 있어 다음 task 의 dev 서버 기동이 즉시 가능.
  </done>
</task>

<task type="auto">
  <name>Task 2: 화면 1 컴포넌트 + Onboarding 화면 + Placeholder 다음 화면 구현</name>
  <files>
    src/components/MobileFrame.jsx, src/components/SparkleBackground.jsx,
    src/components/ScreenTitle.jsx, src/components/MagicCoin.jsx,
    src/components/CoinGrid.jsx, src/components/PrimaryButton.jsx,
    src/components/SelectionMessage.jsx, src/screens/OnboardingScreen.jsx,
    src/screens/PlaceholderScreen.jsx, src/App.jsx
  </files>
  <action>
UI-SPEC.md "Component Inventory" 의 7개 컴포넌트를 그대로 만든다. 각 컴포넌트는 Tailwind utility 만 사용 (CSS 모듈/styled-components 금지). 모든 한국어 카피는 UI-SPEC "Copywriting Contract" 표의 값 그대로.

라우팅은 react-router 같은 외부 라이브러리 도입하지 말 것 — App.jsx 에서 useState 로 `screen` 을 'onboarding' | 'next' 두 값으로 관리하고, OnboardingScreen 의 onComplete 콜백이 발사되면 PlaceholderScreen 으로 교체.

### `src/components/MobileFrame.jsx`
- 화면 전체에 `bg-magic-bg-deep` 풀블리드, 가운데에 `max-w-[375px]` `min-h-[667px]` 의 `bg-magic-bg-deep` 카드 (모바일 frame). 카드 안쪽은 `bg-magic-bg` (그라데이션 배경) + `relative overflow-hidden`.
- 모바일 화면 (`< 375px`) 일 때는 카드가 전체를 차지 (max-w-[375px] 만으로 자연스럽게 동작).
- children 을 `relative z-10` 으로 감싸 sparkle 위에 컨텐츠가 보이도록.

### `src/components/SparkleBackground.jsx`
- `absolute inset-0 pointer-events-none aria-hidden="true"`.
- 24개의 `<span>` 을 useMemo 로 한 번 생성 — 각각 left% (0~100), 시작 delay (0~10s), size (2~4px), color (`#FFFFFF` 또는 `#FBBF24`) 랜덤. inline style 로 left/animationDelay/width/height/background, className 으로 `absolute bottom-0 rounded-full opacity-0 animate-sparkle-up`.
- `prefers-reduced-motion` 은 index.css 의 글로벌 룰이 처리.

### `src/components/ScreenTitle.jsx`
- props: `children`. `<h1 className="text-heading font-bold text-magic-gold text-center">` 을 렌더. (Title 텍스트 자체는 OnboardingScreen 에서 `✨ 경제 마법사 학교 ✨` 를 children 으로 전달.)

### `src/components/MagicCoin.jsx`
- props: `{ emoji, label, attributeKey, isSelected, isDimmed, onSelect }`.
- 외부 `<button type="button" role="radio" aria-checked={isSelected} aria-label={`${label} 마법`} onClick={() => onSelect(attributeKey)}>` — 최소 width/height 80px, 안쪽 정렬용 flex column, gap 8px.
- 동전 본체: `<span>` 80x80, `rounded-full bg-coin-gold relative` + idle float `animate-float` + (선택 안 됐을 때) hover 시 `hover:animate-coin-spin hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]` (Tailwind arbitrary). 안쪽 가운데에 emoji 40px (`text-[40px] leading-none`).
- isSelected = true: 동전 본체에 `shadow-coin-selected scale-110` (transition 300ms ease-out), hover 회전 클래스를 적용하지 않는다 (조건부 className).
- isDimmed = true: 외부 button 에 `opacity-40 transition-opacity duration-300`.
- 라벨 텍스트: `<span className="text-label text-white mt-2">{label}</span>`.
- focus-visible: `focus-visible:outline-none focus-visible:shadow-focus-ring` 로 cyan 링.
- 외부 button 자체는 항상 `min-h-[48px] min-w-[48px]` (PLAT-02) — 동전이 80px 라 자동 충족이지만 명시적 클래스 추가.
- Touch 디바이스에서는 hover 회전이 자연스럽게 미발동 (`hover:` 가 안 잡히므로 추가 코드 불필요).

### `src/components/CoinGrid.jsx`
- props: `{ selectedKey, onSelect }`.
- ATTRIBUTES (data/attributes.js 에서 import) 배열을 row 1 (index 0,1 = 불, 물) / row 2 (index 2,3,4 = 전기, 흙, 바람) 로 분할.
- 외부 컨테이너: `role="radiogroup" aria-label="마법 속성 선택"`, flex column gap-6.
- 각 row: `flex justify-center gap-6`.
- 각 항목: `<MagicCoin>` 에 isSelected = (selectedKey === attr.key), isDimmed = (selectedKey !== null && selectedKey !== attr.key), onSelect={onSelect} 전달.

### `src/components/PrimaryButton.jsx`
- props: `{ children, disabled, onClick }`.
- `<button type="button" onClick={!disabled ? onClick : undefined} aria-disabled={disabled}>`, 항상 `min-h-[48px] px-8 rounded-button text-body font-bold text-white w-full transition-all duration-200`.
- disabled true: `bg-white/20 text-white/40 cursor-not-allowed` (no hover effect).
- disabled false: `bg-cta-magenta hover:shadow-cta-hover hover:-translate-y-px active:scale-[0.98]`.
- (참고: `disabled` HTML 속성은 사용하지 않고 `aria-disabled` 만 → UI-SPEC accessibility 항목 그대로)

### `src/components/SelectionMessage.jsx`
- props: `{ attribute }` — attribute 는 ATTRIBUTES 배열의 한 항목.
- 풀스크린 fixed `inset-0 z-50 bg-magic-bg-deep/80 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_300ms_ease-out]` (간단히 inline keyframes 보다 Tailwind transition 활용 — 또는 부모에서 mounting 시점에 opacity transition).
- 가운데 카드: `text-center px-6`. 위에 `<p className="text-display font-bold text-white" style={{ textShadow: \`0 0 24px ${attribute.color}\` }}>{attribute.title}</p>`, 그 아래 `<p className="text-body text-magic-cream mt-4">{attribute.subtitle}</p>`.
- 클릭/포커스 트랩 불필요 (1초만 머묾) 하지만 `pointer-events-none` 로 다른 클릭 안 받게.

### `src/screens/OnboardingScreen.jsx`
- props: `{ onComplete }`.
- state: `selectedKey` (null | string), `messageAttr` (null | attribute object).
- 렌더 순서:
  1. `<MobileFrame>` 안쪽에 `<SparkleBackground />`,
  2. 컨텐츠 컨테이너 `flex flex-col items-center justify-between min-h-[667px] px-4 py-8`,
  3. 상단 블록: `<ScreenTitle>✨ 경제 마법사 학교 ✨</ScreenTitle>`, 그 아래 (mt-6) `<p className="text-body text-white text-center">네 안에 어떤 마법의 힘이<br/>깨어나고 있을까?</p>`, 그 아래 (mt-2) `<p className="text-body text-magic-cream text-center">동전을 돌려서 느껴봐</p>`,
  4. 가운데 블록: `<CoinGrid selectedKey={selectedKey} onSelect={setSelectedKey} />`,
  5. 하단 블록: `<PrimaryButton disabled={!selectedKey} onClick={handleSubmit}>선택 완료 ▶</PrimaryButton>`.
- handleSubmit: selectedKey 가 null 이면 무시. 아니면 `localStorage.setItem('selectedMagic', selectedKey)` 호출, ATTRIBUTES.find(a=>a.key===selectedKey) 를 messageAttr 로 set, 1000ms 후 `onComplete(selectedKey)` 호출 (setTimeout). 동시에 이 1초 동안 messageAttr 이 truthy 이면 `<SelectionMessage attribute={messageAttr} />` 를 z-50 으로 오버레이 — UI-SPEC 의 "Post-selection transition" 1.0s 명세 그대로 (1.6s 까지 fade in/out 추가하면 좋지만 최소 1000ms hold 가 핵심 계약).
- 메시지 오버레이 떠있는 동안 추가 클릭이 안 먹게 selectedKey 가 set 된 직후의 messageAttr 가 있으면 CoinGrid/PrimaryButton 을 `pointer-events-none` 으로 막거나, 단순히 setTimeout 이 끝나기 전 onSelect 호출을 무시.

### `src/screens/PlaceholderScreen.jsx`
- props: `{ selectedKey }`.
- ATTRIBUTES.find(a => a.key === selectedKey) 로 attr 추출.
- `<MobileFrame>` 안에 `<SparkleBackground />` + 가운데 정렬된:
  - `<h2 className="text-heading font-bold text-magic-gold text-center">다음 화면 준비 중</h2>`,
  - `<p className="text-display mt-6 text-center">{attr.emoji} {attr.label} 마법사</p>`,
  - `<p className="text-body text-magic-cream mt-4 text-center">{attr.subtitle}</p>`,
  - `<p className="text-label text-white/60 mt-8 text-center">Phase 2 (대시보드) 가 곧 이 자리에 들어와</p>`.
- localStorage 영속화 검증용: 만약 props 의 selectedKey 가 없으면 localStorage.getItem('selectedMagic') 으로 fallback. (새로고침 시 App.jsx 가 처음 마운트되면서 useEffect 로 이미 selectedMagic 이 저장돼 있으면 바로 placeholder 로 시작 — 아래 App.jsx 참조.)

### `src/App.jsx`
```jsx
import { useState, useEffect } from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

export default function App() {
  const [screen, setScreen] = useState('onboarding');
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedMagic');
    if (stored) { setSelectedKey(stored); setScreen('next'); }
  }, []);

  if (screen === 'next') return <PlaceholderScreen selectedKey={selectedKey} />;
  return <OnboardingScreen onComplete={(key) => { setSelectedKey(key); setScreen('next'); }} />;
}
```

ABSOLUTE:
- 카피 한 글자도 바꾸지 말 것 (UI-SPEC Copywriting Contract / Forbidden phrases). "동전을 돌려서 느껴봐", "선택 완료 ▶", "✨ 경제 마법사 학교 ✨" 등 모두 정확히 일치.
- 색: bg-magic-* / text-magic-* / shadow-coin-selected / bg-coin-gold / bg-cta-magenta — Tailwind 토큰만 사용. Hex 인라인 색 금지 (단, 메시지의 attribute.color glow textShadow 만 예외 — UI-SPEC "Attribute colors" 그대로).
- 폰트 사이즈: text-label / text-body / text-heading / text-display 4종만 사용. 임의의 text-xl, text-2xl 등 금지.
- 회전·확대·페이드 모두 prefers-reduced-motion 으로 자동 정지 (index.css 글로벌 룰이 처리, 추가 코드 불필요).
- localStorage key 이름: 정확히 `selectedMagic` (Phase 2 가 이 키를 읽음).
- `<button>` disabled HTML 속성 사용 금지 — `aria-disabled` 만 (UI-SPEC accessibility).
  </action>
  <verify>
    <automated>cd /Users/gowonho/Downloads/20260510/project1 && test -f src/components/MobileFrame.jsx && test -f src/components/SparkleBackground.jsx && test -f src/components/ScreenTitle.jsx && test -f src/components/MagicCoin.jsx && test -f src/components/CoinGrid.jsx && test -f src/components/PrimaryButton.jsx && test -f src/components/SelectionMessage.jsx && test -f src/screens/OnboardingScreen.jsx && test -f src/screens/PlaceholderScreen.jsx && grep -q "선택 완료 ▶" src/screens/OnboardingScreen.jsx && grep -q "동전을 돌려서 느껴봐" src/screens/OnboardingScreen.jsx && grep -q "경제 마법사 학교" src/screens/OnboardingScreen.jsx && grep -q "localStorage.setItem.*selectedMagic" src/screens/OnboardingScreen.jsx && grep -q "localStorage.getItem.*selectedMagic" src/App.jsx && grep -q "role=\"radiogroup\"" src/components/CoinGrid.jsx && grep -q "role=\"radio\"" src/components/MagicCoin.jsx && grep -q "aria-disabled" src/components/PrimaryButton.jsx && ! grep -nE "선택해주세요|필수 항목입니다|포인트 획득" src/screens/OnboardingScreen.jsx src/components/*.jsx && npx vite build --logLevel=error && echo OK</automated>
  </verify>
  <done>
7개 컴포넌트 + 2개 screen + App.jsx 가 모두 존재하고, UI-SPEC 카피·금지 어휘 검사 통과, `npx vite build` 가 에러 없이 끝나 dist/ 가 생성된다 (빌드 성공 = JSX/Tailwind 클래스 모두 유효).
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: dev 서버 띄워 화면 1 전체 흐름 브라우저 확인</name>
  <what-built>
프로젝트 루트에 Vite + React + Tailwind 셋업 완료, 화면 1 (마법사 동전 선택 온보딩) + 다음 화면 placeholder 까지 구현. dev 서버에서 실제로 동작하는지 브라우저에서 확인할 차례. 에이전트가 dev 서버를 background 로 띄우고, 사용자가 localhost:5173 을 열어 흐름을 검증.
  </what-built>
  <how-to-verify>
**먼저 에이전트가 실행:**
```
cd /Users/gowonho/Downloads/20260510/project1
npm run dev
```
(background 로 띄우고, 출력에서 `Local:   http://localhost:5173/` 같은 URL 확인. 포트 다르면 그대로 사용자에게 안내.)

**그 다음 사용자가 브라우저에서 확인 (체크리스트 — 모두 OK 여야 진행):**

1. **첫 진입 화면**: localhost:5173 을 열면 (시크릿 창 권장 — localStorage 비어있는 상태 보장) 딥 퍼플 그라데이션 배경에 작은 흰/금색 별 입자가 위로 천천히 흐르는 것이 보인다. 가운데 모바일 프레임 안에 ✨ 경제 마법사 학교 ✨ 골드 타이틀, 그 아래 흰 부제 2줄 ("네 안에 어떤 마법의 힘이 / 깨어나고 있을까?"), 그 아래 크림색 "동전을 돌려서 느껴봐", 그 아래 5개의 골드 동전 (1행: 🔥 불 / 💧 물, 2행: ⚡ 전기 / 🌱 흙 / 🌬️ 바람), 맨 아래 비활성 회색 "선택 완료 ▶" 버튼.

2. **모바일 프레임**: 데스크톱 풀스크린에서도 콘텐츠는 가운데 375px 폭 안에 들어가고, 그 좌우는 같은 딥 퍼플 배경.

3. **호버 회전**: 마우스를 어떤 동전 위에 올리면 그 동전이 Y축으로 빙글빙글 회전한다 (1.5초에 한 바퀴). 마우스를 떼면 정지.

4. **클릭 선택**: 동전 하나를 클릭하면 회전이 멈추고 골드 외곽선 + 글로우 + 1.1배 확대로 강조되며, 나머지 4개는 흐려진다 (opacity 약 0.4). 다른 동전을 클릭하면 선택이 즉시 그쪽으로 옮겨가고 이전은 흐림 상태로 복귀.

5. **CTA 활성화**: 동전을 하나라도 선택하면 "선택 완료 ▶" 버튼이 마젠타 색으로 활성화. 호버 시 살짝 위로 뜨고 골드 글로우. 선택 해제 방법 (= 다른 동전 클릭) 으로 단일 선택 라디오 동작 확인.

6. **선택 완료 흐름**: "선택 완료 ▶" 클릭 → 화면 전체가 어두워지고 가운데에 큰 32px "💧 물의 힘이 깨어났어!" + 그 아래 16px "차분한 인내심의 마법사" 가 약 1초간 뜬 뒤, "다음 화면 준비 중" placeholder 화면으로 전환. (속성을 다른 걸로 골랐다면 해당 속성의 메시지가 떠야 함.)

7. **placeholder 화면**: "다음 화면 준비 중" + 선택했던 속성의 emoji + label (예: "💧 물 마법사") + subtitle ("차분한 인내심의 마법사") + "Phase 2 (대시보드) 가 곧 이 자리에 들어와" 안내가 보인다.

8. **localStorage 영속화**: 브라우저 DevTools → Application → Local Storage → `http://localhost:5173` 에 `selectedMagic` 키가 저장되어 있고 값이 선택한 속성 (예: `water`).

9. **새로고침**: F5/⌘R 로 새로고침하면 온보딩이 아니라 바로 placeholder 화면으로 시작. 선택했던 속성 그대로 표시.

10. **터치/접근성 빠른 확인**: Tab 키로 동전 → 동전 → ... → CTA 순서로 포커스가 이동하고, 포커스된 항목에 시안색(`#22D3EE`) 외곽 링이 보인다. 동전 5개 모두 button 요소로 화면에 보이는 크기는 80×80 (눈으로 확인 — 아이 손가락 충분히 닿음).

11. **금지 카피 부재**: 화면 어디에도 "선택해주세요", "필수 항목입니다", "포인트 획득", "기록하기" 같은 표현이 없다.

12. **(선택) reduced-motion**: macOS 시스템 설정 → 손쉬운 사용 → 디스플레이 → "동작 줄이기" 체크 후 새로고침하면 회전·확대·페이드가 정지 — 별 입자도 정지. (안 된다면 issue 로만 보고)

**Reset 방법 (각 테스트 사이):** DevTools → Application → Local Storage → `selectedMagic` 항목 삭제 후 새로고침 → 온보딩 처음부터.

dev 서버 종료: 에이전트가 background process kill.
  </how-to-verify>
  <resume-signal>
체크리스트 1~11 모두 OK 면 "approved" 입력. 안 되는 항목이 있으면 어느 번호가 어떻게 깨졌는지 알려줘. (예: "6번 — 메시지가 안 뜨고 바로 placeholder 로 넘어감")
  </resume-signal>
</task>

</tasks>

<verification>
모든 task done 기준 충족 + Task 3 사용자 승인 = Phase 1 화면 1 작동.

요구사항 자가 점검 (이 plan 이 닫는 항목):
- DSGN-01: tailwind.config.js 의 magic.* 컬러 토큰 + 5속성 컬러 (water/fire/electric/earth/wind) 정의 → Task 1 verify
- DSGN-02: Pretendard CDN 로드 + text-body/heading/display + sparkle background → Task 1 (CDN/토큰) + Task 2 (SparkleBackground) verify
- DSGN-03: UI-SPEC Copywriting Contract 의 모든 카피 그대로, 금지 어휘 부재 → Task 2 verify (negative grep)
- PLAT-01: MobileFrame 으로 375×667 모바일 프레임 → Task 3 점검 항목 2
- PLAT-02: 모든 button 에 min-h-[48px] (동전은 자체 80px) → 코드 + Task 3 점검 항목 10
- ONBO-01: 5속성 동전 클릭 선택 → Task 3 점검 항목 4
- ONBO-02: 호버 회전 + 클릭 시 골드 테두리·1.1배·타 동전 흐림 → Task 3 점검 항목 3, 4
- ONBO-03: "선택 완료" → 1초 메시지 → 다음 화면 + selectedMagic 저장 → Task 3 점검 항목 6, 7, 8, 9
</verification>

<success_criteria>
- 프로젝트 루트에 동작하는 Vite + React + Tailwind 셋업 (npm run dev 한 줄로 기동)
- ROADMAP.md Phase 1 의 5개 success criteria (딥 퍼플 + 별가루 + 골드 동전 / 호버 회전 + 클릭 강조 / 1초 메시지 후 전환 / 48px + Pretendard + 마법학교 톤 / 데스크톱에서 모바일 프레임) 모두 사람 눈으로 확인됨
- localStorage 의 `selectedMagic` 키가 Phase 2 (대시보드) 가 즉시 읽을 수 있는 형태로 저장됨
- Phase 2 가 PlaceholderScreen 자리만 갈아끼우면 흐름이 이어지는 컴포넌트 구조 (App.jsx 의 screen state 머신)
- UI-SPEC.md 의 Color/Typography/Copywriting/Interaction 계약 모두 준수, 금지 어휘 부재
</success_criteria>

<output>
완료 후 `.planning/quick/260510-ghu-phase-1-1-vite-react-tailwind-5/260510-ghu-SUMMARY.md` 작성:
- 어떤 파일이 생성됐는지 (특히 컴포넌트 인벤토리)
- Phase 2 가 알아야 할 계약: localStorage key (`selectedMagic`) + ATTRIBUTES 데이터 모양 + App.jsx 의 screen 라우팅 패턴
- 회피한 함정 (Tailwind v3 vs v4, vite create 빈 디렉토리 처리, disabled vs aria-disabled)
- 사람이 브라우저로 확인한 결과 (Task 3 체크리스트 결과)
</output>
