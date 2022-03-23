const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs/promises');
const ejs = require('ejs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
  });
  const page = await browser.newPage();

  const pdfTemplateFilePath = path.resolve(__dirname, 'assets', 'index.ejs');

  const pdfTemplateFileContent = await fs.readFile(pdfTemplateFilePath, 'utf8');

  const renderedPdf = ejs.render(pdfTemplateFileContent, {
    text: 'سلام به همه ویرگولیای گل :)',
  });

  await page.goto(`file://${pdfTemplateFilePath}`);
  await page.setContent(renderedPdf);

  await page.pdf({
    path: path.resolve(__dirname, 'pdfs', 'generated.pdf'),
  });

  await browser.close();
})();
