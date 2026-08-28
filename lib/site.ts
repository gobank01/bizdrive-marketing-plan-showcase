const FALLBACK_SITE_ORIGIN = 'https://bizdrive-marketing-plan.vercel.app';

export const SITE_ORIGIN = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_ORIGIN,
).origin;
