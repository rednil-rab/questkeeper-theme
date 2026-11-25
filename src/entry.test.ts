import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('package entry', () => {
  it('uses explicit .js extensions for relative imports so plain Node ESM can load dist', () => {
    const source = readFileSync(new URL('./index.ts', import.meta.url), 'utf8');
    const specifiers = [...source.matchAll(/from '(\.[^']+)'/g)].map((m) => m[1]);
    expect(specifiers.length).toBeGreaterThan(0);
    expect(specifiers.filter((s) => !s.endsWith('.js'))).toEqual([]);
  });
});
