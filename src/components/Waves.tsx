export default function Waves({ height = 220 }: { height?: number }) {
  return (
    <svg className="waves" aria-hidden="true" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ height }}>
      <path d="M0 140 C 240 90, 480 210, 720 160 S 1200 90, 1440 140 L1440 220 L0 220 Z" fill="#1C3392" />
      <path d="M0 190 C 300 150, 560 230, 860 200 S 1260 170, 1440 200 L1440 220 L0 220 Z" fill="#0B7568" />
    </svg>
  );
}
