import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pages = readdirSync(root).filter((name) => extname(name) === '.html');
const failures = [];

for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8');
  const references = [...html.matchAll(/(?:href|src)=["']([^"'#]+)["']/g)].map((match) => match[1]);

  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) {
      continue;
    }

    const cleanReference = reference.split('?')[0];
    if (!existsSync(resolve(root, cleanReference))) {
      failures.push(`${page}: missing ${cleanReference}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Checked ${pages.length} HTML pages. All local references resolve.`);

