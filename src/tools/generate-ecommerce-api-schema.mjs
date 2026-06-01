import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT = 'src/integrations/ecommerce-api/ecommerce-api.schema.d.ts';

function loadEnvLocal() {
  const path = join(process.cwd(), '.env.local');
  if (!existsSync(path)) return;
  const text = readFileSync(path, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const baseUrl = process.env.ECOMMERCE_OPENAPI_SPEC_BASE_URL?.trim();
let sas = process.env.ECOMMERCE_OPENAPI_SPEC_SAS?.trim();

if (!baseUrl || !sas) {
  console.error(
    'Set ECOMMERCE_OPENAPI_SPEC_BASE_URL and ECOMMERCE_OPENAPI_SPEC_SAS (see .env.example).',
  );
  console.error(
    'ECOMMERCE_OPENAPI_SPEC_SAS is the blob SAS query string (everything after ? in the URL).',
  );
  process.exit(1);
}

if (sas.startsWith('?')) {
  sas = sas.slice(1);
}

const specUrl = `${baseUrl.replace(/\/$/, '')}?${sas}`;
const cli = join(process.cwd(), 'node_modules/openapi-typescript/bin/cli.js');

const result = spawnSync(process.execPath, [cli, specUrl, '-o', OUTPUT], {
  stdio: 'inherit',
});

process.exit(result.status === null ? 1 : result.status);
