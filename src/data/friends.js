// 5종 몬스터 ↔ 6종 마음 친구 + emotion → {monster, friend} 매핑 (PRD PART 1-6).
// emotion 값(record.emotion): need|considered|impulse|regret|satisfied
//
// "만족이"는 PRD PART 3-4 의 긍정 매핑을 표현하기 위해 추가한 보너스 친구.
// (PRD PART 1-6 에는 5종이지만 PART 3-4 에 satisfied/need → "만족이" 명시되어 있음.)

export const MONSTERS = [
  { id: 'impulse', emoji: '🔥', name: '충동이' },
  { id: 'waste',   emoji: '💸', name: '낭비괴' },
  { id: 'compare', emoji: '👀', name: '비교마' },
  { id: 'delay',   emoji: '😴', name: '미루미' },
  { id: 'regret',  emoji: '😢', name: '후회씨' },
];

export const FRIENDS = [
  { id: 'decision',   emoji: '😌', name: '결단이' },
  { id: 'plan',       emoji: '📋', name: '계획이' },
  { id: 'pride',      emoji: '💎', name: '자존이' },
  { id: 'consistent', emoji: '🌱', name: '꾸준이' },
  { id: 'learning',   emoji: '📖', name: '배움이' },
  { id: 'satisfy',    emoji: '✨', name: '만족이' },
];

// emotion → 등장 몬스터 + 변신 후 친구
export const EMOTION_TO_FRIEND = {
  impulse:    { monsterId: 'impulse', friendId: 'decision' }, // 충동이 → 결단이
  regret:     { monsterId: 'regret',  friendId: 'learning' }, // 후회씨 → 배움이
  considered: { monsterId: 'delay',   friendId: 'decision' }, // 짧은 갈등 후 결단
  need:       { monsterId: 'compare', friendId: 'satisfy'  }, // 필요해서 산 만족
  satisfied:  { monsterId: 'waste',   friendId: 'satisfy'  }, // 큰 기쁨
};

// 빠른 lookup helper
export const findMonster = (id) => MONSTERS.find((m) => m.id === id);
export const findFriend  = (id) => FRIENDS.find((f) => f.id === id);

// storage fallback — 모든 친구 met:false
export const INITIAL_FRIENDS = FRIENDS.map((f) => ({ id: f.id, met: false }));
