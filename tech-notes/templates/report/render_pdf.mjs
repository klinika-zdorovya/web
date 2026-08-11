// Рендерит собранный HTML-отчёт (после build.py) в PDF через локальный Chrome.
// Использование: node render_pdf.mjs <input.html> <output.pdf>
// Требует пакет playwright (npm install в этой папке) и установленный
// Google Chrome (используется системный браузер, channel: 'chrome').

import { chromium } from 'playwright';
import path from 'path';

const [, , inputArg, outputArg] = process.argv;
if (!inputArg || !outputArg) {
  console.error('Использование: node render_pdf.mjs <input.html> <output.pdf>');
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
await page.goto('file://' + inputPath, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log('Готово:', outputPath);
