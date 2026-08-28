import type { Metadata } from 'next';
import Link from 'next/link';

const filename = 'bizdrive-strategic-marketing-plan-v0.9.0.zip';
const downloadHref = `/downloads/skill/${filename}`;
const checksumHref = `${downloadHref}.sha256`;
const sha256 = '2f36245d86ec459f541c64afe37a11ebc8578fc9d52ccbac8b0589843df7683c';

export const metadata: Metadata = {
  title: 'BizDrive Strategic Marketing Plan Skill — Student Beta',
  description: 'ดาวน์โหลด Agent Skill สำหรับสร้าง Category Intelligence, Strategic Plan และ Marketing Plan แบบ evidence-led',
  alternates: { canonical: '/skill' },
  openGraph: {
    title: 'BizDrive Strategic Marketing Plan Skill — Student Beta v0.9.0',
    description: 'Portable skill สำหรับ Codex, Claude Code, Hermes และ Agent Skills-compatible runtimes',
    type: 'website',
  },
};

const runtimes = [
  ['Codex', 'project หรือ user skill directory'],
  ['Claude Code', 'project หรือ user skill directory'],
  ['Hermes', 'user profile หรือ project + skills.external_dirs'],
  ['Agent Skills', 'generic compatible runtime'],
];

const workflow = [
  'กำหนด category boundary และ evidence contract',
  'สร้าง material competitor universe ก่อนเลือก deep-dive set',
  'ทำ privacy-reduced Customer Voice โดยแยก raw research ออกจาก shareable output',
  'ตัดสินใจ Where to Play / How to Win และเขียน Strategic Plan',
  'แปลงกลยุทธ์เป็น Marketing Plan, budget, KPI, scenarios และ execution',
  'ตรวจ portability, privacy, evidence และ deterministic release ก่อนส่งมอบ',
];

export default function SkillPage() {
  return (
    <main className="skill-page">
      <header className="skill-nav">
        <Link href="/" className="brand-mark" aria-label="BizDrive Marketing Plan Lab home">
          <span className="brand-dot" />
          <span>BizDrive Plan Lab</span>
        </Link>
        <nav aria-label="Skill page navigation">
          <Link href="/toothpaste">ดู Worked Example</Link>
          <a href="#install">วิธีติดตั้ง</a>
        </nav>
      </header>

      <section className="skill-hero">
        <div>
          <p className="eyebrow">PORTABLE AGENT SKILL • STUDENT RELEASE</p>
          <span className="status-pill">Independent review passed</span>
          <h1>Strategic Marketing Plan{' '}<br /><em>Student Beta v0.9.0</em></h1>
          <p className="skill-lede">สร้าง Category Intelligence, explicit strategy choices, Strategic Plan ระดับแบรนด์/องค์กร และ Marketing Plan ที่เชื่อมถึงงบ KPI และ execution โดยไม่สร้างตัวเลขหรือหลักฐานขึ้นเอง</p>
          <div className="hero-actions">
            <a className="primary-button" href={downloadHref} download>ดาวน์โหลด Skill ZIP</a>
            <a className="secondary-button" href={checksumHref} download>ดาวน์โหลด SHA-256</a>
          </div>
        </div>
        <aside className="release-card" aria-label="Release verification">
          <p className="section-number">RELEASE VERIFICATION</p>
          <dl>
            <div><dt>Status</dt><dd>Approved for student distribution</dd></div>
            <div><dt>Version</dt><dd>0.9.0 Student Beta</dd></div>
            <div><dt>Tests</dt><dd>27/27 source + 27/27 extracted ZIP</dd></div>
            <div><dt>Archive</dt><dd>58 unique members • 1 manifest</dd></div>
            <div><dt>Review</dt><dd>Passed • 0 blockers</dd></div>
          </dl>
        </aside>
      </section>

      <section className="skill-section skill-runtime-section">
        <div className="section-intro">
          <p className="section-number">01 / COMPATIBILITY</p>
          <h2>หนึ่ง workflow หลาย agent runtimes</h2>
          <p>แพ็กเกจใช้ portable Agent Skills contract และไม่กล่าวอ้างว่าเป็น official Manus runtime หรือ official port</p>
        </div>
        <div className="runtime-grid">
          {runtimes.map(([runtime, note]) => (
            <article key={runtime}><span>SUPPORTED</span><h3>{runtime}</h3><p>{note}</p></article>
          ))}
        </div>
      </section>

      <section className="skill-section skill-dark">
        <div className="section-intro">
          <p className="section-number">02 / END-TO-END WORKFLOW</p>
          <h2>จาก category evidence ไปถึง owner decision</h2>
          <p>Premium Toothpaste Thailand เป็น worked example แบบ privacy-reduced/pseudonymized ไม่ใช่ fully anonymous และไม่ใช่ตัวแทนประชากรตลาดทั้งหมด</p>
        </div>
        <ol className="workflow-list">
          {workflow.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}
        </ol>
        <Link href="/toothpaste" className="skill-text-link">เปิด Worked Example ฉบับเต็ม →</Link>
      </section>

      <section className="skill-section" id="install">
        <div className="section-intro">
          <p className="section-number">03 / INSTALL</p>
          <h2>ดาวน์โหลด แตก ZIP แล้วใช้ installer ที่ให้มา</h2>
          <p>อ่าน <code>README.md</code> และ <code>INSTALL.md</code> ในแพ็กเกจก่อนติดตั้ง โดยเฉพาะ Hermes project scope ซึ่ง installer จะลงทะเบียน absolute project skill directory และยืนยันว่า <code>hermes skills list</code> ค้นพบชื่อ skill</p>
        </div>
        <div className="install-grid">
          <article>
            <span>EXAMPLE</span>
            <h3>Hermes project scope</h3>
            <pre><code>{`python3 scripts/install_skill.py \\\n  --runtime hermes \\\n  --scope project \\\n  --project-dir /path/to/project`}</code></pre>
          </article>
          <article>
            <span>SAFETY</span>
            <h3>Validation before use</h3>
            <pre><code>{`python3 scripts/validate_distribution.py . --release\npython3 -m unittest discover -s tests -v`}</code></pre>
          </article>
        </div>
      </section>

      <section className="skill-section skill-release">
        <div className="section-intro">
          <p className="section-number">04 / LICENSE & INTEGRITY</p>
          <h2>ตรวจไฟล์ก่อนแจกต่อ</h2>
          <p>Content, templates, references และ examples ใช้ CC BY-NC 4.0 ส่วน Python scripts และ tests ใช้ MIT ภายใต้ provenance และขอบเขตสิทธิ์ที่แนบในแพ็กเกจ</p>
        </div>
        <div className="integrity-card">
          <div><span>Content license</span><strong>CC BY-NC 4.0</strong></div>
          <div><span>Scripts & tests</span><strong>MIT</strong></div>
          <div className="hash-row"><span>SHA-256</span><code>{sha256}</code></div>
          <div className="release-actions">
            <a className="primary-button" href={downloadHref} download>{filename}</a>
            <a className="secondary-button" href={checksumHref} download>Checksum sidecar</a>
          </div>
        </div>
      </section>

      <footer className="site-footer skill-footer">
        <div><span className="brand-dot" /><strong>BizDrive Strategic Marketing Plan Skill</strong></div>
        <p>Student Beta v0.9.0 • Owner-authorized distribution • Publication does not authorize media spend, campaign launch or external outreach.</p>
      </footer>
    </main>
  );
}
