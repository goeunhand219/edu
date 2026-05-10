# 배포 가이드 — 경제 마법사 학교 v1

`npm run build` 가 통과해 `dist/` 폴더가 만들어진 상태에서 시연용 공개 URL 을 얻는 두 가지 방법.

## 사전 준비 (공통)

```bash
cd /Users/gowonho/Downloads/20260510/project1
npm run build
# dist/ 폴더 생성 확인
ls dist/
```

`dist/index.html` 과 `dist/assets/` 폴더가 있어야 한다. 모든 경로가 상대(`./assets/...`)로 들어가 있어 어디 호스팅에 올려도 동작한다 (`vite.config.js` 의 `base: './'`).

빌드 산출물 (참고):
- `dist/index.html` (~0.7 KB)
- `dist/assets/index-*.css` (~13 KB / gzip ~3.7 KB)
- `dist/assets/index-*.js` (~206 KB / gzip ~65 KB)
- `dist/favicon.svg`, `dist/icons.svg`

---

## 옵션 A — Netlify Drop (가장 빠름, 인증 불필요, 1분)

**장점:** 가입·로그인 없음, dist 폴더 통째로 드롭. URL 즉시 발급.
**단점:** 7일짜리 무료 임시 URL. 영구 URL 원하면 무료 가입 후 사이트로 claim.

### 절차

1. 브라우저에서 https://app.netlify.com/drop 열기.
2. Finder 에서 `project1/dist` 폴더를 그대로 페이지 한가운데 드래그앤드롭.
3. 30초 안에 `https://random-name-XXXXX.netlify.app` 형태 URL 발급.
4. 새 창에서 URL 클릭해 화면 1 → 2 → 3 동작 확인.
5. URL 을 복사해 `.planning/STATE.md` 의 `Quick Tasks Completed` 행 끝에 추가:

   ```
   | 260510-h7y | Phase 3 화면 3 + localStorage + 배포 | 2026-05-10 | <commit> | <directory> | URL: https://... |
   ```

### 영구 URL 로 만들기 (선택)

1. Netlify 무료 가입 (GitHub/이메일).
2. 발급된 사이트 페이지에서 "Site settings" → "Change site name" → 원하는 이름 (예: `economic-wizard-school.netlify.app`).

---

## 옵션 B — Vercel CLI (Git 연동·자동 재배포 필요할 때)

**장점:** 영구 URL, 추후 코드 수정 시 `vercel --prod` 한 줄로 재배포.
**단점:** 첫 사용 시 토큰 인증 필요 (브라우저 OAuth — 사용자가 직접 진행).

### 절차

1. CLI 설치 (전역, 1회):

   ```bash
   npm install -g vercel
   ```

2. 프로젝트 루트에서:

   ```bash
   cd /Users/gowonho/Downloads/20260510/project1
   vercel login   # 첫 1회만 — 이메일 입력 → 메일함에서 매직링크 클릭
   vercel --prod  # 빌드는 Vercel 서버에서 vite build 자동 수행
   ```

3. 첫 실행 시 프롬프트:
   - "Set up and deploy?" → **Y**
   - "Which scope?" → 본인 계정 선택
   - "Link to existing project?" → **N**
   - "Project name?" → 엔터 (기본값 폴더명 `economic-wizard-school`)
   - "Directory?" → 엔터 (기본값 `./`)
   - "Override settings?" → **N** (Vite 자동 감지)

4. 1~2분 후 `https://<project>.vercel.app` URL 출력. 복사 후 STATE.md 에 기록.

---

## 옵션 C (참고) — dist 폴더만 다른 정적 호스팅으로

`base: './'` 가 이미 vite.config.js 에 들어있어 dist 폴더는 어디든(Surge / Cloudflare Pages / GitHub Pages / 사내 정적 서버) 그대로 올라간다. 단순 SPA 가 아닌 단일 index.html + 클라이언트 단일 페이지라 SPA fallback 라우팅 설정 불필요.

예시:
```bash
# Surge.sh 한 줄 배포
npx surge dist/ economic-wizard-school.surge.sh
```

---

## 배포 후 체크리스트

- [ ] URL 을 시크릿 창에서 열어 캐시 없이 동작 확인
- [ ] 화면 1: 5속성 동전 → 선택 → "선택 완료" → 1초 메시지 → 화면 2 진입
- [ ] 화면 2: 캐릭터 카드 + "오늘의 소비 기록하기" 클릭
- [ ] 화면 3: 품목 + 금액(콤마 자동) + 감정 스티커 → "마법서에 적기" → 화면 2 복귀
- [ ] 새로고침: 화면 2 가 다시 뜨고, DevTools Application > Local Storage 에 `selectedMagic` + `records` 둘 다 유지
- [ ] 모바일에서 URL 열기: 375px 폭에 맞춰 표시되고 터치 타깃이 충분
- [ ] STATE.md 에 발급된 URL 기록

---

## 트러블슈팅

| 증상                                          | 원인                                | 해결                                                                                                          |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 배포 후 흰 화면                               | base 경로 잘못 (절대 → 상대 미적용) | `vite.config.js` 의 `base: './'` 확인 → 다시 `npm run build` → 재업로드                                       |
| Pretendard 폰트가 시스템 폰트로 보임          | CDN 차단/네트워크 지연              | 정상 동작. 폰트는 점진적으로 교체됨. 다시 새로고침하면 적용                                                   |
| 새로고침 후 records 사라짐                    | 시크릿 창 OR 사용자가 cookie/storage 삭제 | 정상 — localStorage 는 도메인+브라우저 단위. 시연 시 같은 창 유지                                       |
| 모바일에서 키보드가 입력 가림                 | 모바일 가상 키보드 동작             | 정상 — RecordingScreen 안 컨테이너가 `overflow-y-auto` 라 스크롤 가능                                         |
