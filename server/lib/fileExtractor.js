import * as cheerio from 'cheerio';

export async function extractTextFromFile(file) {
  const name = file.originalname.toLowerCase();
  const buffer = file.buffer;

  if (name.endsWith('.pdf')) {
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  if (name.endsWith('.docx')) {
    const mammoth = await import('mammoth');
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  }

  if (name.endsWith('.html') || name.endsWith('.htm')) {
    const $ = cheerio.load(buffer.toString('utf-8'));
    $('script, style, nav, header, footer').remove();
    return $('body').text().replace(/\s+/g, ' ').trim();
  }

  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return buffer.toString('utf-8');
  }

  throw new Error('Unsupported file type. Please upload a PDF, DOCX, HTML, or TXT file.');
}
