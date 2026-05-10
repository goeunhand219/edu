---
phase: 260510-itd-phase-4-4-5-6-stretch
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/storage.js
  - src/data/dummyData.js
  - src/data/emotions.js
  - src/data/friends.js
  - src/screens/FriendsScreen.jsx
  - src/screens/LessonScreen.jsx
  - src/screens/ParentScreen.jsx
  - src/screens/DashboardScreen.jsx
  - src/screens/RecordingScreen.jsx
  - src/App.jsx
autonomous: true
requirements: [FRND-01, FRND-02, FRND-03, LESN-01, LESN-02, PRNT-01, PRNT-02]

must_haves:
  truths:
    - "기록 저장 → 친구 화면이 자동으로 뜨고, 감정에 맞는 몬스터→친구 변신 시퀀스가 재생된다 (FRND-01/02)"
    - "변신 후 '다음으로 →' 누르면 dashboard 복귀, 만난 친구는 storage에 met:true로 영속화 (FRND-03)"
    - "dashboard '수업 들으러 가기' → 수업 화면 진입 → '다 읽었어!' → coins +5 토스트 → dashboard. 새로고침 후 재진입 시 '이미 완료한 수업이야!' (LESN-01/02)"
    - "dashboard '부모님 화면 보기' → 부모 화면 진입 → 4개 통계(기록·친구·수업·임무)가 storage 실수치로 표시되고 대화 가이드 카드 1개 노출 (PRNT-01/02)"
    - "새로고침 후 coins / 만난 친구 / 완료 수업 모두 유지된다"
  artifacts:
    - path: src/lib/storage.js
      provides: "loadAppState/saveCoins/markFriendMet/markLessonComplete + 기존 records 진입점"
    - path: src/data/friends.js
      provides: "5종 몬스터·5종 친구 메타 + emotion → {monster, friend} 매핑"
    - path: src/screens/FriendsScreen.jsx
      provides: "감정 prop 기반 몬스터→친구 변신 시퀀스 + storage 영속화"
    - path: src/screens/LessonScreen.jsx
      provides: "오늘의 수업 카드 + coins +5 보상 + 완료 영속화"
    - path: src/screens/ParentScreen.jsx
      provides: "주간 통계 4카드 + 대화 가이드 카드"
  key_links:
    - from: src/screens/RecordingScreen.jsx
      to: src/App.jsx
      via: "onSave 콜백이 record를 반환하고 App이 setScreen('friends', emotion) 라우팅"
    - from: src/App.jsx
      to: src/screens/FriendsScreen.jsx
      via: "emotion prop으로 EMOTION_TO_FRIEND 매핑 트리거"
    - from: src/screens/ParentScreen.jsx
      to: src/lib/storage.js
      via: "loadAppState() 호출로 records.length / friends.filter(met).length / lessons.completedCount 계산"
---

<objective>
Phase 4 stretch — 화면 4(친구 변신)·5(수업)·6(부모) 한 번에 완성.
Purpose: 화면 1~3의 마법 의식 흐름을 친구 변신 보상으로 닫고, 부모/수업 부가 동선까지 연결해 시연 풀세트 확보.
Output: 6-state 라우팅 + 3개 신규 화면 + storage 4종 진입점 확장. dev server에서 새로고침 영속성 동작.
TIME-BUDGET: 30분. 폴리시·복잡 애니메이션 NO.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/REQUIREMENTS.md
@.planning/01-foundation-onboarding/01-UI-SPEC.md
@경제마법사학교_기능설명서.md

@src/App.jsx
@src/data/dummyData.js
@src/data/emotions.js
@src/lib/storage.js
@src/screens/RecordingScreen.jsx
@src/screens/DashboardScreen.jsx
@src/components/LessonCard.jsx
@src/components/ToastMessage.jsx

<interfaces>
<!-- 핵심 재사용 컴포넌트 props (이미 존재 — 수정 금지) -->

MobileFrame: children — 375×667 모바일 프레임 wrapper
SparkleBackground: 별가루 배경 (자체 absolute)
ScreenTitle: children — 24px 제목
BackButton: { onBack } — 좌상단 "← 돌아가기"
PrimaryButton: { onClick, disabled, children } — 마젠타 CTA, min-h-[48px]
ToastMessage: { message, visible } — 부모가 1.8s 후 visible=false 토글

카드 스타일 (LessonCard 패턴 재사용 — 인라인으로 작성):
  className="w-full bg-white/10 border border-magic-gold/60 rounded-card p-4"

색 토큰: magic-cream / magic-gold / magic-magenta / white/10 / white/15
폰트 토큰: text-body (16) / text-label (14) / text-screen-title (24)

기존 storage.js exports (유지):
  loadRecords(): Record[]
  appendRecord(record): Record[]
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: storage/data 확장 + 3개 화면 동시 작성 (FriendsScreen, LessonScreen, ParentScreen)</name>
  <files>
    src/lib/storage.js
    src/data/friends.js
    src/data/emotions.js
    src/data/dummyData.js
    src/screens/FriendsScreen.jsx
    src/screens/LessonScreen.jsx
    src/screens/ParentScreen.jsx
  </files>
  <action>
1) `src/lib/storage.js` 확장 (기존 함수 유지):
   - 새 키: `COINS_KEY='coins'`, `FRIENDS_KEY='friends'`, `LESSONS_KEY='lessons'`
   - `loadCoins()`: number, fallback 145 (dummyData.user.coins 와 동일 초기값)
   - `saveCoins(n)`: number 저장 + 반환
   - `loadFriends()`: `{id, met}[]` — fallback은 `INITIAL_FRIENDS` (data/friends.js의 5종 friend id 모두 met:false)
   - `markFriendMet(id)`: 해당 id의 met=true 로 업데이트, 새 배열 반환
   - `loadLessons()`: `{ [lessonId]: { completed:true } }` — fallback `{}`
   - `markLessonComplete(id)`: 객체에 추가/업데이트
   - `loadAppState()`: `{ records, coins, friends, lessons }` 한 번에 반환 (ParentScreen 통계용)
   - 모든 함수 try/catch + 안전 폴백 (시연 안전성 — 기존 패턴 유지)

2) `src/data/friends.js` (신규):
   - `MONSTERS`: 5개 — `{ id:'impulse', emoji:'🔥', name:'충동이' }`, `{ id:'waste', emoji:'💸', name:'낭비괴' }`, `{ id:'compare', emoji:'👀', name:'비교마' }`, `{ id:'delay', emoji:'😴', name:'미루미' }`, `{ id:'regret', emoji:'😢', name:'후회씨' }`
   - `FRIENDS`: 5개 — `{ id:'decision', emoji:'😌', name:'결단이' }`, `{ id:'plan', emoji:'📋', name:'계획이' }`, `{ id:'pride', emoji:'💎', name:'자존이' }`, `{ id:'consistent', emoji:'🌱', name:'꾸준이' }`, `{ id:'learning', emoji:'📖', name:'배움이' }`
   - 보너스: `{ id:'satisfy', emoji:'✨', name:'만족이' }` — 긍정 감정용 (총 6 friends. INITIAL_FRIENDS도 6개)
   - `EMOTION_TO_FRIEND` 매핑 (PRD PART 1-6 + 제약 그대로):
     - `impulse`    → `{ monsterId:'impulse', friendId:'decision' }`  (충동이→결단이)
     - `regret`     → `{ monsterId:'regret',  friendId:'learning' }`  (후회씨→배움이)
     - `considered` → `{ monsterId:'delay',   friendId:'decision' }`  (긍정 — 짧은 갈등 후 결단)
     - `need`       → `{ monsterId:'compare', friendId:'satisfy' }`   (긍정 — 필요해서 산 만족)
     - `satisfied`  → `{ monsterId:'waste',   friendId:'satisfy' }`   (긍정 — 큰 기쁨)
   - `INITIAL_FRIENDS`: FRIENDS 6개 모두 `{id, met:false}` — storage fallback용

3) `src/data/emotions.js`: 변경 없음. (매핑은 friends.js에서 처리)

4) `src/data/dummyData.js`: 그대로 유지 (storage가 fallback 출처). `today.parentTalk` 추가:
   ```js
   export const parentTalk = {
     title: '이번 주 대화 주제',
     body: '이번 주 가장 후회됐던 소비를 함께 이야기해봐요. 후회는 잘못이 아니라 배움의 신호예요.',
   };
   ```

5) `src/screens/FriendsScreen.jsx` (신규) — props `{ emotion, onDone }`:
   - useEffect 마운트 시 `EMOTION_TO_FRIEND[emotion]` lookup. 없으면 (방어) 즉시 `onDone()`.
   - 3-단계 시퀀스 state: `'monster' | 'cast' | 'friend'`
     - mount → `'monster'` (2000ms) → `'cast'` (1000ms) → `'friend'` (대기)
     - `'friend'` 진입 시 `markFriendMet(friendId)` 호출 (idempotent)
   - MobileFrame + SparkleBackground 안에 중앙 정렬:
     - `'monster'`: 이모지 `text-[120px]` + animate-pulse + name "충동이가 나타났어!" `text-screen-title text-magic-cream`
     - `'cast'`: "✨ 마법 발동! ✨" `text-[40px] text-magic-gold animate-pulse`
     - `'friend'`: 이모지 `text-[120px]` + "{friend.name}를 만났어!" + 본문 한 줄 "도감에 추가됐어 ✨" + PrimaryButton "다음으로 →" `onClick={onDone}`
   - prefers-reduced-motion 글로벌 룰 이미 있음 — 별도 처리 X
   - 카드 스타일 사용 X (전체 화면 시퀀스)

6) `src/screens/LessonScreen.jsx` (신규) — props `{ onBack }`:
   - mount 시 `loadLessons()` 읽어서 `lessons[1]?.completed` 체크 → 완료 상태면 본문 대신 "이미 완료한 수업이야!" 표시 + "← 돌아가기" 버튼만
   - 미완료면:
     - BackButton (좌상단)
     - ScreenTitle "📚 오늘의 마법 수업"
     - 카드 (인라인 `bg-white/10 border border-magic-gold/60 rounded-card p-4`):
       - 제목 `text-screen-title text-white`: "용돈은 어디서 오는 걸까?"
       - 본문 `text-body text-magic-cream` 3문장 (PRD 톤):
         "용돈은 마법처럼 그냥 생기는 게 아니야. 부모님이 일해서 번 마법 동전이 너에게 도착한 거야. 그래서 한 닢 한 닢이 소중한 마법이지."
     - `mt-auto` PrimaryButton "다 읽었어! ✨" → onClick:
       - `markLessonComplete(1)` + `saveCoins(loadCoins() + 5)`
       - 토스트 state로 "마법 동전 5개 받았어! 🪙" 1.5초 표시 → setTimeout으로 `onBack()`
   - ToastMessage 사용 (visible state로 토글)

7) `src/screens/ParentScreen.jsx` (신규) — props `{ onBack }`:
   - mount 시 `loadAppState()` 한 번 호출 → `{records, coins, friends, lessons}` 보관
   - 통계 4개 계산:
     - `recordCount = records.length`
     - `friendCount = friends.filter(f => f.met).length`
     - `lessonCount = Object.keys(lessons).length`
     - `missionProgress = today.weeklyMission.progressText` (dummyData 그대로 — 실수치 추적은 v2)
   - BackButton + ScreenTitle "👪 부모님 화면"
   - 2x2 grid (`grid grid-cols-2 gap-3`) 통계 카드 4개:
     - 각 카드: `bg-white/10 border border-magic-gold/60 rounded-card p-4 text-center`
     - 라벨 (text-label text-magic-cream) + 큰 숫자 (text-[32px] text-magic-gold font-bold) + 단위 (text-body text-white)
     - 카드들: "📖 기록 횟수 / N개", "✨ 만난 친구 / N명", "📚 완료 수업 / N개", "🎯 임무 진행 / 3/5일"
   - 그 아래 대화 가이드 카드 (인라인 카드 스타일):
     - 헤더 "💬 이번 주 대화 주제" (text-label text-magic-cream)
     - 본문 `parentTalk.body` (text-body text-white leading-relaxed mt-2)
   - 모든 텍스트 한국어, 마법학교 톤 유지
  </action>
  <verify>
    <automated>cd /Users/gowonho/Downloads/20260510/project1 &amp;&amp; npx vite build 2>&amp;1 | tail -20</automated>
  </verify>
  <done>
    - storage.js: loadAppState/saveCoins/markFriendMet/markLessonComplete export 됨
    - friends.js: MONSTERS·FRIENDS·EMOTION_TO_FRIEND·INITIAL_FRIENDS export
    - 3개 신규 screen 파일 모두 default export 존재
    - 빌드 성공 (vite build) — Task 2의 App.jsx 수정 전이라도 기존 라우팅이 깨지지 않아야 함
  </done>
</task>

<task type="auto">
  <name>Task 2: App.jsx 6-state 라우팅 + RecordingScreen/DashboardScreen 연결</name>
  <files>
    src/App.jsx
    src/screens/RecordingScreen.jsx
    src/screens/DashboardScreen.jsx
  </files>
  <action>
1) `src/App.jsx` 재구성:
   - state: `'onboarding' | 'dashboard' | 'recording' | 'friends' | 'lesson' | 'parent'`
   - 새 state 추가: `const [lastEmotion, setLastEmotion] = useState(null)` — recording → friends 전달용
   - 라우팅 분기 (기존 if 체인 확장):
     ```jsx
     if (screen === 'recording') return (
       <RecordingScreen
         onSave={(record) => {
           appendRecord(record);
           setLastEmotion(record.emotion);
           setScreen('friends');           // dashboard 안 거침
         }}
         onBack={() => setScreen('dashboard')}
       />
     );
     if (screen === 'friends') return (
       <FriendsScreen
         emotion={lastEmotion}
         onDone={() => { setLastEmotion(null); setScreen('dashboard'); }}
       />
     );
     if (screen === 'lesson') return <LessonScreen onBack={() => setScreen('dashboard')} />;
     if (screen === 'parent') return <ParentScreen onBack={() => setScreen('dashboard')} />;
     ```
   - DashboardScreen에 새 prop 2개 전달: `onOpenLesson={() => setScreen('lesson')}`, `onOpenParent={() => setScreen('parent')}`
   - 새 import 4개 추가 (FriendsScreen, LessonScreen, ParentScreen)
   - 헤더 주석 업데이트: 6-state 머신 설명

2) `src/screens/RecordingScreen.jsx` 변경:
   - 변경 없음. (record.emotion이 onSave로 전달되므로 App이 lastEmotion 세팅)
   - 만약 onSave 호출 후 화면 자동 복귀 가정하는 코드 있으면 그대로 둠 (App 책임)

3) `src/screens/DashboardScreen.jsx` 변경:
   - props 추가: `onOpenLesson`, `onOpenParent`
   - LessonCard `onOpen={showPlaceholderToast}` → `onOpen={onOpenLesson}`
   - ParentLink `onOpen={showPlaceholderToast}` → `onOpen={onOpenParent}`
   - showPlaceholderToast / TOAST_PLACEHOLDER / toast state는 유지 (다른 placeholder 용도 없음 — 하지만 unused 경고 안 나오게 toast/setToast/ToastMessage 모두 제거해도 됨. 시간 절약 위해 단순 삭제 권장)
   - **간소화 판단**: toast 시스템 제거 (시연에서 더 이상 placeholder 안 씀). import에서 ToastMessage/useState 정리.
   - dummyData에서 user.coins를 import하던 부분 그대로 유지 (loadCoins로 교체는 v2 — 지금은 fallback이 145로 동일)
   - **시간 여유 있으면**: `import { loadCoins } from '../lib/storage'` + useState로 coins 동적 표시. 시간 없으면 user.coins 그대로.

4) ScreenTitle/BackButton/MobileFrame 등 기존 컴포넌트는 수정 금지.
  </action>
  <verify>
    <automated>cd /Users/gowonho/Downloads/20260510/project1 &amp;&amp; npx vite build 2>&amp;1 | tail -20</automated>
  </verify>
  <done>
    - App.jsx: 6개 라우트 분기 모두 존재, 새 import 3개 (FriendsScreen, LessonScreen, ParentScreen)
    - RecordingScreen onSave 후 App이 'friends'로 라우팅
    - DashboardScreen LessonCard·ParentLink가 setScreen 라우터에 연결됨 (placeholder 토스트 제거)
    - vite build 성공, 경고/에러 없음
  </done>
</task>

<task type="auto">
  <name>Task 3: smoke check — 빌드 + 핵심 핸들러 grep 검증</name>
  <files>
    (검증 only — 파일 생성 없음)
  </files>
  <action>
1) 최종 빌드:
   ```bash
   cd /Users/gowonho/Downloads/20260510/project1 && npx vite build
   ```
2) 핵심 와이어링 grep 검증 (각 1줄 결과 기대):
   ```bash
   grep -n "setScreen('friends')" src/App.jsx
   grep -n "setScreen('lesson')\|onOpenLesson" src/App.jsx src/screens/DashboardScreen.jsx
   grep -n "setScreen('parent')\|onOpenParent" src/App.jsx src/screens/DashboardScreen.jsx
   grep -n "markFriendMet" src/screens/FriendsScreen.jsx src/lib/storage.js
   grep -n "markLessonComplete\|saveCoins" src/screens/LessonScreen.jsx src/lib/storage.js
   grep -n "loadAppState" src/screens/ParentScreen.jsx src/lib/storage.js
   grep -n "EMOTION_TO_FRIEND" src/data/friends.js src/screens/FriendsScreen.jsx
   ```
3) 누락 발견 시 즉시 수정. 모두 매치하면 OK.
4) **시간 초과 시 즉시 중단** — preview 띄우지 말 것 (HMR로 사용자가 5173에서 확인). dev server는 사용자가 이미 띄움.
5) SUMMARY.md 작성: 체크리스트 6-8개, 변경사항 5 bullet, 시간 보고. **짧게**.
  </action>
  <verify>
    <automated>cd /Users/gowonho/Downloads/20260510/project1 &amp;&amp; npx vite build 2>&amp;1 | grep -E "(error|✓ built)" | head -5</automated>
  </verify>
  <done>
    - vite build "✓ built in" 라인 출력
    - 7개 grep 모두 매치 (라우팅 + storage 진입점 + 매핑)
    - SUMMARY.md 짧게 작성 완료
  </done>
</task>

</tasks>

<verification>
- 빌드: `npx vite build` 성공
- 라우팅: dashboard에서 record→friends→dashboard / dashboard→lesson→dashboard / dashboard→parent→dashboard 3개 사이클 모두 동작
- 영속화: 새로고침 후 coins / friends.met / lessons.completed 유지
- 통계: ParentScreen 4개 카드가 storage 실수치 (placeholder 0 아님 — 기록 1회라도 했으면 N≥1)
</verification>

<success_criteria>
- 6-state 라우팅 머신 동작
- 화면 4·5·6 모두 디자인 토큰 일관 (새 색·폰트 도입 0건)
- FRND-01/02/03, LESN-01/02, PRNT-01/02 7개 요구사항 모두 충족
- 30분 안에 완료 — 30분 초과 시 폴리시 중단하고 SUMMARY로 직행
</success_criteria>

<output>
After completion, create `.planning/quick/260510-itd-phase-4-4-5-6-stretch/260510-itd-SUMMARY.md`
- 체크리스트 6-8개 (FRND-01..PRNT-02 매핑 + 빌드 + 영속성)
- 핵심 변경사항 5 bullet (storage 확장 / 3 screen 신규 / App 6-state / Recording→Friends 라우팅 / Dashboard placeholder 제거)
- 실제 소요 시간 보고 (30분 대비)
</output>
