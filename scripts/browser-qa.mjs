import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const chromeCandidates = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];
const executablePath = process.env.CHROME_EXECUTABLE_PATH ?? chromeCandidates.find(existsSync);
if (!executablePath) throw new Error('Chrome executable not found; set CHROME_EXECUTABLE_PATH.');

const baseURL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:3100';
const routes = process.env.QA_ROUTE ? [process.env.QA_ROUTE] : ['/toothpaste', '/skill'];
const outputDir = path.join(process.cwd(), 'qa', 'screenshots');
await mkdir(outputDir, { recursive: true });

const profiles = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'tablet-breakpoint', width: 1101, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];
const results = [];
const browser = await chromium.launch({ executablePath, headless: true });

try {
  for (const route of routes) {
    const routeName = route.replace(/^\//, '') || 'home';
    for (const profile of profiles) {
      const context = await browser.newContext({
        viewport: { width: profile.width, height: profile.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const consoleErrors = [];
      const failedResponses = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('response', (response) => {
        if (response.status() >= 400) failedResponses.push({ url: response.url(), status: response.status() });
      });

      const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
      const images = page.locator('img');
      for (let index = 0; index < await images.count(); index += 1) {
        await images.nth(index).scrollIntoViewIfNeeded();
        await images.nth(index).waitFor({ state: 'visible' });
      }
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, 0));

      const metrics = await page.evaluate(() => {
        const overflowing = [...document.querySelectorAll('body *')]
          .map((element) => ({
            tag: element.tagName,
            className: typeof element.className === 'string' ? element.className : '',
            left: element.getBoundingClientRect().left,
            right: element.getBoundingClientRect().right,
          }))
          .filter((item) => item.left < -1 || item.right > window.innerWidth + 1)
          .slice(0, 20);
        return {
          title: document.title,
          h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
          imageCount: document.images.length,
          brokenImages: [...document.images]
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.src),
          bodyText: document.body.innerText,
          viewportWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflowing,
          internalLinks: [...new Set([...document.querySelectorAll('a[href]')]
            .map((anchor) => anchor.getAttribute('href'))
            .filter((href) => href?.startsWith('/')))],
        };
      });

      await page.screenshot({
        path: path.join(outputDir, `${routeName}-${profile.name}.png`),
        fullPage: false,
      });
      const linkChecks = [];
      for (const href of metrics.internalLinks) {
        const linkResponse = await context.request.get(`${baseURL}${href}`);
        linkChecks.push({ href, status: linkResponse.status() });
      }

      const failures = [];
      if (response?.status() !== 200) failures.push(`route status ${response?.status()}`);
      if (metrics.brokenImages.length) failures.push(`${metrics.brokenImages.length} broken images`);
      if (metrics.scrollWidth > metrics.viewportWidth + 1) {
        failures.push(`horizontal overflow ${metrics.scrollWidth}px > ${metrics.viewportWidth}px`);
      }
      if (route === '/toothpaste') {
        if (!metrics.title.includes('ยาสีฟัน')) failures.push('missing title');
        if (!metrics.h1?.includes('ยาสีฟันพรีเมียม')) failures.push('missing h1');
        if (metrics.imageCount < 14) failures.push(`only ${metrics.imageCount} images`);
        if (!metrics.bodyText.includes('Customer Voice ทั้ง 100 records')) failures.push('missing full Customer Voice disclosure');
        if (!metrics.bodyText.includes('Evidence ledger ทั้ง 41 รายการ')) failures.push('missing full evidence disclosure');
        if (!metrics.bodyText.includes('ข้อมูลทั้งหมด Steps 00–12')) failures.push('missing full plan library');
      }
      if (route === '/skill') {
        if (!metrics.title.includes('Student Beta')) failures.push('missing skill title');
        if (!metrics.h1?.includes('Strategic Marketing Plan Student Beta v0.9.0')) failures.push('missing skill h1');
        if (!metrics.bodyText.includes('Independent review passed')) failures.push('missing review status');
        if (!metrics.bodyText.includes('CC BY-NC 4.0')) failures.push('missing content license');
        if (!metrics.bodyText.includes('2f36245d86ec459f541c64afe37a11ebc8578fc9d52ccbac8b0589843df7683c')) {
          failures.push('missing reviewed checksum');
        }
      }
      const badLinks = linkChecks.filter((link) => link.status >= 400);
      if (badLinks.length) failures.push(`broken internal links: ${JSON.stringify(badLinks)}`);
      if (failedResponses.length) failures.push(`failed responses: ${JSON.stringify(failedResponses)}`);
      if (consoleErrors.length) failures.push(`console errors: ${consoleErrors.join(' | ')}`);

      results.push({
        route,
        profile: profile.name,
        status: response?.status(),
        ...metrics,
        bodyText: undefined,
        internalLinks: undefined,
        linkChecks,
        failedResponses,
        consoleErrors,
        failures,
      });
      await context.close();
    }
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.failures.length)) process.exit(1);
