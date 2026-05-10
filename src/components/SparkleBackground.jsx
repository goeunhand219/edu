import { useMemo } from 'react';

// SparkleBackground — 24개의 작은 white/gold 입자가 바닥에서 위로 흐른다.
// useMemo 로 한 번만 랜덤 생성, prefers-reduced-motion 은 index.css 글로벌 룰이 처리.
// pointer-events-none + aria-hidden 으로 인터랙션/스크린리더 방해 안 함.

const PARTICLE_COUNT = 24;

function makeParticles() {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    particles.push({
      id: i,
      left: Math.random() * 100, // %
      delay: Math.random() * 10, // s
      size: 2 + Math.random() * 2, // 2~4px
      color: Math.random() > 0.5 ? '#FFFFFF' : '#FBBF24',
      duration: 8 + Math.random() * 4, // 8~12s
    });
  }
  return particles;
}

export default function SparkleBackground() {
  const particles = useMemo(makeParticles, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full opacity-0 animate-sparkle-up"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
