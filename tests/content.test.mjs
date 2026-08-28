import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const content = join(root, 'content', 'toothpaste');
const publicImages = join(root, 'public', 'images', 'toothpaste');
const canonicalRouteFile = join(root, 'app', 'toothpaste', 'page.tsx');

function json(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function source(path) {
  return readFileSync(join(root, path), 'utf8');
}

test('publishes the explicit canonical /toothpaste route', () => {
  const config = json(join(content, 'config.json'));
  assert.equal(config.slug, 'ยาสีฟัน');
  assert.equal(config.route, '/toothpaste');
  assert.ok(existsSync(canonicalRouteFile));
  assert.ok(!existsSync(join(root, 'app', '[slug]', 'page.tsx')));
  assert.ok(!existsSync(join(root, 'app', 'ยาสีฟัน', 'page.tsx')));
  const routeSource = readFileSync(canonicalRouteFile, 'utf8');
  assert.match(routeSource, /getPlanBySlug/);
  assert.match(routeSource, /ToothpastePlan/);
  assert.match(routeSource, /alternates:\s*\{/);
  assert.match(routeSource, /canonical:\s*['"]\/toothpaste['"]/);
  assert.doesNotMatch(routeSource, /generateStaticParams|decodeURIComponent|force-dynamic/);
});

test('ships every source-plan section instead of a summary-only page', () => {
  const files = readdirSync(join(content, 'markdown')).filter((name) => name.endsWith('.md'));
  assert.equal(files.length, 14);
  const required = [
    '00_brief.md', 'step1_market_analysis.md', 'step2_competitor_analysis.md',
    'step3_swot_analysis.md', 'step4_customer_persona.md',
    'step5_positioning_key_message.md', 'step6_online_strategy.md',
    'step7_offline_strategy.md', 'step8_content_plan.md',
    'step8b_30_clip_scripts.md', 'step9_budget_allocation.md',
    'step10_kpis_measurement.md', 'step11_execution_timeline.md',
    'step12_executive_report.md'
  ];
  assert.deepEqual(files.sort(), required.sort());
});

test('preserves the full verified research datasets', () => {
  const competitors = json(join(content, 'data', 'competitors.json'));
  const voice = json(join(content, 'data', 'customer_voice.json'));
  const evidence = json(join(content, 'data', 'evidence_ledger.json'));
  assert.equal(competitors.length, 10);
  assert.equal(new Set(competitors.map((row) => row.brand)).size, 10);
  assert.equal(voice.records.length, 100);
  assert.equal(evidence.length, 41);
});

test('publishes privacy-reduced voice records without quotes or record-level URLs', () => {
  const voicePath = join(content, 'data', 'customer_voice.json');
  const voice = json(voicePath);
  const download = json(join(root, 'public', 'downloads', 'toothpaste', 'customer_voice.json'));
  assert.deepEqual(download, voice);
  assert.match(voice.privacy_note, /privacy-reduced\/pseudonymized/i);
  assert.match(voice.privacy_note, /not fully anonymous/i);
  assert.match(voice.privacy_note, /private source/i);
  assert.equal(voice.records.length, 100);
  for (const record of voice.records) {
    assert.ok(!Object.hasOwn(record, 'quote'));
    assert.doesNotMatch(record.source_url, /#review-/i);
    assert.doesNotMatch(record.source_url, /[?&]lc=/i);
    if (record.source_url.includes('youtube.com/watch')) {
      assert.ok(new URL(record.source_url).searchParams.has('v'));
    }
  }
  for (const directory of [join(content, 'data'), join(root, 'public', 'downloads', 'toothpaste')]) {
    for (const name of readdirSync(directory).filter((item) => item.endsWith('.json'))) {
      const text = readFileSync(join(directory, name), 'utf8');
      assert.doesNotMatch(text, /#review-|[?&]lc=/i, `record-level identifier in ${name}`);
    }
  }
});

test('does not publish known verbatim voice excerpts in UI, markdown, or DOCX', () => {
  const unsafe = [
    'Gosh they were expensive', 'Пенится еле-еле', 'it did make my teeth a little sensitive',
    'show the box with the ingredients', 'Does the flavor change it', 'the tube is in Thai',
  ];
  const publicText = [
    source('components/toothpaste-plan.tsx'),
    ...readdirSync(join(content, 'markdown')).map((name) => readFileSync(join(content, 'markdown', name), 'utf8')),
    ...readdirSync(join(root, 'public', 'downloads', 'toothpaste'))
      .filter((name) => name.endsWith('.md') || name.endsWith('.json') || name.endsWith('.csv') || name.endsWith('.svg'))
      .map((name) => readFileSync(join(root, 'public', 'downloads', 'toothpaste', name), 'utf8')),
  ].join('\n');
  for (const excerpt of unsafe) assert.ok(!publicText.includes(excerpt), `published excerpt: ${excerpt}`);

  const docxText = execFileSync('python3', ['-c', [
    'from zipfile import ZipFile',
    `p = ${JSON.stringify(join(root, 'public', 'downloads', 'toothpaste', 'full-plan.docx'))}`,
    "with ZipFile(p) as z: print(z.read('word/document.xml').decode('utf-8'))",
  ].join('\n')], { encoding: 'utf8' });
  for (const excerpt of unsafe) assert.ok(!docxText.includes(excerpt), `DOCX published excerpt: ${excerpt}`);
});

test('contains all 30 complete short-video scripts', () => {
  const scripts = readFileSync(join(content, 'markdown', 'step8b_30_clip_scripts.md'), 'utf8');
  const matches = [...scripts.matchAll(/^## คลิปที่ (\d+)\b/gm)].map((match) => Number(match[1]));
  assert.deepEqual(matches, Array.from({ length: 30 }, (_, index) => index + 1));
});

test('uses at least ten purposeful visual assets on the toothpaste page', () => {
  const config = json(join(content, 'config.json'));
  assert.ok(config.visuals.length >= 10);
  const visualNames = new Set(config.visuals.map((item) => item.src.split('/').at(-1)));
  assert.ok(visualNames.size >= 10);
  for (const visual of config.visuals) {
    assert.ok(existsSync(join(root, 'public', visual.src)), `missing ${visual.src}`);
  }
  const page = source('components/toothpaste-plan.tsx');
  for (const visual of config.visuals) {
    assert.ok(page.includes(visual.id), `visual ${visual.id} is not referenced by the page`);
  }
  assert.ok(readdirSync(publicImages).length >= 10);
});

test('renders all required record fields and complete analysis disclosures', () => {
  const page = source('components/toothpaste-plan.tsx');
  for (const field of [
    'observed_at', 'product', 'rating', 'review_date', 'retrieved_at', 'language',
    'source_type', 'verified_purchase', 'publication_date',
  ]) assert.match(page, new RegExp(field));
  assert.match(page, /JSON\.stringify\(plan\.voiceAnalysis/);
  assert.match(page, /JSON\.stringify\(plan\.budget/);
  for (const download of ['customer_voice.json', 'voice_analysis.json', 'budget_allocation.json']) {
    assert.match(page, new RegExp(download.replace('.', '\\.')));
  }
  assert.match(page, /privacy-reduced\/pseudonymized/i);
  assert.match(page, /not fully anonymous/i);
  assert.doesNotMatch(page, /record\.quote/);
});

test('verified_purchase schema accepts source string, boolean, or null values', () => {
  const plans = source('lib/plans.ts');
  assert.match(plans, /verified_purchase:\s*string\s*\|\s*boolean\s*\|\s*null/);
});

test('uses local system font stacks without runtime Google Fonts', () => {
  const css = source('app/globals.css');
  assert.doesNotMatch(css, /fonts\.googleapis\.com|@import\s+url/i);
  assert.match(css, /system-ui/);
});

test('generator and browser QA are portable', () => {
  const generator = source('scripts/generate-content.py');
  assert.doesNotMatch(generator, /\/Users\/macminibot/);
  assert.match(generator, /--source/);
  assert.match(generator, /BIZDRIVE_PLAN_SOURCE/);
  assert.match(generator, /Path\(__file__\)\.resolve\(\)\.parents\[1\]/);

  const qa = source('scripts/browser-qa.mjs');
  assert.match(qa, /CHROME_EXECUTABLE_PATH/);
  assert.match(qa, /\/usr\/bin\/google-chrome/);
  assert.match(qa, /\/Applications\/Google Chrome\.app/);
});

test('centralizes site origin and runs asset validation in CI', () => {
  const site = source('lib/site.ts');
  assert.match(site, /NEXT_PUBLIC_SITE_URL/);
  assert.match(site, /https:\/\/bizdrive-marketing-plan\.vercel\.app/);
  for (const file of ['app/layout.tsx', 'app/sitemap.ts', 'app/robots.ts']) {
    assert.match(source(file), /SITE_ORIGIN/);
    assert.doesNotMatch(source(file), /https:\/\/bizdrive-marketing-plan\.vercel\.app/);
  }
  assert.match(source('.github/workflows/ci.yml'), /python3 scripts\/validate-assets\.py/);
  assert.match(source('components/toothpaste-plan.tsx'), /Gates passed/);
  assert.doesNotMatch(source('components/toothpaste-plan.tsx'), />0 errors</);
});
