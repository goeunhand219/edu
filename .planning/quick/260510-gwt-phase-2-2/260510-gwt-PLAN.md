---
phase: quick-260510-gwt
plan: 01
type: execute
wave: 1
depends_on: []
autonomous: true
requirements: [DASH-01, DASH-02, DASH-03, DASH-04, DASH-05]
files_modified:
  - tailwind.config.js
  - src/data/dummyData.js
  - src/components/GreetingHeader.jsx
  - src/components/CharacterCard.jsx
  - src/components/FloatingCharacter.jsx
  - src/components/LessonCard.jsx
  - src/components/MissionCard.jsx
  - src/components/ParentLink.jsx
  - src/components/ToastMessage.jsx
  - src/screens/DashboardScreen.jsx
  - src/App.jsx

must_haves:
  truths:
    - "온보딩에서 선택한 속성(예: 물 마법사)이 새로고침 후 대시보드 캐릭터 카드에 그대로 반영된다"
    - "캐릭터 일러스트(큰 속성 이모지)가 위아래 ±6px 폭으로 3초 주기로 떠다니며, prefers-reduced-motion 시 정지한다"
    - "한 화면에 인사말, 캐릭터 카드(속성·레벨·마법 동전 145개), 오늘의 수업 카드, 이번 주 임무 카드(진행률 60% 바), 마젠타 CTA, 부모 링크가 모두 보인다"
    - "이번 주 임무 카드에는 진행률 바가 시각적으로 60% 채워져 있다"
    - "'오늘의 소비 기록하기' 마젠타 버튼을 누르면 화면 3 자리(현 PlaceholderScreen)로 이동한다"
    - "수업 카드 / 임무 카드 / 부모 링크 클릭 시 '다음 업데이트에서 만나요!' 토스트가 잠시 떴다 사라지고, 라우팅은 일어나지 않는다"
    - "localStorage 에 selectedMagic 이 없으면 대시보드는 자동으로 온보딩 화면으로 복귀한다"
  artifacts:
    - path: "src/data/dummyData.js"
      provides: "user(name=민지, level=2, coins=145) + today(lesson, weeklyMission) — PRD PART 5 그대로"
      contains: "민지"
    - path: "src/components/CharacterCard.jsx"
      provides: "선택 속성·레벨·마법 동전 수가 표시되는 카드 (속성 emoji + label + 골드 동전 ico + 145)"
      min_lines: 15
    - path: "src/components/FloatingCharacter.jsx"
      provides: "큰 속성 이모지 + 위아래 떠다님 애니메이션 (animate-float-character)"
      min_lines: 10
    - path: "src/components/LessonCard.jsx"
      provides: "오늘의 마법 수업 카드 (제목 + 본문 + '수업 들으러 가기 →')"
      min_lines: 10
    - path: "src/components/MissionCard.jsx"
      provides: "이번 주 임무 카드 + 진행률 바 (% width)"
      contains: "60"
    - path: "src/components/ParentLink.jsx"
      provides: "👨‍👩‍👧 부모님 화면 보기 보조 링크"
      min_lines: 5
    - path: "src/components/ToastMessage.jsx"
      provides: "하단 임시 토스트 — '다음 업데이트에서 만나요!'"
      min_lines: 10
    - path: "src/components/GreetingHeader.jsx"
      provides: "어서 와, 민지! / 오늘은 어떤 마법을 부려볼까?"
      contains: "어서 와"
    - path: "src/screens/DashboardScreen.jsx"
      provides: "전체 화면 2 합성 + props.onRecord 콜백 + 토스트 트리거"
      min_lines: 30
    - path: "src/App.jsx"
      provides: "'onboarding' | 'dashboard' | 'recording' 3-state 머신 + selectedMagic 가드"
      contains: "dashboard"
    - path: "tailwind.config.js"
      provides: "float-character 키프레임/애니메이션 (±6px, 3s ease-in-out infinite) 추가"
      contains: "float-character"
  key_links:
    - from: "src/App.jsx"
      to: "localStorage.selectedMagic"
      via: "screen 라우팅 가드 (없으면 onboarding 강제)"
      pattern: "selectedMagic"
    - from: "src/screens/DashboardScreen.jsx"
      to: "src/data/dummyData.js"
      via: "import { user, today }"
      pattern: "from .*dummyData"
    - from: "src/screens/DashboardScreen.jsx"
      to: "src/data/attributes.js"
      via: "선택한 속성의 emoji/label/color lookup"
      pattern: "ATTRIBUTES.find"
    - from: "src/screens/DashboardScreen.jsx"
      to: "src/App.jsx setScreen('recording')"
      via: "onRecord prop"
      pattern: "onRecord"
    - from: "src/components/FloatingCharacter.jsx"
      to: "tailwind animate-float-character"
      via: "className"
      pattern: "animate-float-character"
---

<objective>
Phase 2 화면 2(메인 대시보드) 구현 — 화면 1에서 선택한 마법사 속성을 캐릭터 카드에 반영하고, 인사말·캐릭터 일러스트(떠다님)·오늘의 수업·이번 주 임무·소비 기록 CTA·부모 링크가 한 화면에 보이며 화면 3 자리로 이동할 수 있게 한다. 디자인 토큰은 Phase 1 UI-SPEC을 100% 상속.

Purpose: 온보딩→대시보드 흐름이 작동해야 "마법사가 됐다 → 매일 여기서 마법을 부린다"의 게임 루프가 살아남. 캐릭터 카드와 떠다니는 일러스트가 selectedMagic 을 반영하지 않으면 Phase 1의 선택 인터랙션이 의미 없어짐.

Output:
- src/data/dummyData.js (user + today 더미 데이터)
- src/components/{GreetingHeader,CharacterCard,FloatingCharacter,LessonCard,MissionCard,ParentLink,ToastMessage}.jsx (7개 신규)
- src/screens/DashboardScreen.jsx (화면 2 합성)
- src/App.jsx 갱신 ('onboarding' | 'dashboard' | 'recording' 3-state + 가드)
- tailwind.config.js 갱신 (float-character keyframe/animation 추가)
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/01-foundation-onboarding/01-UI-SPEC.md
@CLAUDE.md
@경제마법사학교_기능설명서.md

<!-- Phase 1 결과물 — 그대로 재사용/상속 -->
@src/data/attributes.js
@src/App.jsx
@src/screens/PlaceholderScreen.jsx
@src/screens/OnboardingScreen.jsx
@src/components/MobileFrame.jsx
@src/components/SparkleBackground.jsx
@src/components/PrimaryButton.jsx
@src/components/ScreenTitle.jsx
@tailwind.config.js
@src/index.css

<interfaces>
<!-- Executor 가 직접 사용해야 할 기존 계약. 추가 탐색 불필요. -->

From src/data/attributes.js:
```js
export const ATTRIBUTES; // Array of { key, emoji, label, color, title, subtitle }
// key 값: 'fire' | 'water' | 'electric' | 'earth' | 'wind'
// 색: fire=#F97316, water=#38BDF8, electric=#FACC15, earth=#84CC16, wind=#C084FC
// 사용 예: ATTRIBUTES.find((a) => a.key === selectedKey)
```

From src/App.jsx (현재 상태 — 이번 plan 에서 교체):
```jsx
// 현재: screen state = 'onboarding' | 'next'
// 'next' 상태에서 PlaceholderScreen 을 렌더
// localStorage.getItem('selectedMagic') truthy 면 마운트 시 'next' 로 시작
```

From src/components/MobileFrame.jsx:
```jsx
// <MobileFrame>{children}</MobileFrame>
// — 모든 화면 wrapper, 375×667 프레임 + bg-magic-bg 그라데이션
```

From src/components/SparkleBackground.jsx:
```jsx
// <SparkleBackground />
// — 24개 입자 떠다님, pointer-events-none, prefers-reduced-motion 자동 처리
```

From src/components/PrimaryButton.jsx:
```jsx
// <PrimaryButton disabled={false} onClick={fn}>{children}</PrimaryButton>
// — 마젠타 CTA, min-h-[48px], aria-disabled 패턴, full-width
```

From src/components/ScreenTitle.jsx:
```jsx
// <ScreenTitle>{children}</ScreenTitle>
// — 24px 골드 타이틀 (h1, 가운데 정렬)
```

From tailwind.config.js (이번 plan 에서 float-character 추가):
```js
// 기존: animate-float (2s, ±2px, alternate) — 동전 idle 용
// 추가 필요: animate-float-character (3s ease-in-out infinite, ±6px) — 화면 2 캐릭터 일러스트 용
```

From src/index.css:
```css
/* prefers-reduced-motion: reduce 글로벌 룰이 모든 animation/transition 을 0ms 로 강제.
   따라서 새 애니메이션은 별도 reduced-motion 처리 불필요. */
```
</interfaces>

<tokens>
<!-- 잠긴 디자인 토큰 — 신규 색/폰트 weight/spacing 도입 금지 -->
- 60% 배경: bg-magic-bg (그라데이션) — MobileFrame 이 이미 적용
- 30% 카드: bg-white/10 + border border-magic-gold/60 (또는 /40~/60 사이 1택) + rounded-card (16px)
- 10% 골드 액센트: text-magic-gold (제목/동전 아이콘/카드 테두리)
- 마젠타 CTA: PrimaryButton 만 (다른 어디에도 마젠타 사용 금지)
- 5속성 색: 캐릭터 카드의 속성 강조 1곳에만 (예: 카드 좌측 색 dot 또는 emoji 주변 soft glow). FloatingCharacter 의 emoji 자체에는 색 필터 적용 금지 (이모지 자체 색 유지)
- 폰트 weight 2종 only: regular 400 / bold 700
- 폰트 size 4종 only: text-label(14) / text-body(16) / text-heading(24) / text-display(32)
- 모든 인터랙션 ≥ min-h-[48px]
- 카피 톤: "~해봐", "~을까?", 마법학교 어휘 (수업/임무/마법서/마음 친구), 7~9세 어휘
- Korean only
</tokens>
</context>

<tasks>

<task type="auto">
  <name>Task 1: 더미 데이터 + 카드 부품들 + tailwind float-character 토큰 추가</name>
  <files>
    tailwind.config.js,
    src/data/dummyData.js,
    src/components/GreetingHeader.jsx,
    src/components/CharacterCard.jsx,
    src/components/FloatingCharacter.jsx,
    src/components/LessonCard.jsx,
    src/components/MissionCard.jsx,
    src/components/ParentLink.jsx,
    src/components/ToastMessage.jsx
  </files>
  <action>
DASH-01/02/03/05 의 시각 부품들을 모두 만든다. 화면 합성은 Task 2 가 담당. 각 파일 단독으로 동작 가능한 presentational 컴포넌트.

**1) tailwind.config.js 갱신** (animate-float 는 그대로 두고 추가만):
```js
// animation 객체에 추가
'float-character': 'floatCharacter 3s ease-in-out infinite',

// keyframes 객체에 추가
floatCharacter: {
  '0%, 100%': { transform: 'translateY(-6px)' },
  '50%':      { transform: 'translateY(6px)' },
},
```
prefers-reduced-motion 은 src/index.css 글로벌 룰이 자동 차단. 별도 처리 불필요.

**2) src/data/dummyData.js** — PRD PART 5 그대로. selectedMagic 은 localStorage 에서 읽으니 여기서는 제외.
```js
// MVP 더미 데이터. 향후 localStorage 또는 백엔드로 교체 쉽도록 단일 파일 분리.
export const user = {
  name: '민지',
  level: 2,
  coins: 145,
};

export const today = {
  lesson: {
    id: 1,
    title: '용돈은 어디서 오는 걸까?',
    completed: false,
  },
  weeklyMission: {
    title: '갖고 싶은 걸 3일 동안 위시리스트에 담아두기',
    progress: 60,
    progressText: '3/5일',
  },
};
```

**3) src/components/GreetingHeader.jsx** — 인사말. props: `{ name }`.
- 첫 줄: `어서 와, {name}! 🪄` (text-heading text-white font-bold)
- 둘째 줄: `오늘은 어떤 마법을 부려볼까?` (text-body text-magic-cream)
- 좌측 정렬, px-4 정도 여백

**4) src/components/CharacterCard.jsx** — props: `{ attribute, level, coins }`. attribute 는 ATTRIBUTES 배열에서 찾은 객체 (`{emoji,label,color,...}`).
- 카드: `bg-white/10 border border-magic-gold/60 rounded-card p-4`
- 1행: `{attribute.emoji} {attribute.label} 마법사 Lv.{level}` — text-body bold white. 좌측에 작은 색 dot 또는 emoji 주변 inline soft glow 로 attribute.color 사용 (5속성 색이 사용되는 유일한 곳).
- 2행: `🪙 마법 동전 {coins}개` — text-body text-magic-cream. 🪙 는 text-magic-gold 로 색 입혀도 됨.

**5) src/components/FloatingCharacter.jsx** — props: `{ emoji, label }`.
- 큰 emoji (text-[72px] 또는 inline style fontSize 72px) 가운데 정렬
- `animate-float-character` 클래스 적용
- 가운데 div, h-[120px] 정도 영역 확보
- aria-label={`${label} 마법사 캐릭터`}
- onClick 은 받지 않음 (PRD "흔들리는 애니메이션" 은 v1 생략 — 떠다님만 구현)

**6) src/components/LessonCard.jsx** — props: `{ title, onOpen }`.
- 카드: `bg-white/10 border border-magic-gold/60 rounded-card p-4`
- 1행: `📚 오늘의 마법 수업` (text-label text-magic-cream)
- 2행: `"{title}"` (text-body text-white)
- 3행: 우측 정렬 `수업 들으러 가기 →` (text-body text-magic-gold), button 으로 감싸기 (min-h-[48px], onClick={onOpen})

**7) src/components/MissionCard.jsx** — props: `{ title, progress, progressText, onOpen }`.
- 카드 동일 스타일
- 1행: `🎯 이번 주 마법 임무` (text-label text-magic-cream)
- 2행: `"{title}"` (text-body text-white)
- 3행: 진행률 바 — 외곽 `bg-white/20 h-2 rounded-full overflow-hidden`, 내부 `bg-magic-gold h-full` width={`${progress}%`} (inline style — Tailwind 동적 width 안전)
- 4행: `진행 {progress}% ({progressText})` (text-label text-magic-cream)
- 카드 전체가 button 역할 (min-h-[48px], onClick={onOpen})

**8) src/components/ParentLink.jsx** — props: `{ onOpen }`.
- 작은 보조 링크: `<button>👨‍👩‍👧 부모님 화면 보기</button>`
- text-label text-white/70 underline, min-h-[48px], 가운데 정렬
- onClick={onOpen}

**9) src/components/ToastMessage.jsx** — props: `{ message, visible }`. (Task 2 가 visible 토글)
- 하단 fixed/absolute 위치, `bottom-20 left-1/2 -translate-x-1/2`
- `bg-white/10 border border-magic-gold/60 rounded-card px-4 py-2 text-body text-white`
- visible 일 때만 보이게 (visible 이 false 면 null 반환)
- z-30, pointer-events-none, role="status", aria-live="polite"
- transition-opacity duration-300 으로 fade

**중요 - 디자인 토큰 준수:**
- 새 색/폰트 weight/spacing 토큰 도입 금지
- 마젠타 사용 금지 (CTA 만)
- 5속성 색은 CharacterCard 의 attribute 강조 1곳에만
- 모든 button 은 min-h-[48px]

각 파일 상단에 1-2줄 한글 주석으로 역할 설명 (기존 컴포넌트 스타일과 통일).
  </action>
  <verify>
    <automated>
      cd /Users/gowonho/Downloads/20260510/project1 &amp;&amp; \
      test -f src/data/dummyData.js &amp;&amp; \
      test -f src/components/GreetingHeader.jsx &amp;&amp; \
      test -f src/components/CharacterCard.jsx &amp;&amp; \
      test -f src/components/FloatingCharacter.jsx &amp;&amp; \
      test -f src/components/LessonCard.jsx &amp;&amp; \
      test -f src/components/MissionCard.jsx &amp;&amp; \
      test -f src/components/ParentLink.jsx &amp;&amp; \
      test -f src/components/ToastMessage.jsx &amp;&amp; \
      grep -q "민지" src/data/dummyData.js &amp;&amp; \
      grep -q "145" src/data/dummyData.js &amp;&amp; \
      grep -q "60" src/data/dummyData.js &amp;&amp; \
      grep -q "float-character" tailwind.config.js &amp;&amp; \
      grep -q "floatCharacter" tailwind.config.js &amp;&amp; \
      grep -q "animate-float-character" src/components/FloatingCharacter.jsx &amp;&amp; \
      grep -q "어서 와" src/components/GreetingHeader.jsx &amp;&amp; \
      grep -q "마법 동전" src/components/CharacterCard.jsx &amp;&amp; \
      grep -q "오늘의 마법 수업" src/components/LessonCard.jsx &amp;&amp; \
      grep -q "이번 주 마법 임무" src/components/MissionCard.jsx &amp;&amp; \
      grep -q "부모님 화면 보기" src/components/ParentLink.jsx &amp;&amp; \
      grep -q "다음 업데이트" src/components/ToastMessage.jsx 2>/dev/null || \
        grep -q "role=\"status\"" src/components/ToastMessage.jsx &amp;&amp; \
      echo "OK"
    </automated>
  </verify>
  <done>
    9개 파일 (tailwind.config.js 갱신 + 8개 신규) 모두 존재. 각 컴포넌트가 import 만 하면 단독 렌더 가능. 디자인 토큰(magic-gold/cream, bg-white/10, rounded-card, text-body/label) 만 사용. 마젠타 미사용. 5속성 색은 CharacterCard 1곳에만. 모든 button min-h-[48px]. tailwind 에 float-character 키프레임/애니메이션 추가됨.
  </done>
</task>

<task type="auto">
  <name>Task 2: DashboardScreen 합성 + App.jsx 3-state 라우팅 + selectedMagic 가드 + 토스트 흐름</name>
  <files>
    src/screens/DashboardScreen.jsx,
    src/App.jsx
  </files>
  <action>
Task 1 의 부품들을 합성해 화면 2 를 완성하고, App.jsx 의 화면 머신을 'onboarding' | 'dashboard' | 'recording' 3-state 로 교체. PlaceholderScreen 은 이제 'recording' 상태(화면 3 자리)에서만 사용.

**1) src/screens/DashboardScreen.jsx 신규 작성:**

Props: `{ selectedKey, onRecord, onBackToOnboarding }`

```jsx
import { useState } from 'react';
import { ATTRIBUTES } from '../data/attributes';
import { user, today } from '../data/dummyData';
import MobileFrame from '../components/MobileFrame';
import SparkleBackground from '../components/SparkleBackground';
import GreetingHeader from '../components/GreetingHeader';
import CharacterCard from '../components/CharacterCard';
import FloatingCharacter from '../components/FloatingCharacter';
import LessonCard from '../components/LessonCard';
import MissionCard from '../components/MissionCard';
import ParentLink from '../components/ParentLink';
import PrimaryButton from '../components/PrimaryButton';
import ToastMessage from '../components/ToastMessage';

// 화면 2 — 메인 대시보드.
// 합성: GreetingHeader → CharacterCard → FloatingCharacter → LessonCard →
//       MissionCard → "오늘의 소비 기록하기" CTA → ParentLink + Toast.
// 가드: selectedKey 가 ATTRIBUTES 에 없으면 부모(App)가 onBackToOnboarding 호출하도록 useEffect 처리.
```

레이아웃:
- MobileFrame 안에 SparkleBackground
- z-10 컨테이너: `flex flex-col min-h-[667px] px-4 py-6 gap-4`
- 순서대로 위 컴포넌트 배치
- "오늘의 소비 기록하기 ✏️" PrimaryButton: onClick={onRecord} (CTA 한 줄)
- ParentLink: 가장 아래 (mt-auto 또는 별도 footer 영역)

가드 로직 (useEffect 또는 early return):
```jsx
const attribute = ATTRIBUTES.find((a) => a.key === selectedKey);
useEffect(() => {
  if (!attribute) onBackToOnboarding?.();
}, [attribute, onBackToOnboarding]);
if (!attribute) return null; // 잠깐의 깜박임 방지
```

토스트 핸들러:
```jsx
const [toast, setToast] = useState(null); // null | string
const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 1800);
};
```

수업 카드 onOpen → `showToast('다음 업데이트에서 만나요!')`
임무 카드 onOpen → `showToast('다음 업데이트에서 만나요!')`
ParentLink onOpen → `showToast('다음 업데이트에서 만나요!')`

`<ToastMessage message={toast ?? ''} visible={!!toast} />` 마지막에 렌더.

PrimaryButton 안 라벨: `✏️ 오늘의 소비 기록하기` (마젠타는 이 버튼만)

**2) src/App.jsx 교체** — screen state 를 3-state 로 확장:

```jsx
import { useState, useEffect } from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

// App — 화면 라우팅 머신.
// state: 'onboarding' | 'dashboard' | 'recording'
// 마운트 시 localStorage.selectedMagic 이 있으면 'dashboard' 로 진입.
// 'recording' 은 화면 3 자리 — Phase 3 에서 RecordScreen 으로 교체될 PlaceholderScreen.

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
      setScreen('dashboard');
    }
  }, []);

  const goToOnboarding = () => {
    setSelectedKey(null);
    setScreen('onboarding');
  };

  if (screen === 'recording') {
    return <PlaceholderScreen selectedKey={selectedKey} />;
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
```

**3) Dev 서버 HMR 확인** (이미 5173 에서 돌아가고 있음 — 자동 반영):
- 브라우저에서 localhost:5173 새로고침 후, 이전 selectedMagic 값에 따라 대시보드가 곧장 떠야 함
- localStorage.removeItem('selectedMagic') 후 새로고침 시 온보딩으로 돌아가야 함

**디자인 토큰 자기점검:**
- 새 색 추가? ❌
- 마젠타 사용 위치? PrimaryButton 1곳만 ✅
- 모든 button min-h-[48px] ✅
- 5속성 색은 CharacterCard 1곳만 ✅

**SUMMARY.md verify 체크리스트** (Task 완료 후 SUMMARY 작성 시 박을 것 — 12개 미만):
1. [ ] 앱 새로고침 시 selectedMagic 있으면 대시보드 바로 표시
2. [ ] selectedMagic 없을 때 (devtools 에서 removeItem) 새로고침 → 온보딩으로 복귀
3. [ ] 캐릭터 카드의 속성·label 이 selectedMagic 과 일치 (예: water → 💧 물 마법사)
4. [ ] 캐릭터 일러스트 emoji 가 위아래 떠다님 (3초 주기)
5. [ ] prefers-reduced-motion 활성 시 떠다님 멈춤 (devtools rendering 탭)
6. [ ] 인사말 "어서 와, 민지!" 표시
7. [ ] 마법 동전 145 / 임무 진행률 60% 바 시각 확인
8. [ ] 수업/임무/부모 링크 클릭 시 토스트 "다음 업데이트에서 만나요!" 1.8초 노출
9. [ ] "오늘의 소비 기록하기" 클릭 시 화면 3 자리(PlaceholderScreen)로 이동
10. [ ] 데스크톱에서도 375×667 모바일 프레임 안에서 표시
11. [ ] 모든 인터랙션 요소 높이 ≥48px (devtools inspect)
  </action>
  <verify>
    <automated>
      cd /Users/gowonho/Downloads/20260510/project1 &amp;&amp; \
      test -f src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "DashboardScreen" src/App.jsx &amp;&amp; \
      grep -q "'dashboard'" src/App.jsx &amp;&amp; \
      grep -q "'recording'" src/App.jsx &amp;&amp; \
      grep -q "onBackToOnboarding" src/App.jsx &amp;&amp; \
      grep -q "from '../data/dummyData'" src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "ATTRIBUTES.find" src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "onRecord" src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "다음 업데이트" src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "오늘의 소비 기록하기" src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "PrimaryButton" src/screens/DashboardScreen.jsx &amp;&amp; \
      grep -q "ToastMessage" src/screens/DashboardScreen.jsx &amp;&amp; \
      ! grep -E "bg-(red|blue|green|purple)-[0-9]" src/screens/DashboardScreen.jsx src/components/CharacterCard.jsx src/components/LessonCard.jsx src/components/MissionCard.jsx 2>/dev/null &amp;&amp; \
      npx vite build --mode development 2>&amp;1 | tail -5 &amp;&amp; \
      echo "BUILD_OK"
    </automated>
  </verify>
  <done>
    DashboardScreen.jsx 가 7개 부품 + PrimaryButton + ToastMessage 를 모두 import 해 합성. App.jsx 가 3-state 머신('onboarding'|'dashboard'|'recording') + 가드(selectedMagic 없으면 onboarding 복귀) 동작. 토스트가 수업/임무/부모 링크 클릭 시 1.8초 노출 후 사라짐. PrimaryButton 한 곳만 마젠타. Vite 빌드 에러 없이 통과 (HMR 도 자동 반영). 디자인 토큰 외 색상 클래스(bg-red-*, bg-blue-* 등) 신규 사용 0건.
  </done>
</task>

</tasks>

<verification>
**자동 검증 (각 task verify 가 처리):**
- 모든 신규 파일 존재
- tailwind.config.js 의 float-character 키프레임 추가
- App.jsx 3-state 라우팅 + 가드
- Vite dev build 성공 (구문 에러 없음)
- 디자인 토큰 외 색상 도입 0건

**수동 검증 (SUMMARY 체크리스트 11개로 정리됨, 12개 미만 OK):**
화면 1 → 선택 완료 → 대시보드 자동 진입 → 새로고침 후 대시보드 유지 → "오늘의 소비 기록하기" → PlaceholderScreen → devtools 에서 selectedMagic 제거 후 새로고침 → 온보딩 복귀 → 5속성 각각 선택 후 대시보드의 캐릭터 카드/FloatingCharacter 가 모두 정확히 반영되는지 확인.

**디자인 토큰 자기점검 (planner gate):**
- [x] 새 색/폰트 weight/spacing 토큰 도입 0건 (float-character 키프레임만 추가 — animation 토큰)
- [x] 마젠타 사용은 PrimaryButton 1곳만
- [x] 5속성 색은 CharacterCard 1곳만 (FloatingCharacter 의 emoji 자체에는 색 필터 적용 금지)
- [x] 모든 인터랙션 button min-h-[48px]
- [x] prefers-reduced-motion 정책은 src/index.css 글로벌 룰이 자동 처리
</verification>

<success_criteria>
**ROADMAP Phase 2 success criteria 5개 모두 만족:**

1. ✅ 온보딩에서 선택한 속성(예: 물 마법사)이 대시보드 캐릭터 카드에 반영되어 표시 (DASH-01) — CharacterCard 가 ATTRIBUTES.find(selectedKey) 결과 렌더
2. ✅ 캐릭터 이모지+CSS 일러스트가 3초 주기로 위아래 떠다니는 애니메이션 (DASH-02) — FloatingCharacter + animate-float-character (3s ease-in-out infinite, ±6px)
3. ✅ 오늘의 마법 수업 카드와 이번 주 임무 카드(진행률 바 포함) 표시 (DASH-03) — LessonCard + MissionCard
4. ✅ "오늘의 소비 기록하기" 마젠타 버튼 클릭 시 화면 3으로 이동 (DASH-04) — PrimaryButton onClick={onRecord} → setScreen('recording') → PlaceholderScreen
5. ✅ "부모님 화면 보기" 보조 링크가 화면 하단에 표시 (DASH-05, v1 placeholder) — ParentLink + 토스트 안내

**추가 가드:**
- selectedMagic 없이 dashboard 진입 시 자동으로 onboarding 복귀 (Phase 1 ↔ 2 흐름 일관성)
</success_criteria>

<output>
After completion, create `.planning/quick/260510-gwt-phase-2-2/260510-gwt-SUMMARY.md` using `@$HOME/.claude/get-shit-done/templates/summary.md`. SUMMARY 에 위 11개 수동 verify 체크리스트를 포함할 것 (12개 미만 룰 준수).
</output>
