// storage — localStorage 영속화. 모든 함수 try/catch + 안전 폴백 (시연 안전성).
// PLAT-03 (records 영속화) + Phase 4 stretch (coins / friends / lessons 영속화) 단일 진입점.
//
// 키:
//   records  — record[]
//   coins    — number (마법 동전 잔고)
//   friends  — { id, met }[] (마음 친구 도감)
//   lessons  — { [id]: { completed: true } } (완료한 수업)
//
// record shape (PRD PART 5):
//   { item: string, amount: number, emotion: 'need'|..., timestamp: ISO string }

import { INITIAL_FRIENDS } from '../data/friends';

const RECORDS_KEY = 'records';
const COINS_KEY = 'coins';
const FRIENDS_KEY = 'friends';
const LESSONS_KEY = 'lessons';

const INITIAL_COINS = 145;

// ─────────────────── records ───────────────────

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
    return [record];
  }
}

// ─────────────────── coins ───────────────────

export function loadCoins() {
  try {
    const raw = localStorage.getItem(COINS_KEY);
    if (raw === null) return INITIAL_COINS;
    const n = Number(raw);
    return Number.isFinite(n) ? n : INITIAL_COINS;
  } catch (e) {
    return INITIAL_COINS;
  }
}

export function saveCoins(n) {
  try {
    localStorage.setItem(COINS_KEY, String(n));
    return n;
  } catch (e) {
    return n;
  }
}

// ─────────────────── friends ───────────────────

export function loadFriends() {
  try {
    const raw = localStorage.getItem(FRIENDS_KEY);
    if (!raw) return INITIAL_FRIENDS.map((f) => ({ ...f }));
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : INITIAL_FRIENDS.map((f) => ({ ...f }));
  } catch (e) {
    return INITIAL_FRIENDS.map((f) => ({ ...f }));
  }
}

export function markFriendMet(id) {
  try {
    const current = loadFriends();
    let touched = false;
    const next = current.map((f) => {
      if (f.id === id && !f.met) {
        touched = true;
        return { ...f, met: true };
      }
      return f;
    });
    // id 가 도감에 없으면(방어) 추가
    if (!touched && !current.some((f) => f.id === id)) {
      next.push({ id, met: true });
    }
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(next));
    return next;
  } catch (e) {
    return loadFriends();
  }
}

// ─────────────────── lessons ───────────────────

export function loadLessons() {
  try {
    const raw = localStorage.getItem(LESSONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch (e) {
    return {};
  }
}

export function markLessonComplete(id) {
  try {
    const current = loadLessons();
    const next = { ...current, [id]: { completed: true } };
    localStorage.setItem(LESSONS_KEY, JSON.stringify(next));
    return next;
  } catch (e) {
    return { [id]: { completed: true } };
  }
}

// ─────────────────── aggregate ───────────────────

// loadAppState — ParentScreen 통계 카드용. 한 번에 4종 상태 묶어 반환.
export function loadAppState() {
  return {
    records: loadRecords(),
    coins: loadCoins(),
    friends: loadFriends(),
    lessons: loadLessons(),
  };
}
