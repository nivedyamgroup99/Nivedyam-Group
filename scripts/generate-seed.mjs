// Builds supabase/seed.sql from src/content/defaults.json.
// Usage: node scripts/generate-seed.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../src/content/defaults.json', import.meta.url), 'utf8'));

const q = (v) => {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  return "'" + String(v).replace(/'/g, "''") + "'";
};

const out = [
  '-- Starting content for the Nivedyam website.',
  '-- Run AFTER schema.sql. Safe to run once on an empty database.',
  '-- IMPORTANT: change the email on the last line to your own Google account.',
  ''
];

out.push('insert into public.site_settings (key, value) values');
out.push(
  Object.entries(data.site_settings)
    .map(([k, v]) => `  (${q(k)}, ${q(v)})`)
    .join(',\n') + '\non conflict (key) do nothing;\n'
);

for (const [table, rows] of Object.entries(data)) {
  if (table === 'site_settings' || !Array.isArray(rows) || rows.length === 0) continue;
  const cols = Object.keys(rows[0]);
  out.push(`insert into public.${table} (${cols.join(', ')}) values`);
  out.push(rows.map((r) => '  (' + cols.map((c) => q(r[c])).join(', ') + ')').join(',\n') + ';\n');
}

out.push('-- First owner. Replace with the Google email that should manage the site.');
out.push("insert into public.admins (email, role) values ('gokulpp33@gmail.com', 'owner'), ('nivedyamgroup99@gmail.com', 'owner') on conflict (email) do nothing;");

writeFileSync(new URL('../supabase/seed.sql', import.meta.url), out.join('\n') + '\n');
console.log('Wrote supabase/seed.sql');
