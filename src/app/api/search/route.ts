import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SearchResult {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
}

function extractFrontmatter(content: string): { title: string; description: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { title: '', description: '' };
  const fm = match[1];
  const titleMatch = fm.match(/title:\s*['"]?(.+?)['"]?\s*$/);
  const descMatch = fm.match(/description:\s*['"]?(.+?)['"]?\s*$/);
  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : '',
  };
}

function getCategoryLabel(segment: string): string {
  const labels: Record<string, string> = {
    'getting-started': 'Getting Started',
    'dlp': 'DLP',
    'ucss': 'UCSS',
    'api': 'API Reference',
    'troubleshooting': 'Troubleshooting',
  };
  return labels[segment] || segment;
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
      const category = getCategoryLabel(baseSlug.split('/')[0] || '');
      
      const lowerQuery = query.toLowerCase();
      const lowerTitle = title.toLowerCase();
      const lowerDesc = description.toLowerCase();
      const lowerContent = content.toLowerCase();
      
      if (
        lowerTitle.includes(lowerQuery) ||
        lowerDesc.includes(lowerQuery) ||
        lowerContent.includes(lowerQuery)
      ) {
        results.push({
          title: title || item.replace(/\.mdx?$/, ''),
          slug,
          excerpt: description || content.replace(/^---[\s\S]*?---/, '').trim().slice(0, 150) + '...',
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
  
  return NextResponse.json({
    results: results.slice(0, 10),
    total: results.length,
    query,
  });
}
