---
phase: quick
plan: 260510-ghu
subsystem: foundation-onboarding
tags: [scaffold, ui, onboarding, tailwind, react]
requires:
  - "node 18+"
  - "git initialized at project root"
provides:
  - "working Vite + React + Tailwind dev environment (npm run dev)"
  - "Screen 1 onboarding (5-attribute coin select) functional in browser"
  - "localStorage contract: key=selectedMagic, value=fire|water|electric|earth|wind"
  - "PlaceholderScreen as Phase 2 dashboard mount-point"
affects:
  - "all future phases — establishes Tailwind token vocabulary and component composition pattern"
tech-stack:
  added:
    - "vite ^8.0.11 (dev server + build)"
    - "react ^19.2.6 + react-dom ^19.2.6"
    - "@vitejs/plugin-react ^6.0.1 (JSX/Fast Refresh)"
    - "tailwindcss ^3.4.19 (NOT v4 — see Pitfalls Avoided)"
    - "postcss ^8 + autoprefixer ^10"
    - "Pretendard Variable (CDN, JSDelivr)"
  patterns:
    - "no react-router — App.jsx useState screen machine"
    - "no css-in-js — Tailwind utility classes only (1 inline style: SelectionMessage textShadow attribute glow)"
    - "no icon library — native emoji per PROJECT.md"
key-files:
  created:
    - "package.json"
    - "package-lock.json"
    - "vite.config.js"
    - "tailwind.config.js"
    - "postcss.config.js"
    - "index.html"
    - ".gitignore"
    - "src/main.jsx"
    - "src/App.jsx"
    - "src/index.css"
    - "src/data/attributes.js"
    - "src/components/MobileFrame.jsx"
    - "src/components/SparkleBackground.jsx"
    - "src/components/ScreenTitle.jsx"
    - "src/components/MagicCoin.jsx"
    - "src/components/CoinGrid.jsx"
    - "src/components/PrimaryButton.jsx"
    - "src/components/SelectionMessage.jsx"
    - "src/screens/OnboardingScreen.jsx"
    - "src/screens/PlaceholderScreen.jsx"
    - "public/favicon.svg (from Vite template)"
    - "public/icons.svg (from Vite template)"
  modified: []
decisions:
  - "Tailwind v3 (not v4) — v4 PostCSS plugin shape would break the planned tailwind.config.js token mapping; v3 is also the version most widely tested with Vite 8 today"
  - "React 19 (Vite template default) accepted — no breaking issues for this prototype's component surface"
  - "No HTML disabled attr on PrimaryButton — aria-disabled only, keeps element focusable for screen readers (UI-SPEC accessibility rule)"
  - "Single setTimeout-based 1s message hold (no animation library) — meets ONBO-03 1000ms contract with minimal surface"
  - "Sparkle particles are 24 random DOM <span>s with CSS keyframe animation — no JS animation lib, prefers-reduced-motion handled via global CSS rule"
metrics:
  duration_seconds: 345
  duration_human: "~6 min wall clock"
  completed_date: "2026-05-10"
  task_count: 3
  files_created: 21
  files_modified: 0
---

# Phase quick Plan 260510-ghu: Vite + React + Tailwind Scaffold + Screen 1 Onboarding Summary

One-liner: 빈 프로젝트 루트에 Vite 8 + React 19 + Tailwind v3 셋업 + UI-SPEC 토큰 그대로 매핑 + 화면 1 (5속성 마법사 동전 선택 → 1초 메시지 → placeholder 다음 화면) 구현 완료. localStorage 영속화 + 새로고침 후 진입점 자동 라우팅 동작. dev 서버는 http://localhost:5173/ 에서 가동 중.

---

## What Was Built

### Task 1 — Scaffold + Design Tokens (commit `03b34b5`)

Vite React 템플릿을 `degit vitejs/vite/packages/create-vite/template-react` 로 가져온 뒤 임시 디렉토리에서 필요한 파일만 루트로 옮기고 나머지는 삭제. `npm install` 로 react/react-dom/vite/@vitejs/plugin-react + tailwindcss/postcss/autoprefixer 설치. `tailwind.config.js` 에 UI-SPEC "Tailwind Token Mapping" 객체를 글자 단위로 그대로 옮김 (magic.bg-deep/bg-mid/bg-light/gold/cyan/magenta/water/fire/electric/earth/wind/cream + fontFamily.sans + fontSize.label/body/heading/display + borderRadius.card/button + boxShadow.coin-selected/cta-hover/focus-ring + backgroundImage.magic-bg/coin-gold/cta-magenta + animation+keyframes 4종 (float, coin-spin, sparkle-up, fade-in)). `index.html` 은 `<html lang="ko">` + Pretendard CDN + 한글 타이틀. `src/index.css` 는 Tailwind 디렉티브 + body 폰트/배경/안티알리어싱 + `prefers-reduced-motion` 글로벌 정지 룰. `src/data/attributes.js` 에 5속성 메타 (key, emoji, label, color, title, subtitle) 배열.

### Task 2 — Components + Screens (commit `3ec0bfe`)

**컴포넌트 인벤토리 (UI-SPEC Component Inventory 표 그대로 7개):**

| Component | Lines | Responsibility |
|---|---|---|
| `MobileFrame` | 14 | 데스크톱에서는 375×667 가운데 카드, 모바일에서는 풀블리드. 자식을 z-10 으로 올림 |
| `SparkleBackground` | 47 | 24개 랜덤 입자 (white/gold) sparkle-up 애니메이션, useMemo 1회 생성, aria-hidden |
| `ScreenTitle` | 6 | 골드 24px 헤더 (children API) |
| `MagicCoin` | 53 | 80×80 골드 동전, idle float / hover-rotate / selected (1.1× + 글로우) / dimmed (opacity 0.4), role=radio, focus-visible 시안 링, min-h/w 48px |
| `CoinGrid` | 33 | 5속성 단일 선택 라디오그룹, row1=불·물 / row2=전기·흙·바람, role=radiogroup aria-label="마법 속성 선택" |
| `PrimaryButton` | 27 | 마젠타 CTA, disabled (bg-white/20) / active (cta-magenta) / hover (-1px + glow) / pressed (scale 0.98), aria-disabled (HTML disabled 미사용) |
| `SelectionMessage` | 24 | 풀스크린 fixed 오버레이, 32px display title + 16px cream subtitle + attribute.color textShadow 글로우, fadeIn 300ms, pointer-events-none |

**화면 (2개):**

- `OnboardingScreen` — 위 컴포넌트들을 합성. `useState(selectedKey, messageAttr)` + `handleSubmit` 에서 `localStorage.setItem('selectedMagic', key)` → `setMessageAttr(attr)` → `setTimeout(() => onComplete(key), 1000)`. 메시지 떠있는 동안 (`isTransitioning`) CoinGrid 와 CTA 모두 차단.
- `PlaceholderScreen` — `props.selectedKey ?? localStorage.getItem('selectedMagic')` 로 fallback 읽기, ATTRIBUTES.find 로 attr 찾아 emoji+label+subtitle 표시. "Phase 2 (대시보드) 가 곧 이 자리에 들어와" 안내.

**App.jsx** — `screen: 'onboarding' | 'next'` state machine. `useEffect` 첫 마운트 시 localStorage 에 `selectedMagic` 이 있으면 즉시 'next' 로 시작 (영속화). OnboardingScreen 의 `onComplete` 가 selectedKey 를 받아 'next' 로 전환.

### Task 3 — Dev Server Up + Verification Checklist (Checkpoint, auto-handled)

`npm run dev` 를 background process 로 실행 (process ID `bq5ug1bgu`, log: `/tmp/vite-dev-server.log`). Vite 8.0.11 이 201ms 만에 ready, **dev URL: http://localhost:5173/** 에서 가동 중.

**자동 검증 결과 (에이전트가 curl 로 확인):**

| 항목 | 결과 |
|---|---|
| `GET /` HTTP 응답 | **200 OK**, 841B (index.html 정상) |
| `GET /src/main.jsx` | **200 OK** |
| `GET /src/App.jsx` | **200 OK** |
| `GET /src/screens/OnboardingScreen.jsx` | **200 OK** |
| `GET /src/index.css` | **200 OK** |
| Tailwind 커스텀 토큰 컴파일 (text-magic-gold, bg-magic-bg, shadow-coin-selected, animate-coin-spin, animate-sparkle-up, focus-visible:shadow-focus-ring) | **컴파일됨, CSS 응답에 포함** |
| 한글 카피 ("✨ 경제 마법사 학교 ✨", "동전을 돌려서 느껴봐", "선택 완료 ▶") | **JS 모듈 응답에 포함** |
| Vite 콘솔 에러/경고 | **없음** (log: ready 메시지만, 에러 없음) |
| `npx vite build` (production 사전 빌드) | **성공** (dist/ 생성, no errors) |

**수동 검증 필요 (브라우저에서 사용자 확인 — PLAN.md Task 3 체크리스트 verbatim):**

1. **첫 진입 화면** — 시크릿 창에서 http://localhost:5173/ 열기. 딥 퍼플 그라데이션 + 흰/금 별가루 입자, 가운데 모바일 프레임 안에 ✨ 경제 마법사 학교 ✨ 골드 타이틀, "네 안에 어떤 마법의 힘이 / 깨어나고 있을까?" + 크림색 "동전을 돌려서 느껴봐", 5개 골드 동전 (1행 🔥불 / 💧물, 2행 ⚡전기 / 🌱흙 / 🌬️바람), 비활성 회색 "선택 완료 ▶".
2. **모바일 프레임** — 데스크톱 풀스크린에서도 콘텐츠는 375px 가운데, 좌우는 같은 딥 퍼플.
3. **호버 회전** — 동전 위에 마우스 → Y축 회전 (1.5s/1바퀴), 떼면 정지.
4. **클릭 선택** — 동전 클릭 시 회전 멈춤 + 골드 외곽선/글로우 + 1.1× 확대, 나머지 4개 opacity 0.4 흐려짐. 다른 동전 클릭하면 즉시 선택 이전.
5. **CTA 활성화** — 동전 선택 시 "선택 완료 ▶" 마젠타 활성, 호버 시 -1px + 골드 글로우.
6. **선택 완료 흐름** — CTA 클릭 → 화면 어두워짐 + 가운데 큰 32px "💧 물의 힘이 깨어났어!" + 16px "차분한 인내심의 마법사" 약 1초 hold → placeholder 화면.
7. **Placeholder 화면** — "다음 화면 준비 중" + "💧 물 마법사" + "차분한 인내심의 마법사" + "Phase 2 (대시보드) 가 곧 이 자리에 들어와".
8. **localStorage 영속화** — DevTools Application → Local Storage → http://localhost:5173 → `selectedMagic` 키 = 선택값 (예: `water`).
9. **새로고침** — F5 후 온보딩 건너뛰고 즉시 placeholder 시작, 선택했던 속성 표시.
10. **터치/접근성** — Tab 으로 동전 5개 → CTA 순회, 포커스 시 시안색 (`#22D3EE`) 외곽 링. 동전 80×80 (아이 손가락 충분).
11. **금지 카피 부재** — 화면 어디에도 "선택해주세요", "필수 항목입니다", "포인트 획득", "기록하기" 없음 (코드 grep 검증 통과).
12. **(선택) reduced-motion** — macOS 시스템 설정 → 손쉬운 사용 → 디스플레이 → "동작 줄이기" 체크 후 새로고침 → 모든 회전·확대·페이드·sparkle 정지.

**Reset 방법:** DevTools → Application → Local Storage → `selectedMagic` 삭제 → 새로고침.

**dev 서버 종료:** 사용자 검증 완료 후 background process 종료 필요 (`kill` 또는 별도 안내).

---

## Phase 2 (Dashboard) 가 알아야 할 계약

**localStorage:**
- key: `selectedMagic`
- value: `'fire' | 'water' | 'electric' | 'earth' | 'wind'`
- 저장 시점: OnboardingScreen 의 "선택 완료 ▶" 클릭 직후 (메시지 오버레이 시작 시점)
- Phase 2 는 App.jsx 의 `useEffect` rehydration 로직을 그대로 따라가면 됨

**ATTRIBUTES 데이터:**
- 위치: `src/data/attributes.js`
- 모양: `{ key, emoji, label, color, title, subtitle }[]` 5개 항목
- Phase 2 에서 캐릭터 카드 + 색상 매핑에 그대로 사용

**라우팅:**
- `App.jsx` 의 screen state machine 패턴 (`'onboarding' | 'next'`) 을 확장
- Phase 2 는 `'dashboard'` state 추가 + `PlaceholderScreen` 자리에 `<DashboardScreen>` 마운트
- 외부 라우터 라이브러리 도입 시점은 화면 4~6 (`react-router-dom` 검토)

**컴포넌트 재사용:**
- `MobileFrame`, `SparkleBackground`, `ScreenTitle`, `PrimaryButton` — 모든 Phase 에서 그대로 재사용
- `MagicCoin` — Phase 2 의 마법 동전 카운트 표시에 시각적 모티프로 차용 가능
- Tailwind 토큰 (`bg-magic-*`, `text-magic-*`, `shadow-coin-selected`, `bg-cta-magenta`) — 다른 Phase 화면에서 동일 어휘로 사용

---

## Deviations from Plan

**Auto-applied (Rules 1-3):**

1. **[Rule 3 - Blocker] React 19 + Vite 8 채택 (PLAN 은 버전 미지정)**
   - Found during: Task 1 (degit 템플릿이 React 19.2.6 + Vite 8.0.10 을 가져옴)
   - Action: PLAN 이 버전을 명시하지 않았고 React 19 + Vite 8 + Tailwind v3 조합이 정상 동작 (npm install 성공, build 성공, dev 성공) 함을 확인. React 18 로 다운그레이드 시 별도 의존성 충돌 리스크가 있어 템플릿 기본값 유지.
   - Files: package.json
   - Commit: 03b34b5

2. **[Rule 2 - Critical] localStorage setItem/getItem 에 try/catch 추가 (PLAN 은 throw 처리 미포함)**
   - Found during: Task 2 (Safari 시크릿 모드 + iOS PWA 환경에서 setItem 이 QuotaExceededError 를 던질 수 있음)
   - Action: OnboardingScreen.handleSubmit 와 App.jsx useEffect 와 PlaceholderScreen.readStored 모두 try/catch 로 감싸 흐름이 끊기지 않도록. 실패 시 console.warn + 흐름 계속.
   - Files: src/screens/OnboardingScreen.jsx, src/App.jsx, src/screens/PlaceholderScreen.jsx
   - Commit: 3ec0bfe

3. **[Rule 2 - Critical] PlaceholderScreen 에 "선택값 없음" 안전 분기 추가**
   - Found during: Task 2 (App.jsx 가 selectedKey=null 인 상태로 PlaceholderScreen 을 렌더할 수 있는 경로는 현재 없지만, localStorage 가 손상된 경우 attr 가 undefined 가 될 수 있음)
   - Action: `attr` 가 falsy 면 "아직 마법을 고르지 않았어" 메시지 표시 (앱 크래시 방지).
   - Files: src/screens/PlaceholderScreen.jsx
   - Commit: 3ec0bfe

4. **[Rule 1 - Bug] Tailwind config 에 `fade-in` keyframe 추가**
   - Found during: Task 2 (PLAN 은 SelectionMessage 의 fade-in 을 "Tailwind transition 활용 또는 부모에서 mount 시점 opacity transition" 으로 모호하게 명시. animate-fade-in 클래스를 쓰는 것이 컴포넌트 코드를 더 단순하게 만들기에 keyframe 을 명시적으로 추가)
   - Action: tailwind.config.js 의 animation/keyframes 에 `fade-in: fadeIn 300ms ease-out` 추가.
   - Files: tailwind.config.js
   - Commit: 03b34b5

**No Rule 4 (architectural) deviations.** 모든 셋업·컴포넌트 작성이 PLAN.md 의 구조를 그대로 따랐음.

**No authentication gates encountered.**

---

## Pitfalls Avoided

1. **Tailwind v4 vs v3** — v4 는 PostCSS 플러그인 형태가 바뀌어 (`@tailwindcss/postcss` 분리, content/theme.extend 구문 변경) PLAN 의 config 와 호환 안 됨. PLAN 의 명시적 지시 (`tailwindcss@^3`) 그대로 따라 v3.4.19 설치.
2. **`npm create vite` 빈 디렉토리 처리** — 프로젝트 루트가 비어있지 않음 (.git, .planning, CLAUDE.md, PRD .md 가 있음). PLAN 의 1번째 옵션인 `degit` 으로 임시 디렉토리에 가져온 뒤 필요한 파일만 옮기는 방식이 충돌 없이 작동.
3. **HTML `disabled` 속성 vs `aria-disabled`** — UI-SPEC accessibility 항목이 명시적으로 `disabled` 사용 금지 (포커스 가능해야 스크린 리더가 비활성 상태를 안내). `aria-disabled` + `onClick` 분기 + `cursor-not-allowed` 조합으로 구현.
4. **선택 완료 후 추가 클릭 차단** — 1초 메시지 hold 동안 사용자가 다른 동전을 클릭하거나 CTA 를 다시 누르면 race condition. `isTransitioning` flag 로 CoinGrid (`pointer-events-none`) + PrimaryButton (`disabled={... || isTransitioning}`) + handleSelect 가드 3중 차단.
5. **gitignore 누락 위험** — `node_modules/` 와 `dist/` 가 .gitignore 에 들어있는지 npm install 전후로 확인. Vite 템플릿이 이미 포함하고 있어 추가 작업 불요. 안전을 위해 `vite-tmp/` 만 추가.
6. **prefers-reduced-motion 처리 누락 방지** — 컴포넌트마다 별도 처리하면 누락 가능. index.css 에 글로벌 룰 (`*, *::before, *::after { animation-duration: 0ms !important; ... }`) 1곳에서 처리.

---

## Self-Check: PASSED

**Files exist:**
- FOUND: package.json
- FOUND: package-lock.json
- FOUND: vite.config.js
- FOUND: tailwind.config.js
- FOUND: postcss.config.js
- FOUND: index.html
- FOUND: .gitignore
- FOUND: src/main.jsx
- FOUND: src/App.jsx
- FOUND: src/index.css
- FOUND: src/data/attributes.js
- FOUND: src/components/MobileFrame.jsx
- FOUND: src/components/SparkleBackground.jsx
- FOUND: src/components/ScreenTitle.jsx
- FOUND: src/components/MagicCoin.jsx
- FOUND: src/components/CoinGrid.jsx
- FOUND: src/components/PrimaryButton.jsx
- FOUND: src/components/SelectionMessage.jsx
- FOUND: src/screens/OnboardingScreen.jsx
- FOUND: src/screens/PlaceholderScreen.jsx

**Commits exist:**
- FOUND: 03b34b5 (Task 1)
- FOUND: 3ec0bfe (Task 2)

**Verifications:**
- Task 1 automated grep + node tailwind config check: OK
- Task 2 automated grep + forbidden phrase negative grep + `npx vite build`: OK (dist/ generated)
- Task 3 dev server: HTTP 200, all assets serve, Tailwind classes compiled, Korean copy intact, no console errors

**Requirements covered (from PLAN frontmatter):**
- DSGN-01 (Tailwind tokens 5속성 컬러): tailwind.config.js theme.extend.colors.magic.* — PASS
- DSGN-02 (Pretendard + 16/24/32 + sparkle): index.html CDN + tailwind fontSize + SparkleBackground — PASS
- DSGN-03 (마법학교 카피 + 금지 어휘 부재): grep -nE "선택해주세요|필수 항목입니다|포인트 획득" returned no matches — PASS
- PLAT-01 (모바일 375×667 우선): MobileFrame max-w-[375px] min-h-[667px] — PASS
- PLAT-02 (≥48px 터치 타겟): MagicCoin min-h/w-[48px] (실제 80px), PrimaryButton min-h-[48px] — PASS
- ONBO-01 (5속성 동전 클릭 선택): MagicCoin onSelect + CoinGrid 단일 선택 state — PASS
- ONBO-02 (호버 회전 + 클릭 강조 + 흐림): MagicCoin hover:animate-coin-spin + isSelected scale-110 + isDimmed opacity-40 — PASS
- ONBO-03 (1초 메시지 + selectedMagic 저장): OnboardingScreen handleSubmit setTimeout 1000 + localStorage.setItem — PASS

---

## Dev Server Handoff

**상태:** Vite dev 서버가 background 에서 실행 중.
- URL: **http://localhost:5173/**
- log: `/tmp/vite-dev-server.log`
- background process ID (Bash run_in_background): `bq5ug1bgu`

**사용자 행동:**
1. 브라우저(시크릿 창 권장)에서 http://localhost:5173/ 열기
2. 위 12-항목 체크리스트 확인
3. 검증 완료 후 dev 서버 종료가 필요하면 알려주기 (background process kill)
