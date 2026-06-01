import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';

const args = process.argv
  .splice(2, process.argv.length - 2)
  .map((arg) => arg.replace(/^--/, ''));

process.stdout.write('👷 Building standalone project \n');

execSync(`cross-env ${args.join(' ')} next build`, { stdio: [0, 1, 2] });

(async () => {
  process.stdout.write('📦 Copying ./server.js to standalone ..........');
  process.stdout.write('............. ');
  await fs.cp(
    './server.js',
    './.next/standalone/server.js',
    {
      overwrite: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
  process.stdout.write('✅\n');

  process.stdout.write('📦 Copying ./public folder to standalone ......');
  process.stdout.write('............. ');
  await fs.cp(
    './public',
    './.next/standalone/public',
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
  process.stdout.write('✅\n');

  process.stdout.write('📦 Copying ./.next/static folder to standalone ');
  process.stdout.write('............. ');
  await fs.cp(
    './.next/static',
    './.next/standalone/.next/static',
    {
      recursive: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
  process.stdout.write('✅\n');
})();
