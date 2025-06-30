// Generate documentation for environment variables declared in src/libs/Env.ts
// Usage: pnpm tsx scripts/doc-env.ts > docs/ENV_VARS.md

import fs from 'node:fs';
import path from 'node:path';

const envFile = fs.readFileSync(path.resolve('src/libs/Env.ts'), 'utf8');

/* eslint-disable no-cond-assign */

// Match scopes first: server: { ... }, client: { ... }, shared: { ... }
const scopeRegex = /(server|client|shared)\s*:\s*\{([\s\S]*?)\}\s*,/g;

const rows: { scope: string; key: string; required: boolean }[] = [];

let scopeMatch: RegExpExecArray | null;
while ((scopeMatch = scopeRegex.exec(envFile)) !== null) {
  const scope = scopeMatch[1] as string;
  const body = scopeMatch[2] as string;
  const lineRegex = /([A-Z0-9_]+)\s*:\s*z\.[^;\n]+/g;
  let lineMatch: RegExpExecArray | null;
  while ((lineMatch = lineRegex.exec(body)) !== null) {
    const key = lineMatch[1] as string;
    const isOptional = /\.optional\(/.test(lineMatch[0]);
    rows.push({ scope, key, required: !isOptional });
  }
}

// Build markdown
let md = '# 📄 Environment Variables\n\n| Scope | Variable | Required |\n|-------|----------|----------|\n';
rows
  .sort((a, b) => a.key.localeCompare(b.key))
  .forEach((r) => {
    md += `| ${r.scope} | \`${r.key}\` | ${r.required ? 'yes' : 'no'} |\n`;
  });

console.log(md);
