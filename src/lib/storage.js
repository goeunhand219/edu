// storage — localStorage 영속화. records 는 배열 (빈 배열 = 기본값).
// JSON 파싱 실패·저장소 접근 실패 시 모두 안전 폴백 (빈 배열 / no-op).
// PLAT-03 (records 영속화) 의 단일 진입점.
//
// record shape (PRD PART 5):
//   { item: string, amount: number, emotion: 'need'|..., timestamp: ISO string }

const RECORDS_KEY = 'records';

export function loadRecords() {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function appendRecord(record) {
  try {
    const current = loadRecords();
    const next = [...current, record];
    localStorage.setItem(RECORDS_KEY, JSON.stringify(next));
    return next;
  } catch (e) {
    // localStorage 접근 실패해도 흐름은 멈추지 않음 (시연 안전성)
    return [record];
  }
}
