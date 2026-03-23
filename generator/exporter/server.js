const { chromium } = require('playwright');
const http = require('http');

const CV_URL = process.env.CV_URL ?? 'http://cv:8000';
const PORT   = 3000;

async function exportPdf() {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  await page.emulateMedia({ media: 'print' });
  await page.goto(CV_URL, { waitUntil: 'networkidle' });

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  return pdf;
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET') { res.writeHead(405); res.end(); return; }

  if (req.url === '/health') { res.writeHead(200); res.end('ok'); return; }

  if (req.url !== '/export') { res.writeHead(404); res.end(); return; }

  try {
    console.log('Exporting PDF...');
    const pdf = await exportPdf();
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="cv.pdf"',
      'Content-Length': pdf.length,
    });
    res.end(pdf);
    console.log('Done.');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end(err.message);
  }
});

server.listen(PORT, () => console.log(`Exporter ready → http://localhost:${PORT}`));
