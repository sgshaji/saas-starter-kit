#!/usr/bin/env tsx
import { execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const IMG_DIR = path.resolve('public/assets/images');
const SOURCE_PATTERNS = ['src', 'docs', 'README.md'];
/* eslint-disable-next-line regexp/no-unused-capturing-group */
const IMAGE_EXT = /\.(png|jpe?g|svg|gif|webp)$/i;

async function listImages(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listImages(full));
    } else if (IMAGE_EXT.test(entry.name)) {
      files.push(full);
    }
  }));
  return files;
}

function listUsedImages(): string[] {
  const pattern = 'assets/images/[^\"\'\ )]+'; // matches paths in code/markdown
  const rgOutput = execSync(`rg --no-heading --no-line-number -o "${pattern}" ${SOURCE_PATTERNS.join(' ')}`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
  });
  return rgOutput.split(/\r?\n/).filter(Boolean).map(p => path.basename(p.trim()));
}

(async () => {
  const [all, used] = await Promise.all([
    listImages(IMG_DIR),
    Promise.resolve(listUsedImages()),
  ]);

  const usedSet = new Set(used);
  const unused = all.filter(f => !usedSet.has(path.basename(f)));

  if (unused.length) {
    console.error('🚨 Unused images detected:');
    unused.forEach(f => console.error(`  ${path.relative('.', f)}`));
    process.exit(1);
  } else {
    console.log('✅ No unused images found');
  }
})();
