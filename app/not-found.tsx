import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 • PLAN NOT FOUND</p>
      <h1>ยังไม่มีแผนใน route นี้</h1>
      <p>กลับไปหน้ารวมเพื่อเลือกแผนที่เผยแพร่แล้ว</p>
      <Link href="/">กลับหน้ารวม</Link>
    </main>
  );
}
