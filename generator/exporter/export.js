const { chromium } = require('playwright');

const URL    = process.env.CV_URL ?? 'http://cv:8000';
const OUTPUT = process.env.OUTPUT ?? '/output/cv.pdf';
const RETRIES = 15;

async function waitForCv(page) {
  for (let i = 0; i < RETRIES; i++) {
    try {
      await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 4000 });
      return;
    } catch {
      if (i === RETRIES - 1) throw new Error(`CV unreachable at ${URL}`);
      console.log(`Waiting for CV service... (${i + 1}/${RETRIES})`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page    = await browser.newPage();

  await waitForCv(page);
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log(`Exported → ${OUTPUT}`);
})();
