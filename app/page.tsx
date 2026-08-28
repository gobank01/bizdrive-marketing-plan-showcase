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
        <div className="plan-index-card future-card" aria-label="Future plans placeholder">
          <span className="status-pill neutral">Next</span>
          <h2>แผนถัดไป</h2>
          <p>โครงเว็บรองรับการเพิ่มหน้าใหม่ด้วย route แยก</p>
        </div>
      </section>
    </main>
  );
}
