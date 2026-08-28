import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { PlanData, Visual } from '@/lib/plans';

const sectionLabels: Record<string, string> = {
  '00_brief.md': '00 — Brief & assumptions',
  'step1_market_analysis.md': '01 — Market landscape',
  'step2_competitor_analysis.md': '02 — Competitors & Voice',
  'step3_swot_analysis.md': '03 — SWOT / TOWS',
  'step4_customer_persona.md': '04 — Segments & personas',
  'step5_positioning_key_message.md': '05 — Winning Zone',
  'step6_online_strategy.md': '06 — Online strategy',
  'step7_offline_strategy.md': '07 — Offline / O2O',
  'step8_content_plan.md': '08 — Content system',
  'step8b_30_clip_scripts.md': '08B — 30 video scripts',
  'step9_budget_allocation.md': '09 — Budget & scenarios',
  'step10_kpis_measurement.md': '10 — KPI & measurement',
  'step11_execution_timeline.md': '11 — Execution timeline',
  'step12_executive_report.md': '12 — Executive report',
};

type VoiceTheme = { count: number; pct: number };
type VoiceAnalysis = {
  n: number;
  overall_themes: Record<string, VoiceTheme>;
  sentiment: Record<string, VoiceTheme>;
};
type BudgetData = {
  summary: { channel_mix_pct: Record<string, number> };
  allocation_thb: { online: number; offline: number; kol: number; reserve: number; online_sub: Record<string, number> };
  detailed_channel_allocation_thb: Record<string, number>;
  scenario_illustration: Record<string, unknown>;
};

function thb(value: number | string) {
  return `${Number(value).toLocaleString('th-TH')} บาท`;
}

function displayValue(value: string | number | boolean | null) {
  if (value === null || value === '') return '—';
  return String(value);
}

function Asset({ visual, priority = false }: { visual: Visual; priority?: boolean }) {
  const isPng = visual.src.endsWith('.png');
  return (
    <figure className="editorial-visual" id={`visual-${visual.id}`}>
      <Image
        src={`/${visual.src}`}
        alt={visual.alt}
        width={1200}
        height={800}
        priority={priority}
        unoptimized={!isPng}
      />
      <figcaption>{visual.alt} • analytical visual, not measured market perception</figcaption>
    </figure>
  );
}

function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => <a {...props} target="_blank" rel="noreferrer">{children}</a>,
          table: ({ children, ...props }) => <div className="table-scroll"><table {...props}>{children}</table></div>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function ToothpastePlan({ plan }: { plan: PlanData }) {
  const { config } = plan;
  const visual = (id: string) => {
    const found = config.visuals.find((item) => item.id === id);
    if (!found) throw new Error(`Missing visual: ${id}`);
    return found;
  };

  // Explicit visual contract: every purposeful asset must be used on this page.
  const heroVisual = visual('hero');
  const marketVisual = visual('market');
  const competitorVisual = visual('competitors');
  const priceVisual = visual('prices');
  const voiceVisual = visual('voice');
  const ritualPersonaVisual = visual('persona-ritual');
  const appearancePersonaVisual = visual('persona-appearance');
  const comfortPersonaVisual = visual('persona-comfort');
  const winningZoneVisual = visual('winning-zone');
  const positioningVisual = visual('positioning');
  const channelsVisual = visual('channels');
  const budgetVisual = visual('budget');
  const timelineVisual = visual('timeline');
  const evidenceGateVisual = visual('evidence-gate');

  const voice = plan.voiceAnalysis as unknown as VoiceAnalysis;
  const budget = plan.budget as unknown as BudgetData;
  const themes = Object.entries(voice.overall_themes);

  return (
    <div className="plan-shell">
      <header className="topbar">
        <Link href="/" className="brand-mark" aria-label="BizDrive Marketing Plan Lab home">
          <span className="brand-dot" />
          <span>BizDrive Plan Lab</span>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#strategy">Strategy</a>
          <a href="#competition">10 Brands</a>
          <a href="#voice">Customer Voice</a>
          <a href="#full-plan">Full plan</a>
        </nav>
        <a className="download-button" href="/downloads/toothpaste/full-plan.docx">ดาวน์โหลด DOCX</a>
      </header>

      <aside className="rail" aria-label="Plan section navigation">
        <p className="rail-label">TOOTHPASTE / 2026</p>
        <a href="#overview">Overview</a>
        <a href="#strategy">Winning Zone</a>
        <a href="#competition">Competition</a>
        <a href="#voice">Customer Voice</a>
        <a href="#personas">Personas</a>
        <a href="#channels">Channels</a>
        <a href="#budget">Budget</a>
        <a href="#timeline">Timeline</a>
        <a href="#evidence">Evidence</a>
        <a href="#full-plan">Steps 00–12</a>
      </aside>

      <main>
        <section className="hero" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">MARKETING PLAN SIMULATION • THAILAND</p>
            <span className="status-pill warning">Research trial — ยังไม่ใช่ launch approval</span>
            <h1>ยาสีฟันพรีเมียม<br /><em>ที่พิสูจน์ได้</em></h1>
            <p className="hero-lede">แผน 12 ขั้นสำหรับแบรนด์ทดลองราคา 350 บาท ครอบคลุมคู่แข่ง 10 แบรนด์ Customer Voice 100 records งบทุกช่องทาง และ execution 90 วัน</p>
            <div className="hero-actions">
              <a href="#strategy" className="primary-button">ดู Winning Zone</a>
              <a href="#full-plan" className="secondary-button">อ่านข้อมูลทั้งหมด</a>
            </div>
          </div>
          <Asset visual={heroVisual} priority />
        </section>

        <section className="metric-strip" aria-label="Plan facts">
          <div><span>ราคาทดลอง</span><strong>{thb(config.priceThb)}</strong></div>
          <div><span>งบต่อเดือน</span><strong>{thb(config.monthlyBudgetThb)}</strong></div>
          <div><span>ระยะเวลา</span><strong>{config.durationMonths} เดือน</strong></div>
          <div><span>Evidence</span><strong>{plan.evidenceLedger.length} รายการ</strong></div>
          <div><span>QA</span><strong>Gates passed</strong></div>
        </section>

        <section className="editorial-section" id="strategy">
          <div className="section-intro">
            <p className="section-number">01 / STRATEGIC ANSWER</p>
            <h2>จุดชนะไม่ใช่ “ขาวแรงที่สุด”</h2>
            <p>พื้นที่ที่น่าทดสอบคือประสบการณ์พรีเมียมที่คนอยากใช้ทุกวัน พร้อมหลักฐานและข้อจำกัดของทุก claim ที่ตรวจย้อนกลับได้</p>
          </div>
          <div className="strategy-grid">
            <article className="strategy-primary">
              <span>PRIMARY — PROVISIONAL</span>
              <h3>{config.primaryWinningZone}</h3>
              <p>สร้าง sensorial ritual ผ่านรส เนื้อสัมผัส after-feel และ design พร้อม Product Evidence Pack ที่เปิดเผยสิ่งที่รู้และยังไม่รู้</p>
            </article>
            <article>
              <span>SECONDARY TEST</span>
              <h3>{config.secondaryTerritory}</h3>
              <p>ทดสอบ concept และ sensorial ก่อน ห้ามใช้ efficacy wording จนสูตร วิธีทดสอบ ผล และ Thai compliance รองรับ</p>
            </article>
            <article className="no-go-card">
              <span>NO-GO</span>
              <h3>ห้ามชนะด้วยคำสัญญาเกินหลักฐาน</h3>
              <p>Disease treatment, guaranteed whitening, unsupported sensitivity/clinical claims, fake reviews, fake before-after และ artificial scarcity</p>
            </article>
          </div>
          <div className="visual-pair">
            <Asset visual={winningZoneVisual} />
            <Asset visual={positioningVisual} />
          </div>
        </section>

        <section className="editorial-section warm" id="competition">
          <div className="section-intro split-heading">
            <div><p className="section-number">02 / LANDSCAPE</p><h2>ตลาดและคู่แข่ง 10 แบรนด์</h2></div>
            <p>Fixed competitive set เดียวกันถูกใช้ใน price, claims, channels, Customer Voice และ positioning analysis เพื่อลด selection drift</p>
          </div>
          <div className="visual-pair">
            <Asset visual={marketVisual} />
            <Asset visual={competitorVisual} />
          </div>
          <Asset visual={priceVisual} />

          <div className="competitor-grid">
            {plan.competitors.map((competitor, index) => (
              <article className="competitor-card" key={competitor.brand}>
                <div className="competitor-index">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{competitor.brand}</h3>
                  <p className="product-name">{competitor.product}</p>
                  <div className="price-line"><strong>{thb(competitor.observed_price_thb)}</strong><span>{competitor.pack_size}</span></div>
                  <p>{competitor.positioning}</p>
                  <details>
                    <summary>ข้อมูลสินค้าและบทวิเคราะห์ทั้งหมด</summary>
                    <dl className="record-list">
                      <div><dt>Observed at</dt><dd>{competitor.observed_at}</dd></div>
                      <div><dt>Segment</dt><dd>{competitor.segment}</dd></div>
                      <div><dt>Unit price</dt><dd>{competitor.unit_price}</dd></div>
                      <div><dt>Claims</dt><dd>{competitor.claims}</dd></div>
                      <div><dt>Technology</dt><dd>{competitor.ingredients_or_technology}</dd></div>
                      <div><dt>Channels</dt><dd>{competitor.channels}</dd></div>
                      <div><dt>Strengths</dt><dd>{competitor.strengths}</dd></div>
                      <div><dt>Weaknesses</dt><dd>{competitor.weaknesses}</dd></div>
                      <div><dt>Whitespace</dt><dd>{competitor.whitespace}</dd></div>
                      <div><dt>Evidence grade</dt><dd>{competitor.evidence_grade}</dd></div>
                    </dl>
                    <a className="source-link" href={competitor.price_source_url} target="_blank" rel="noreferrer">เปิด price/product source ↗</a>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section" id="voice">
          <div className="section-intro">
            <p className="section-number">03 / CUSTOMER VOICE</p>
            <h2>วิเคราะห์ Customer Voice 100 records — พร้อมเตือนเรื่อง bias</h2>
            <p>Convenience sample แบบ privacy-reduced: 60 records จาก ProductReview.com.au และ 40 public video comments; 66/100 เป็น Colgate Optic White จึงไม่ใช่ population rate</p>
          </div>
          <p className="privacy-note"><strong>Privacy note:</strong> {plan.customerVoicePrivacyNote}</p>
          <div className="voice-layout">
            <Asset visual={voiceVisual} />
            <div className="theme-list">
              {themes.map(([name, item]) => (
                <div className="theme-row" key={name}>
                  <div><span>{name.replaceAll('_', ' ')}</span><strong>{item.pct}%</strong></div>
                  <div className="theme-track"><span style={{ width: `${item.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <details className="dataset-disclosure">
            <summary>เปิด Customer Voice ทั้ง {plan.customerVoice.length} records (privacy-reduced/pseudonymized; not fully anonymous)</summary>
            <div className="voice-records">
              {plan.customerVoice.map((record, index) => (
                <article key={`${record.source_url}-${index}`}>
                  <div className="record-meta"><span>{record.brand}</span><span>{record.sentiment}</span><span>{record.source_type}</span></div>
                  <dl className="record-list record-data">
                    <div><dt>product</dt><dd>{record.product}</dd></div>
                    <div><dt>rating</dt><dd>{displayValue(record.rating)}</dd></div>
                    <div><dt>review_date</dt><dd>{displayValue(record.review_date)}</dd></div>
                    <div><dt>retrieved_at</dt><dd>{record.retrieved_at}</dd></div>
                    <div><dt>language</dt><dd>{record.language}</dd></div>
                    <div><dt>source_type</dt><dd>{record.source_type}</dd></div>
                    <div><dt>verified_purchase</dt><dd>{displayValue(record.verified_purchase)}</dd></div>
                    <div><dt>themes</dt><dd>{record.themes.join(' • ')}</dd></div>
                  </dl>
                  <a href={record.source_url} target="_blank" rel="noreferrer">Generalized source {index + 1} ↗</a>
                </article>
              ))}
            </div>
          </details>
          <details className="dataset-disclosure json-disclosure">
            <summary>เปิด voice analysis object ฉบับสมบูรณ์</summary>
            <pre>{JSON.stringify(plan.voiceAnalysis, null, 2)}</pre>
          </details>
        </section>

        <section className="editorial-section warm" id="personas">
          <div className="section-intro"><p className="section-number">04 / NEED STATES</p><h2>สาม persona hypotheses</h2><p>Focus allocation ไม่ใช่ market share และต้องยืนยันด้วย Thai primary research</p></div>
          <div className="persona-grid">
            <Asset visual={ritualPersonaVisual} />
            <Asset visual={appearancePersonaVisual} />
            <Asset visual={comfortPersonaVisual} />
          </div>
        </section>

        <section className="editorial-section" id="channels">
          <div className="section-intro"><p className="section-number">05 / GO-TO-MARKET</p><h2>ลงครบทุก channel แต่ไม่ใช้ทุก channel แบบไร้หน้าที่</h2><p>Social/creator ทำ discovery, search/owned ทำ proof, marketplace/D2C เป็น conversion lab และ retail/clinic/sampling สร้าง trust กับ sensorial feedback</p></div>
          <Asset visual={channelsVisual} />
          <div className="channel-table table-scroll">
            <table>
              <thead><tr><th>Channel</th><th>งบ 3 เดือน</th><th>บทบาท</th></tr></thead>
              <tbody>
                {Object.entries(budget.detailed_channel_allocation_thb).map(([channel, amount]) => (
                  <tr key={channel}><td>{channel}</td><td>{thb(amount)}</td><td>{channel.includes('Reserve') ? 'Release หลังผ่าน gate' : 'Test → measure → iterate'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="editorial-section dark" id="budget">
          <div className="section-intro"><p className="section-number">06 / ECONOMICS</p><h2>งบรวม 3 ล้านบาท — แต่ Base illustration ยังไม่สมเหตุผลให้ scale</h2><p>Base revenue / total-plan-spend = 0.581× ก่อนรู้ COGS, gross margin, VAT, fees, discounts, returns และ capacity จึงเสนอ proof-first pilot</p></div>
          <Asset visual={budgetVisual} />
          <div className="budget-grid">
            <div><span>Online</span><strong>{thb(budget.allocation_thb.online)}</strong></div>
            <div><span>Creator / KOL</span><strong>{thb(budget.allocation_thb.kol)}</strong></div>
            <div><span>Offline / O2O</span><strong>{thb(budget.allocation_thb.offline)}</strong></div>
            <div><span>Reserve</span><strong>{thb(budget.allocation_thb.reserve)}</strong></div>
          </div>
          <details className="dataset-disclosure json-disclosure dark-disclosure">
            <summary>เปิด budget และ scenario object ฉบับสมบูรณ์</summary>
            <pre>{JSON.stringify(plan.budget, null, 2)}</pre>
          </details>
        </section>

        <section className="editorial-section" id="timeline">
          <div className="section-intro"><p className="section-number">07 / EXECUTION</p><h2>90 วันจาก product truth สู่ owner decision</h2></div>
          <Asset visual={timelineVisual} />
          <div className="timeline-cards">
            <article><span>DAY 1–30</span><h3>Truth & control</h3><p>สูตร, pack, notification, claim dossier, COGS, tracking และ owner go/no-go</p></article>
            <article><span>DAY 31–60</span><h3>Proposition pilot</h3><p>Ritual vs proof concepts, controlled cohorts, Thai Voice coding และ price/pack feedback</p></article>
            <article><span>DAY 61–90</span><h3>Economics & repeat</h3><p>Allowable CAC, contribution, D7/D30 experience, repeat signal และ end-trial decision</p></article>
          </div>
        </section>

        <section className="editorial-section warm" id="evidence">
          <div className="section-intro"><p className="section-number">08 / EVIDENCE & COMPLIANCE</p><h2>ทุก claim ต้องมีทางย้อนกลับ</h2><p>หลักฐาน 41 รายการ ครอบคลุมกฎหมาย/แนวทาง Thai FDA, market context, competitors, prices และ public Voice</p></div>
          <Asset visual={evidenceGateVisual} />
          <details className="dataset-disclosure">
            <summary>เปิด Evidence ledger ทั้ง {plan.evidenceLedger.length} รายการ</summary>
            <div className="evidence-records">
              {plan.evidenceLedger.map((item, index) => (
                <article key={`${item.url}-${index}`}>
                  <div className="evidence-head"><span>STEP {item.step}</span><span>GRADE {item.grade}</span></div>
                  <h3>{item.title}</h3>
                  <dl className="record-list record-data">
                    <div><dt>publication_date</dt><dd>{displayValue(item.publication_date)}</dd></div>
                    <div><dt>retrieved_at</dt><dd>{item.retrieved_at}</dd></div>
                  </dl>
                  <p>{item.claim}</p>
                  <a href={item.url} target="_blank" rel="noreferrer">Source / หลักฐาน ↗</a>
                </article>
              ))}
            </div>
          </details>
          <details className="dataset-disclosure">
            <summary>เปิด positioning coordinates และ rationale ทั้ง 10 แบรนด์</summary>
            <div className="table-scroll">
              <table>
                <thead><tr>{Object.keys(plan.positioning[0] ?? {}).map((key) => <th key={key}>{key}</th>)}</tr></thead>
                <tbody>{plan.positioning.map((row, index) => <tr key={index}>{Object.values(row).map((value, cell) => <td key={cell}>{value}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </details>
        </section>

        <section className="editorial-section full-plan" id="full-plan">
          <div className="section-intro split-heading">
            <div><p className="section-number">09 / COMPLETE SOURCE PLAN</p><h2>ข้อมูลทั้งหมด Steps 00–12</h2></div>
            <p>Markdown 14 ไฟล์ถูก render ครบในหน้านี้ รวม 30 scripts, KPI, RACI, scenarios, references และข้อจำกัด</p>
          </div>
          <div className="source-downloads">
            <a href="/downloads/toothpaste/full-plan.docx">DOCX ฉบับเต็ม</a>
            <a href="/downloads/toothpaste/competitor_matrix.csv">Competitor CSV</a>
            <a href="/downloads/toothpaste/customer_voice.json">Customer Voice JSON (privacy-reduced)</a>
            <a href="/downloads/toothpaste/voice_analysis.json">Voice Analysis JSON</a>
            <a href="/downloads/toothpaste/budget_allocation.json">Budget & Scenarios JSON</a>
            <a href="/downloads/toothpaste/evidence_ledger.json">Evidence JSON</a>
            <a href="/downloads/toothpaste/positioning_map.csv">Positioning CSV</a>
          </div>
          <div className="markdown-library">
            {plan.markdown.map((section, index) => (
              <details key={section.filename} open={index === 0 || section.filename === 'step12_executive_report.md'}>
                <summary><span>{sectionLabels[section.filename]}</span><code>{section.filename}</code></summary>
                <MarkdownBody content={section.content} />
              </details>
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <div><span className="brand-dot" /><strong>BizDrive Marketing Plan Lab</strong></div>
          <p>Research retrieved {config.researchDate} • Local evidence-led simulation • No media spend or external action authorized by this page.</p>
        </footer>
      </main>
    </div>
  );
}
