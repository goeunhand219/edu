# Roadmap: 경제 마법사 학교

## Overview

일요일 하루 (~6~8시간)에 화면 1→2→3의 완전한 흐름을 시연 가능한 웹 프로토타입으로 만든다. Phase 1에서 디자인 시스템과 온보딩을 한 번에 완성해 마법학교 톤을 확립하고, Phase 2에서 대시보드를 붙여 캐릭터 흐름을 완성하고, Phase 3에서 기록 화면·localStorage 영속화·배포 URL까지 마무리한다. 시간이 남으면 Phase 4(Stretch)로 화면 4~6을 추가한다.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Onboarding** - 디자인 시스템 + 화면 1 완성 — 첫 시연 가능 상태
- [ ] **Phase 2: Dashboard** - 화면 2 완성 — 온보딩→대시보드 흐름 작동
- [ ] **Phase 3: Recording + Persistence + Deploy** - 화면 3·localStorage 통합·Vercel 배포 — v1 완성
- [ ] **Phase 4: Stretch Screens** - 화면 4~6 (시간 여유 있을 때만)

## Phase Details

### Phase 1: Foundation + Onboarding
**Goal**: 마법학교 디자인 시스템이 확립되고 아이가 5속성 동전을 선택해 마법사가 되는 화면 1이 작동한다
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, PLAT-01, PLAT-02, ONBO-01, ONBO-02, ONBO-03
**Success Criteria** (what must be TRUE):
  1. 앱을 열면 딥 퍼플 그라데이션 배경에 별가루 입자가 떠다니고 5개의 골드 동전이 보인다
  2. 동전에 마우스를 올리면 Y축으로 회전하고, 클릭하면 골드 테두리·1.1배 확대로 선택 강조되며 나머지 동전은 흐려진다
  3. 속성 선택 후 "선택 완료"를 누르면 속성별 메시지(예: "물의 힘이 깨어났어!")가 1초 표시된 후 다음 화면으로 넘어간다
  4. 모든 버튼은 높이 48px 이상이고 Pretendard 한글 폰트·마법학교 카피 톤("~해봐", "~을까?")이 적용되어 있다
  5. 데스크톱 브라우저에서 열어도 375px 모바일 프레임 안에서 콘텐츠가 표시된다
**Plans**: TBD
**UI hint**: yes

### Phase 2: Dashboard
**Goal**: 선택한 속성의 캐릭터 카드·마법 동전·오늘의 수업·이번 주 임무가 한 화면에 보이고, 기록 화면으로 진입할 수 있다
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05
**Success Criteria** (what must be TRUE):
  1. 온보딩에서 선택한 속성(예: 물 마법사)이 대시보드 캐릭터 카드에 반영되어 표시된다
  2. 캐릭터 이모지+CSS 일러스트가 3초 주기로 위아래 떠다니는 애니메이션으로 보인다
  3. 오늘의 마법 수업 카드와 이번 주 임무 카드(진행률 바 포함)가 화면에 표시된다
  4. "오늘의 소비 기록하기" 마젠타 버튼을 클릭하면 화면 3으로 이동한다
  5. "부모님 화면 보기" 보조 링크가 화면 하단에 표시된다 (v1에서는 placeholder)
**Plans**: TBD
**UI hint**: yes

### Phase 3: Recording + Persistence + Deploy
**Goal**: 소비 품목·금액·감정을 기록하면 localStorage에 저장되고, 메인 화면 복귀 후 데이터가 유지되며, 시연 가능한 공개 URL이 존재한다
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: REC-01, REC-02, REC-03, REC-04, REC-05, PLAT-03, PLAT-04
**Success Criteria** (what must be TRUE):
  1. 품목 텍스트와 금액(자동 콤마 포맷, 예: 3,000)을 입력하고 감정 스티커 1개를 선택할 수 있다
  2. 감정 스티커 선택 시 골드 테두리·1.1배 확대로 강조되고 나머지는 흐려진다
  3. 항목 미입력 시 "마법서에 적기" 버튼이 비활성화되고 어떤 항목이 비었는지 안내가 표시된다
  4. "마법서에 적기" 클릭 시 기록이 localStorage에 저장되고 메인 화면으로 돌아오며, 새로고침 후에도 데이터가 유지된다
  5. 시연용 공개 URL(Vercel 또는 Netlify)이 존재하고, URL을 열면 화면 1→2→3 전체 흐름이 작동한다
**Plans**: TBD
**UI hint**: yes

### Phase 4: Stretch Screens
**Goal**: 화면 4(마음 친구 변신)·화면 5(배움 카드)·화면 6(부모 화면)이 추가되어 앱의 감정→성찰 루프가 완성된다
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: FRND-01, FRND-02, FRND-03, LESN-01, LESN-02, PRNT-01, PRNT-02
**Success Criteria** (what must be TRUE):
  1. 화면 3 저장 후 감정에 따라 다른 몬스터가 등장하고 마음 친구로 변신하는 애니메이션이 재생된다
  2. 만난 마음 친구가 friends 도감에 추가되고 localStorage에 저장된다
  3. 오늘의 마법 수업 카드 1개가 완독 가능하고, 완료 시 마법 동전 수가 증가한다
  4. 부모 화면에서 주간 리포트(기록 횟수·만난 친구 수·완료 수업·임무 진행률)와 대화 가이드 카드 1개가 표시된다

> **Note:** Phase 4는 Phase 1~3 완성 후 일요일에 시간이 남을 때만 진행한다. v2 stretch 요구사항으로, 시연의 핵심은 Phase 3까지다.

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 (4 is stretch only)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Onboarding | 0/TBD | Not started | - |
| 2. Dashboard | 0/TBD | Not started | - |
| 3. Recording + Persistence + Deploy | 0/TBD | Not started | - |
| 4. Stretch Screens | 0/TBD | Not started | - |
