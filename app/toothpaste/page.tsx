import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToothpastePlan } from '@/components/toothpaste-plan';
import { getPlanBySlug } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'แผนการตลาดยาสีฟันพรีเมียม',
  description: 'Premium daily ritual × proof transparency — แผนวิจัย 10 แบรนด์, Customer Voice 100 records และแผน 12 ขั้น',
  alternates: {
    canonical: '/toothpaste',
  },
  openGraph: {
    title: 'แผนการตลาดยาสีฟันพรีเมียม',
    description: 'Premium daily ritual × proof transparency',
    images: ['/images/toothpaste/hero-ritual.svg'],
    type: 'article',
  },
};

export default function ToothpastePlanPage() {
  const plan = getPlanBySlug('ยาสีฟัน');
  if (!plan) notFound();
  return <ToothpastePlan plan={plan} />;
}
