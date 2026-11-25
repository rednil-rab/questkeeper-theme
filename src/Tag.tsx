import type { ReactNode } from 'react';

export type TagTone = 'amber' | 'cyan' | 'danger' | 'muted';

export function Tag({ tone = 'amber', children }: { tone?: TagTone; children: ReactNode }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}
