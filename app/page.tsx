import Link from 'next/link';
import { getPlanIndex } from '@/lib/plans';

export default function HomePage() {
  const plans = getPlanIndex();
  return (
    <main className="index-page">
      <header className="index-header">
        <p className="eyebrow">BIZDRIVE • MARKETING PLAN LAB</p>
        <h1>แผนการตลาดที่ตรวจสอบย้อนกลับได้</h1>
        <p className="lede">พื้นที่รวมแผนจำลองเชิงกลยุทธ์ ข้อมูล คู่แข่ง Customer Voice งบ และ execution system</p>
      </header>
      <section className="plan-index" aria-label="Marketing plans">
        {plans.map((plan) => (
          <Link className="plan-index-card" href={plan.route} key={plan.slug}>
            <span className="status-pill">Research trial</span>
            <h2>{plan.title}</h2>
            <p>{plan.primaryWinningZone}</p>
            <dl>
              <div><dt>ราคา</dt><dd>{plan.priceThb.toLocaleString('th-TH')} บาท</dd></div>
              <div><dt>งบรวม</dt><dd>{plan.totalBudgetThb.toLocaleString('th-TH')} บาท</dd></div>
              <div><dt>ระยะเวลา</dt><dd>{plan.durationMonths} เดือน</dd></div>
            </dl>
            <span className="text-link">เปิดแผนฉบับเต็ม →</span>
          </Link>
        ))}
        <Link className="plan-index-card skill-index-card" href="/skill">
          <span className="status-pill">Student Beta v0.9.0</span>
          <h2>Strategic Marketing Plan Skill</h2>
          <p>ดาวน์โหลด portable Agent Skill พร้อม worked example, installer, validation และ dual license</p>
          <span className="text-link">เปิดหน้าดาวน์โหลด →</span>
        </Link>
      </section>
    </main>
  );
}
