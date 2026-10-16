'use client';

/** Submit button that asks before doing something destructive. */
export default function ConfirmButton({ message, children, className = 'adm-btn danger sm' }: { message: string; children: React.ReactNode; className?: string }) {
  return (
    <button type="submit" className={className} onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}>
      {children}
    </button>
  );
}
