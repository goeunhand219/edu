// 5종 감정 메타데이터 — PRD PART 3 그대로.
// emotion 값(key)은 PRD PART 5 record.emotion 명세: need|considered|impulse|regret|satisfied
// 순서: PRD 와이어프레임 그대로 (3+2 그리드 — 1줄 😍🤔😅, 2줄 😢✨)
export const EMOTIONS = [
  { key: 'need',       emoji: '😍', label: '꼭 필요했어' },
  { key: 'considered', emoji: '🤔', label: '잠깐 고민했어' },
  { key: 'impulse',    emoji: '😅', label: '그냥 갖고 싶었어' },
  { key: 'regret',     emoji: '😢', label: '사고 나니 후회돼' },
  { key: 'satisfied',  emoji: '✨', label: '정말 최고야!' },
];
