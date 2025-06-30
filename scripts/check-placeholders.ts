#!/usr/bin/env tsx
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'src');

const PLACEHOLDER_REGEX = /TODO|FIXME/;

async function walk(dir: string, files: string[] = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else {
      files.push(full);
    }
  }));
  return files;
}

(async () => {
  const allFiles = await walk(SRC);
  const offenders: { file: string; line: number; text: string }[] = [];

  await Promise.all(allFiles.map(async (file) => {
    if (/\.test\./.test(file)) {
      return;
    } // skip tests
    const content = await fs.readFile(file, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (PLACEHOLDER_REGEX.test(line)) {
        offenders.push({ file, line: idx + 1, text: line.trim() });
      }
    });
  }));

  if (offenders.length) {
    console.error('❌ Placeholder comments found:');
    offenders.forEach(o => console.error(`${o.file}:${o.line}  ${o.text}`));
    process.exit(1);
  }
})();
