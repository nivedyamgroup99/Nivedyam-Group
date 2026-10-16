/** Illustrated bottle in a brand's label and cap colours (matches the real labels). */
export default function Bottle({
  brand, label = '', capColor, labelColor, height = 200, variant = 'light', className, alt,
}: {
  brand: string; label?: string; capColor: string; labelColor: string; height?: number;
  variant?: 'light' | 'glass'; className?: string; alt?: string;
}) {
  const glass = variant === 'glass';
  const stroke = glass ? '#BFD0F7' : '#B8C6EC';
  return (
    <svg
      className={className}
      viewBox="0 0 120 280"
      style={{ height, width: 'auto' }}
      role="img"
      aria-label={alt ?? `${brand} bottle`}
    >
      <rect x="44" y="2" width="32" height="20" rx="4" fill={capColor} />
      <rect x="42" y="21" width="36" height="5" rx="2" fill={capColor} opacity="0.75" />
      <path
        d="M48 26 h24 v12 c0 10 26 22 26 48 v170 a20 20 0 0 1 -20 20 h-36 a20 20 0 0 1 -20 -20 v-170 c0 -26 26 -38 26 -48z"
        fill={glass ? 'rgba(255,255,255,0.16)' : '#FFFFFF'}
        stroke={stroke}
        strokeWidth={glass ? 2 : 3}
      />
      <path d="M28 64 q32 7 64 0 M24 74 q36 8 72 0 M24 238 q36 8 72 0 M24 250 q36 8 72 0" stroke={stroke} strokeWidth={glass ? 1.4 : 2} fill="none" opacity={glass ? 0.7 : 1} />
      <rect x="38" y="84" width="44" height="146" rx="3" fill={labelColor} />
      <text x="60" y="162" transform="rotate(90 60 157)" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="19" fill="#FFFFFF">
        {brand}
      </text>
      {label ? (
        <text x="60" y="268" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize={glass ? 10 : 12} fill={glass ? '#FFFFFF' : '#0F1E5A'}>
          {label}
        </text>
      ) : null}
    </svg>
  );
}
