import fs from 'node:fs';
import path from 'node:path';

export type Visual = { id: string; src: string; alt: string };
export type PlanConfig = {
  slug: string;
  route: string;
  title: string;
  priceThb: number;
  monthlyBudgetThb: number;
  durationMonths: number;
  totalBudgetThb: number;
  researchDate: string;
  status: string;
  primaryWinningZone: string;
  secondaryTerritory: string;
  visuals: Visual[];
};

export type Competitor = {
  brand: string;
  product: string;
  segment: string;
  pack_size: string;
  observed_price_thb: string;
  unit_price: string;
  price_source_url: string;
  observed_at: string;
  claims: string;
  ingredients_or_technology: string;
  positioning: string;
  channels: string;
  strengths: string;
  weaknesses: string;
  whitespace: string;
  evidence_grade: string;
};

export type VoiceRecord = {
  source_url: string;
  brand: string;
  product: string;
  rating: number | null;
  review_date: string | null;
  retrieved_at: string;
  language: string;
  themes: string[];
  sentiment: string;
  source_type: string;
  verified_purchase: string | boolean | null;
};

export type PublicVoiceDataset = {
  privacy_note: string;
  records: VoiceRecord[];
};

export type Evidence = {
  step: number;
  url: string;
  title: string;
  publication_date: string | null;
  retrieved_at: string;
  claim: string;
  grade: string;
};

export type MarkdownSection = {
  filename: string;
  content: string;
};

export type PlanData = {
  config: PlanConfig;
  competitors: Competitor[];
  customerVoice: VoiceRecord[];
  customerVoicePrivacyNote: string;
  evidenceLedger: Evidence[];
  voiceAnalysis: Record<string, unknown>;
  budget: Record<string, unknown>;
  positioning: Record<string, string>[];
  markdown: MarkdownSection[];
};

const PLAN_DIR = path.join(process.cwd(), 'content', 'toothpaste');
const MARKDOWN_ORDER = [
  '00_brief.md',
  'step1_market_analysis.md',
  'step2_competitor_analysis.md',
  'step3_swot_analysis.md',
  'step4_customer_persona.md',
  'step5_positioning_key_message.md',
  'step6_online_strategy.md',
  'step7_offline_strategy.md',
  'step8_content_plan.md',
  'step8b_30_clip_scripts.md',
  'step9_budget_allocation.md',
  'step10_kpis_measurement.md',
  'step11_execution_timeline.md',
  'step12_executive_report.md',
];

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(PLAN_DIR, relativePath), 'utf8')) as T;
}

export function getPlanBySlug(slug: string): PlanData | null {
  const config = readJson<PlanConfig>('config.json');
  if (slug !== config.slug) return null;
  const voiceDataset = readJson<PublicVoiceDataset>('data/customer_voice.json');
  return {
    config,
    competitors: readJson<Competitor[]>('data/competitors.json'),
    customerVoice: voiceDataset.records,
    customerVoicePrivacyNote: voiceDataset.privacy_note,
    evidenceLedger: readJson<Evidence[]>('data/evidence_ledger.json'),
    voiceAnalysis: readJson<Record<string, unknown>>('data/voice_analysis.json'),
    budget: readJson<Record<string, unknown>>('data/budget_allocation.json'),
    positioning: readJson<Record<string, string>[]>('data/positioning.json'),
    markdown: MARKDOWN_ORDER.map((filename) => ({
      filename,
      content: fs.readFileSync(path.join(PLAN_DIR, 'markdown', filename), 'utf8'),
    })),
  };
}

export function getPlanIndex(): PlanConfig[] {
  return [readJson<PlanConfig>('config.json')];
}
