// 화면 2 (대시보드) MVP 더미 데이터 — PRD PART 5 그대로.
// selectedMagic 은 localStorage 에서 읽으니 여기서는 제외.
// 향후 백엔드/사용자 입력으로 교체하기 쉽도록 단일 파일로 분리.

export const user = {
  name: '민지',
  level: 2,
  coins: 145,
};

export const today = {
  lesson: {
    id: 1,
    title: '용돈은 어디서 오는 걸까?',
    completed: false,
  },
  weeklyMission: {
    title: '갖고 싶은 걸 3일 동안 위시리스트에 담아두기',
    progress: 60,
    progressText: '3/5일',
  },
};
