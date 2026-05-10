# 경제 마법사 학교 (Economic Wizard School)

## What This Is

7~9세 어린이가 처음 '내 돈'을 손에 쥐는 순간을 위한, 마법사 세계관 기반 경제 교육 앱 프로토타입. 매일 5분 마법 수업·소비 기록·감정 태깅을 통해 단순한 가계부가 아닌 자기 성찰 게임 경험을 제공한다. 일요일 하루 안에 시연 가능한 웹 프로토타입으로 만들고, 포트폴리오 첨부 + 오프라인 선생님 그룹 시연용으로 사용한다.

## Core Value

**아이가 소비를 기록할 때 그 순간이 "마법 의식"처럼 느껴져야 한다.** 단순 입력이 아닌 감정 태깅 → 캐릭터 변신으로 이어지는 흐름이 살아있어야 앱의 차별점(이론과 실천의 단절 해결)이 작동한다. 다른 모든 게 빠져도 화면 1→2→3의 흐름은 마법학교의 톤으로 작동해야 한다.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 화면 1 (온보딩): 5속성 마법사 선택 — 회전 동전 인터랙션
- [ ] 화면 2 (메인 대시보드): 캐릭터 카드·마법 동전·오늘의 수업·이번 주 임무·소비 기록 진입
- [ ] 화면 3 (기록): 품목·금액·5종 감정 태깅 — 마법서 톤
- [ ] 디자인 시스템 구현: 딥 퍼플 톤·골드 액센트·5속성 컬러·마법학교 카피 5원칙
- [ ] 모바일 비율 우선 (375×667), 데스크톱은 모바일 프레임 안에서 표시
- [ ] localStorage 기반 데이터 영속화 (캐릭터 선택·소비 기록·동전 누적)
- [ ] 시연 가능한 배포 URL 확보 (Vercel/Netlify)

### Stretch (시간되면)

- [ ] 화면 4 (친구 만나기): 몬스터 → 마음 친구 변신 (감정에 따라 다른 캐릭터)
- [ ] 화면 5 (배움 카드): 오늘의 경제 수업 1개
- [ ] 화면 6 (부모 화면): 주간 리포트 + 대화 가이드 카드

### Out of Scope

- 실제 백엔드/DB — 프로토타입이므로 localStorage만 사용
- 부모-아이 계정 분리·실제 가족 연동 — 화면 6은 더미 데이터로만 표시
- 28주 마법사 커리큘럼 전체 콘텐츠 — 화면 5에 1~2개 샘플만, 나머지는 placeholder
- AI 생성 캐릭터 일러스트 — 이모지(🪄💧🔥⚡🌱🌬️) + CSS 효과로 대체, 추후 PNG 교체 가능 구조로 설계
- 모바일 네이티브 앱·React Native — 웹만
- 실제 결제·용돈 송금·금융 API — 교육용 시뮬레이션만
- 다국어 지원 — 한국어 단일

## Context

- **작성자:** 손고은. 외부 PRD 문서(`경제마법사학교_기능설명서.md`)에 화면 1~3 상세 명세, 디자인 시스템, 데이터 구조 v0.1로 작성 완료 (2026.05.07)
- **학습 맥락:** 오프라인에서 선생님 그룹과 공부 중. 클로드 코드를 활용해 기술적 도전을 시도하고 싶음
- **사용 시나리오:** 포트폴리오 첨부 자료 + 선생님·아이들에게 보여주고 피드백 받는 시연용
- **타겟:** 만 7~9세 아이 (초1~초3) 주 사용자, 30~40대 부모 결제·관리자 — 단 v0.1은 아이 화면에만 집중
- **세계관:** 5속성 마법사(불·물·전기·흙·바람) + 5종 마음 친구(충동이→결단이 등 감정→캐릭터 매핑)
- **카피 톤:** "~해봐", "~을까?" — 지시 ❌, 초대 ✅ / 마법학교 어휘 일관 사용 (미션→임무, 포인트→마법 동전, 기록→마법서)

## Constraints

- **Timeline:** 일요일 하루 (~6~8시간 작업) — 화면 1~3 완성이 최소 목표
- **Tech stack:** Vite + React + Tailwind CSS — 빠른 셋업, 컴포넌트 재사용, 디자인 시스템 매핑 용이
- **Storage:** localStorage only — 백엔드 없이 새로고침 후 데이터 유지
- **Layout:** 모바일 우선 375×667 기준, 데스크톱에서도 모바일 프레임 안에서 보임
- **Touch:** 모든 버튼 최소 높이 48px (아이 손가락 터치 고려)
- **Typography:** 한글 Pretendard 또는 Nanum Gothic, 본문 16px / 제목 24px / 큰 강조 32px
- **Deploy:** Vercel 또는 Netlify에 한 줄 배포 가능해야 함 (시연 URL 필수)
- **Accessibility:** 아이 사용자이므로 글자 크기 큼·줄간격 넓게·콘트라스트 충분히

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vite + React + Tailwind 채택 | 클로드 작업 효율 최고(컴포넌트 단위), Vite는 셋업 빠름, Tailwind로 디자인 시스템 매핑 단순화 | — Pending |
| localStorage 사용 (변수 only 대신) | 시연 중 새로고침해도 데이터 유지 → 자연스러움. 백엔드 없이 +30분 비용으로 진짜 앱 느낌 확보 | — Pending |
| 캐릭터를 이모지 + CSS 효과로 표현 | AI 이미지 생성/제작은 일요일 일정에 부담. 추후 PNG로 교체 가능한 컴포넌트 구조로 설계 | — Pending |
| v0.1 범위는 화면 1~3 (4~6은 stretch) | Sunday timeline 제약 + 핵심 차별점(감정 태깅 → 자기 성찰)이 화면 1~3에 집중 | — Pending |
| Vercel/Netlify 배포 (정적 호스팅) | 포트폴리오 링크 첨부와 시연을 위해 URL 필수. 백엔드 없으니 정적 호스팅으로 충분 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-10 after initialization*
