// Запускается после `nuxt generate`: строит sitemap.xml по реально собранным страницам,
// поэтому карта сайта всегда совпадает с тем, что выложено на хостинг.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://klinika-zdorovya.spb.ru';
const ROOT = '.output/public';
const SKIP = new Set(['_nuxt', '__nuxt_content', 'images']);

const urls = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!SKIP.has(name)) walk(full);
    } else if (name === 'index.html') {
      const rel = relative(ROOT, dir).split(sep).join('/');
      urls.push(rel === '' ? '/' : `/${rel}/`);
    }
  }
};
walk(ROOT);
urls.sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${urls.length} URL`);
