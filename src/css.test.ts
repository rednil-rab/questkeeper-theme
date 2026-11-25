import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (name: string) => readFileSync(new URL(`./${name}`, import.meta.url), 'utf8');
const tokens = read('tokens.css');
const base = read('base.css');

describe('theme css', () => {
  it('defines every var(--x) used in base.css in tokens.css', () => {
    const used = new Set([...base.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
    const missing = [...used].filter((name) => !new RegExp(`${name}\\s*:`).test(tokens));
    expect(used.size).toBeGreaterThan(0);
    expect(missing).toEqual([]);
  });

  it('has no hex colors or rgb/rgba values in base.css', () => {
    expect(base.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)).toBeNull();
  });

  it('defines the promoted tokens with their exact values', () => {
    expect(tokens).toContain('--danger: #ff7a6b;');
    expect(tokens).toContain('--shadow-hard: 4px 4px 0 #000;');
    expect(tokens).toContain('--shadow-dialog: 6px 6px 0 #000;');
    expect(tokens).toContain('--backdrop: rgba(0, 0, 0, 0.7);');
  });

  it('falls back to monospace in both font tokens', () => {
    expect(tokens).toMatch(/--font-display:[^;]*monospace;/);
    expect(tokens).toMatch(/--font-body:[^;]*monospace;/);
  });
});
