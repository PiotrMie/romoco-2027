import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });
cpSync(resolve(root, '.nojekyll'), resolve(output, '.nojekyll'));

for (const file of readdirSync(root)) {
  if (extname(file) === '.html') {
    cpSync(resolve(root, file), resolve(output, file));
  }
}

console.log(`Built ${readdirSync(output).filter((file) => extname(file) === '.html').length} pages in dist/.`);

