---
phase: quick-260510-gwt
plan: 01
subsystem: ui
tags: [react, vite, tailwind, dashboard, screen-2, korean-ui, kid-ux]

# Dependency graph
requires:
  - phase: quick-260510-ghu
    provides: Phase 1 화면 1 (5속성 동전 선택) — selectedMagic localStorage 영속화 + ATTRIBUTES 메타데이터 + MobileFrame/SparkleBackground/PrimaryButton/ScreenTitle 재사용 부품
provides:
  - 화면 2 (메인 대시보드) 작동: 인사말 + 캐릭터 카드 + 떠다니는 캐릭터 + 오늘의 수업 + 이번 주 임무(60% 진행률 바) + 마젠타 CTA + 부모 링크 + 토스트
  - 3-state 라우팅 머신: 'onboarding' | 'dashboard' | 'recording'
  - selectedMagic 가드: 무효/누락 시 자동 온보딩 복귀
  - tailwind animate-float-character 토큰 (3s ease-in-out infinite, ±6px)
  - 7개 신규 React 컴포넌트 + 1개 신규 더미 데이터 모듈
affects: [phase-3-recording, phase-4-friend, phase-5-lesson, phase-6-parent]

tech-stack:
  added: []
  patterns:
    - "presentational component + showToast 콜백 패턴 (수업/임무/부모 링크가 같은 placeholder 토스트 공유)"
    - "selectedKey 가드 = useEffect + null 렌더 + 부모 콜백으로 화면 머신 복귀"
    - "5속성 색은 CharacterCard 1곳에만 (FloatingCharacter 의 emoji 자체에는 색 필터 적용 금지)"

key-files:
  created:
    - src/screens/DashboardScreen.jsx
    - src/data/dummyData.js
    - src/components/GreetingHeader.jsx
    - src/components/CharacterCard.jsx
    - src/components/FloatingCharacter.jsx
    - src/components/LessonCard.jsx
    - src/components/MissionCard.jsx
    - src/components/ParentLink.jsx
    - src/components/ToastMessage.jsx
  modified:
    - tailwind.config.js
    - src/App.jsx

key-decisions:
  - "selectedMagic 가드: 단순 truthy 체크 대신 ATTRIBUTES.some() 으로 유효 키 검증 (예: localStorage 에 'invalid' 같은 더러운 값이 들어 있으면 dashboard 진입 차단 → onboarding 복귀)"
  - "수업/임무/부모 링크 모두 같은 placeholder 토스트 공유 (DRY, Phase 3 에서 개별 라우팅으로 교체 예정)"
  - "FloatingCharacter 의 emoji 에는 색 필터 미적용 — 이모지 자체 색 유지하면서 캐릭터 카드의 dot 한 곳에만 5속성 색 (UI-SPEC 5속성 색 사용 1곳 제한)"
  - "ToastMessage 는 visible=false 일 때 null 반환 — fade-out 애니메이션은 prefers-reduced-motion 글로벌 룰이 처리하니 별도 로직 없음"
  - "PRD 의 '캐릭터 클릭 시 흔들림' 인터랙션은 v1 생략 — 떠다님 애니메이션만으로 충분, 시간 절약"

patterns-established:
  - "Card UI 공통 스타일: bg-white/10 + border border-magic-gold/60 + rounded-card p-4 — LessonCard / MissionCard / CharacterCard / ToastMessage 모두 동일"
  - "Button-as-Card: LessonCard 와 MissionCard 는 카드 전체가 button (min-h-[48px] + focus-visible 포커스 링 + hover bg)"
  - "Toast 핸들러: showToast(msg) → setToast(msg); setTimeout(setToast(null), 1800) — 단일 setState 로 충분"

requirements-completed: [DASH-01, DASH-02, DASH-03, DASH-04, DASH-05]

# Metrics
duration: 3min
completed: 2026-05-10
---

# Quick Task 260510-gwt: Phase 2 화면 2 (메인 대시보드) Summary

**온보딩에서 선택한 마법사 속성이 그대로 반영되는 모바일 대시보드 + 'onboarding | dashboard | recording' 3-state 라우팅 + selectedMagic 무효 시 자동 온보딩 복귀 가드까지 완성.**

## Performance

- **Duration:** ~3 min (executor wall-time, planning/PLAN 작성 시간 별도)
- **Started:** 2026-05-10T03:15:50Z
- **Completed:** 2026-05-10T03:18:47Z
- **Tasks:** 2/2
- **Files modified:** 11 (9 created, 2 modified)
- **Build:** Vite dev build 통과 (35 modules, 0 warning)

## Accomplishments

- 화면 1 → 화면 2 → 화면 3 자리(PlaceholderScreen) 흐름이 처음으로 끝까지 작동 — "마법사가 됐다 → 매일 여기서 마법을 부린다 → 소비를 기록한다" 게임 루프의 뼈대 완성
- selectedMagic 가드 (ATTRIBUTES.some() 검증) — 잘못된 localStorage 값이 들어 있어도 깜박임 없이 온보딩 복귀
- 디자인 토큰 100% 상속 — Phase 1 UI-SPEC 의 magic-gold/cream/bg-white/10/rounded-card/text-body/label 외 색·폰트 weight·spacing 신규 도입 0건. float-character 키프레임만 추가.
- 마젠타는 PrimaryButton 1곳만, 5속성 색은 CharacterCard 1곳만 — UI-SPEC "Accent reserved for" 룰 100% 준수
- 모든 인터랙션 min-h-[48px] (PLAT-02) — LessonCard / MissionCard / ParentLink / PrimaryButton 모두

## Task Commits

각 태스크 단위로 atomic 커밋:

1. **Task 1: 더미 데이터 + 카드 부품들 + tailwind float-character 토큰** — `f34769f` (feat)
   - tailwind.config.js + dummyData.js + GreetingHeader/CharacterCard/FloatingCharacter/LessonCard/MissionCard/ParentLink/ToastMessage (9 files, +182 lines)
2. **Task 2: DashboardScreen 합성 + App.jsx 3-state 라우팅 + 가드** — `cd27ef8` (feat)
   - DashboardScreen.jsx (신규) + App.jsx (3-state 머신으로 교체) (2 files, +116/-15 lines)

**Plan metadata commit:** orchestrator 가 SUMMARY.md / STATE.md 별도 커밋 처리 (executor 는 코드만).

## Files Created/Modified

### Created
- `src/screens/DashboardScreen.jsx` — 화면 2 합성 (7 부품 + PrimaryButton + ToastMessage), selectedKey 가드, 토스트 핸들러
- `src/data/dummyData.js` — user(민지, Lv.2, 145🪙) + today(lesson, weeklyMission progress 60%) (PRD PART 5 그대로)
- `src/components/GreetingHeader.jsx` — "어서 와, 민지! 🪄 / 오늘은 어떤 마법을 부려볼까?"
- `src/components/CharacterCard.jsx` — 속성 dot(5색 유일 사용처) + emoji + 라벨 + Lv + 마법 동전 수
- `src/components/FloatingCharacter.jsx` — 큰 emoji(72px) + animate-float-character + role=img / aria-label
- `src/components/LessonCard.jsx` — 오늘의 마법 수업 + "수업 들으러 가기 →" (button-as-card)
- `src/components/MissionCard.jsx` — 이번 주 마법 임무 + 진행률 바(role=progressbar) + "진행 60% (3/5일)"
- `src/components/ParentLink.jsx` — 👨‍👩‍👧 부모님 화면 보기 보조 링크
- `src/components/ToastMessage.jsx` — 하단 fixed 토스트 + role=status / aria-live=polite

### Modified
- `tailwind.config.js` — animation 객체에 `'float-character'` 1줄, keyframes 객체에 `floatCharacter` 1블록 추가 (기존 토큰은 손대지 않음)
- `src/App.jsx` — screen state 'onboarding' | 'next' → 'onboarding' | 'dashboard' | 'recording' 3-state 로 교체. ATTRIBUTES.some() 으로 selectedMagic 유효성 검증.

## Deviations from Plan

**None — 플랜 그대로 실행됨.** 추가 가드 한 가지만 강화: 플랜은 `if (!attribute) onBackToOnboarding()` 로 내부 객체 존재 여부만 봤지만, App.jsx 마운트 단계에서도 `isValidMagic()` 헬퍼로 ATTRIBUTES 검증 (단순 truthy 가 아닌 키 매칭) 을 추가해 dashboard 가 호출되기 전에 차단. 결과적으로 가드가 두 겹.

## Manual Verification Checklist (11개 — 12개 미만 룰 준수)

사용자가 http://localhost:5173/ 에서 직접 확인할 항목:

1. [ ] 앱 새로고침 시 selectedMagic 있으면 대시보드 바로 표시
2. [ ] selectedMagic 없을 때 (devtools Application → localStorage → removeItem) 새로고침 → 온보딩으로 복귀
3. [ ] localStorage 에 'invalid' 같은 더러운 값을 박고 새로고침 → 온보딩 복귀 (강화 가드)
4. [ ] 캐릭터 카드의 속성 dot 색·label 이 selectedMagic 과 일치 (예: water → 💧 물 마법사 + 시안 dot)
5. [ ] 캐릭터 일러스트 emoji 가 위아래 떠다님 (3초 주기, ±6px)
6. [ ] 인사말 "어서 와, 민지!" + "오늘은 어떤 마법을 부려볼까?" 두 줄 표시
7. [ ] 마법 동전 145 + 임무 진행률 바 시각적으로 60% 채워짐
8. [ ] 수업/임무/부모 링크 클릭 시 하단 토스트 "다음 업데이트에서 만나요!" 1.8초 노출 후 사라짐 (라우팅 발생 안 함)
9. [ ] "오늘의 소비 기록하기" 마젠타 버튼 클릭 시 화면 3 자리(PlaceholderScreen)로 이동
10. [ ] 데스크톱에서도 375×667 모바일 프레임 안에서만 표시 (외부는 딥 퍼플 그라데이션)
11. [ ] devtools Rendering 탭에서 prefers-reduced-motion: reduce → 떠다님 멈춤 (글로벌 룰 자동 처리)

**Dev URL:** http://localhost:5173/ (background id b5rautdfj — Vite HMR 활성, 새로고침 즉시 반영)

## Design Token Self-Audit (planner gate 100% 통과)

- [x] 새 색 토큰 도입 0건
- [x] 새 폰트 weight 도입 0건 (기존 400 / 700)
- [x] 새 spacing 토큰 도입 0건
- [x] animation 토큰 1개 추가 (`float-character`) — keyframe 만 추가, 기존 토큰 미변경
- [x] 마젠타 사용처: PrimaryButton 1곳 (DashboardScreen 의 "오늘의 소비 기록하기")
- [x] 5속성 색 사용처: CharacterCard 의 좌측 dot 1곳 (FloatingCharacter 의 emoji 에는 색 필터 미적용)
- [x] 모든 인터랙션 min-h-[48px] — LessonCard / MissionCard / ParentLink / PrimaryButton
- [x] prefers-reduced-motion 처리: src/index.css 글로벌 룰 자동 처리 — 신규 컴포넌트는 별도 reduced-motion 처리 없음 (재선언 금지 룰 준수)
- [x] 카피 톤: "~해봐", "~을까?", 마법학교 어휘 (수업/임무) 사용
- [x] Korean only

## Success Criteria (5/5)

- [x] **DASH-01** 온보딩에서 선택한 속성이 대시보드 캐릭터 카드에 반영 → CharacterCard 가 ATTRIBUTES.find(selectedKey) 결과 렌더 + dot 색
- [x] **DASH-02** 캐릭터 일러스트가 3초 주기로 위아래 떠다님 → FloatingCharacter + animate-float-character (3s ease-in-out infinite, ±6px)
- [x] **DASH-03** 오늘의 수업 카드 + 이번 주 임무 카드(진행률 바) 표시 → LessonCard + MissionCard
- [x] **DASH-04** "오늘의 소비 기록하기" 마젠타 버튼 → 화면 3 이동 → PrimaryButton onClick={onRecord} → setScreen('recording') → PlaceholderScreen
- [x] **DASH-05** 부모님 화면 보기 보조 링크 → ParentLink + 토스트 안내 (Phase 3 에서 화면 6 라우팅으로 교체)
- [x] **추가 가드** selectedMagic 무효 시 자동 온보딩 복귀 (App.jsx isValidMagic + DashboardScreen useEffect 두 겹)

## Known Stubs

다음 항목은 의도된 v1 stub — Phase 3+ 에서 실제 라우팅으로 교체 예정. 플랜 본문에 명시된 placeholder.

| Stub | File | 설명 | 해소 시점 |
|------|------|------|-----------|
| 수업 카드 클릭 → 토스트 placeholder | src/screens/DashboardScreen.jsx | LessonCard onOpen 이 화면 5(배움 카드) 대신 토스트 노출 | Phase 3+ (화면 5 구현 시) |
| 임무 카드 클릭 → 토스트 placeholder | src/screens/DashboardScreen.jsx | MissionCard onOpen 이 화면 5(임무 상세) 대신 토스트 노출 | Phase 3+ |
| 부모 링크 클릭 → 토스트 placeholder | src/screens/DashboardScreen.jsx | ParentLink onOpen 이 화면 6(부모) 대신 토스트 노출 | Phase 3+ (화면 6 구현 시) |
| user.name = '민지' 하드코딩 | src/data/dummyData.js | PRD PART 5 그대로 (MVP 시연용) — 실제 입력 화면 없음 | Phase 4+ |
| coins=145 / level=2 / progress=60 고정 | src/data/dummyData.js | 시연용 가짜 수치 (PRD PART 5) | Phase 3+ (실제 record 누적 로직) |

이 stub 들은 모두 PLAN.md 의 must_haves.truths 와 success_criteria 에 명시된 의도된 placeholder 다 — DASH-01~05 의 "표시" 요구사항만 만족하면 되는 단계.

## Threat Flags

(없음 — UI-only, localStorage read/write 만 다루는 인증/네트워크 surface 변동 없음. 새 의존성 0건.)

## Self-Check: PASSED

**Files exist (verified):**
- src/screens/DashboardScreen.jsx ✓
- src/data/dummyData.js ✓
- src/components/{GreetingHeader,CharacterCard,FloatingCharacter,LessonCard,MissionCard,ParentLink,ToastMessage}.jsx ✓ (7개)
- tailwind.config.js, src/App.jsx ✓ (수정됨)

**Commits exist (git log --oneline):**
- f34769f feat(quick-260510-gwt): add Screen 2 dashboard parts + float-character token ✓
- cd27ef8 feat(quick-260510-gwt): wire DashboardScreen + 3-state router with selectedMagic guard ✓

**Build:** vite build --mode development → 35 modules, 0 warning, 0 error ✓
**Dev server:** http://localhost:5173/ → HTTP 200, /src/App.jsx + /src/screens/DashboardScreen.jsx → HTTP 200 ✓
