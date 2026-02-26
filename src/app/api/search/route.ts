import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  'bangong': '办公',
  'products': '产品',
  'seg': 'SEG',
  'cloud-ng': 'Cloud-NG',
  'ucss': 'UCSS',
  'shujuku': '数据库',
  'zhongduan': '终端',
  'app': 'APP',
  'spe': 'SPE',
  'dsg': 'DSG',
  'aswg': 'ASWG',
  'ucwi': 'UCWI',
  'itm': 'ITM',
  'mag': 'MAG',
  'bushu': '部署',
  'tesao': '特殊操作',
  'kehu': '客户',
};

function extractFrontmatter(content: string): { title: string; description: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { title: '', description: '' };
  const fm = match[1];
  const titleMatch = fm.match(/title:\s*['"]?(.+?)['"]?\s*$/m);
  const descMatch = fm.match(/description:\s*['"]?(.+?)['"]?\s*$/m);
  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : '',
  };
}

function searchFiles(dir: string, query: string, baseSlug: string = ''): SearchResult[] {
  const results: SearchResult[] = [];

  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subSlug = baseSlug ? `${baseSlug}/${item}` : item;
      results.push(...searchFiles(fullPath, query, subSlug));
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { title, description } = extractFrontmatter(content);
      const slug = baseSlug ? `${baseSlug}/${item.replace(/\.mdx?$/, '')}` : item.replace(/\.mdx?$/, '');
      const segment = baseSlug.split('/')[0] || '';
      const category = CATEGORY_LABELS[segment] || segment;

      const lowerQuery = query.toLowerCase();
      const lowerTitle = title.toLowerCase();
      const lowerDesc = description.toLowerCase();
      const lowerContent = content.toLowerCase();

      if (
        lowerTitle.includes(lowerQuery) ||
        lowerDesc.includes(lowerQuery) ||
        lowerContent.includes(lowerQuery)
      ) {
        const bodyContent = content.replace(/^---[\s\S]*?---/, '').trim();
        const cleanExcerpt = bodyContent
          .replace(/^#+\s+.*$/gm, '')
          .replace(/```[\s\S]*?```/g, '')
          .replace(/[#*`>\-|]/g, '')
          .trim()
          .slice(0, 120);

        results.push({
          title: title || item.replace(/\.mdx?$/, ''),
          slug,
          excerpt: description || cleanExcerpt + '...',
          category,
        });
      }
    }
  }

  return results;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const contentDir = path.join(process.cwd(), 'src', 'content', 'kb');
  const results = searchFiles(contentDir, query);

  // Sort: title matches first, then description, then content
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
    const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
    return aTitle - bTitle;
  });

  return NextResponse.json({
    results: results.slice(0, 20),
    total: results.length,
    query,
  });
}
