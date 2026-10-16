type P = { size?: number; color?: string; className?: string };

const base = (size: number, color: string, w = 1.8) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color,
  strokeWidth: w, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
});

export const Drop = ({ size = 24, color = 'currentColor' }: P) => (
  <svg {...base(size, color)}><path d="M12 2.5C8 8 5.5 11.5 5.5 15a6.5 6.5 0 0 0 13 0c0-3.5-2.5-7-6.5-12.5z" /><path d="M9 15.5a3 3 0 0 0 3 3" /></svg>
);
export const WhatsApp = ({ size = 18, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2)}><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" /></svg>
);
export const Menu = ({ size = 22, color = '#FFFFFF' }: P) => (
  <svg {...base(size, color, 2)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size = 22, color = '#FFFFFF' }: P) => (
  <svg {...base(size, color, 2)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const ChevronLeft = ({ size = 20, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2)}><path d="M15 6l-6 6 6 6" /></svg>
);
export const ChevronRight = ({ size = 20, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2)}><path d="M9 6l6 6-6 6" /></svg>
);
export const ArrowRight = ({ size = 18, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size = 16, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2)}><path d="M7 17L17 7M9 7h8v8" /></svg>
);
export const Lock = ({ size = 14, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2)}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const Phone = ({ size = 26, color = 'currentColor' }: P) => (
  <svg {...base(size, color)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Mail = ({ size = 26, color = 'currentColor' }: P) => (
  <svg {...base(size, color)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Pin = ({ size = 26, color = 'currentColor' }: P) => (
  <svg {...base(size, color)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const Clock = ({ size = 24, color = 'currentColor' }: P) => (
  <svg {...base(size, color)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Check = ({ size = 18, color = 'currentColor' }: P) => (
  <svg {...base(size, color, 2.2)}><path d="M5 12l5 5 9-10" /></svg>
);
export const Star = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F4B942" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>
);
export const Plus = ({ size = 16 }: P) => (
  <svg {...base(size, 'currentColor', 2.4)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Quote = ({ size = 44, color = '#F4B942' }: P) => (
  <svg {...base(size, color, 2)}><path d="M7 17c-2 0-3-1.5-3-4 0-3 2-6 5-7M17 17c-2 0-3-1.5-3-4 0-3 2-6 5-7" /></svg>
);
export const Flask = ({ size = 28, color = 'currentColor' }: P) => (
  <svg {...base(size, color)}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path d="M7.5 15h9" /></svg>
);

/** Icons selectable from the admin panel for feature cards. */
export const FEATURE_ICONS = ['drop', 'mountain', 'filter', 'shield', 'eye', 'check', 'thumb', 'flask', 'leaf'] as const;

export function FeatureIcon({ name, size = 26, color = '#0B7568' }: { name: string; size?: number; color?: string }) {
  const p = base(size, color);
  switch (name) {
    case 'mountain': return <svg {...p}><path d="M3 20l6-10 4 6 3-4 5 8z" /><circle cx="17" cy="6" r="2" /></svg>;
    case 'filter': return <svg {...p}><path d="M4 4h16l-6 8v6l-4 2v-8z" /></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'eye': return <svg {...p}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>;
    case 'check': return <svg {...base(size, color, 2.2)}><path d="M5 12l5 5 9-10" /></svg>;
    case 'thumb': return <svg {...p}><path d="M7 11v9H4v-9zM7 11l4-8a2 2 0 0 1 3 2l-1 5h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7" /></svg>;
    case 'flask': return <svg {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path d="M7.5 15h9" /></svg>;
    case 'leaf': return <svg {...p}><path d="M7 20c-2-6 2-13 13-16-1 11-8 15-13 16z" /><path d="M7 20c2-4 5-7 9-9" /></svg>;
    default: return <svg {...p}><path d="M12 2.5C8 8 5.5 11.5 5.5 15a6.5 6.5 0 0 0 13 0c0-3.5-2.5-7-6.5-12.5z" /></svg>;
  }
}
