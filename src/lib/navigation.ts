import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface NavItem {
  slug: string
  title: string
}

export interface NavCategory {
  id: string
  label: string
  labelZh: string
  icon: string
  items: NavItem[]
}

// Section config matching OneNote layout order
const SECTION_CONFIG: { id: string; label: string; labelZh: string; icon: string; dir: string }[] = [
  { id: 'bangong', label: '办公', labelZh: '办公', icon: 'briefcase', dir: 'bangong' },
  { id: 'products', label: '产品', labelZh: '产品', icon: 'package', dir: 'products' },
  { id: 'seg', label: 'SEG', labelZh: 'SEG', icon: 'mail', dir: 'seg' },
  { id: 'cloud-ng', label: 'Cloud-NG', labelZh: 'Cloud-NG', icon: 'globe', dir: 'cloud-ng' },
  { id: 'ucss', label: 'UCSS', labelZh: 'UCSS', icon: 'settings', dir: 'ucss' },
  { id: 'shujuku', label: '数据库', labelZh: '数据库', icon: 'database', dir: 'shujuku' },
  { id: 'zhongduan', label: '终端', labelZh: '终端', icon: 'shield', dir: 'zhongduan' },
  { id: 'app', label: 'APP', labelZh: 'APP管理平台', icon: 'layout', dir: 'app' },
  { id: 'spe', label: 'SPE', labelZh: 'SPE策略引擎', icon: 'cpu', dir: 'spe' },
  { id: 'dsg', label: 'DSG', labelZh: 'DSG数据安全网关', icon: 'shield', dir: 'dsg' },
  { id: 'aswg', label: 'ASWG', labelZh: 'ASWG安全Web网关', icon: 'globe', dir: 'aswg' },
  { id: 'ucwi', label: 'UCWI', labelZh: 'UCWI', icon: 'monitor', dir: 'ucwi' },
  { id: 'itm', label: 'ITM', labelZh: 'ITM', icon: 'activity', dir: 'itm' },
  { id: 'mag', label: 'MAG', labelZh: 'MAG', icon: 'bar-chart', dir: 'mag' },
  { id: 'bushu', label: '部署', labelZh: '部署', icon: 'server', dir: 'bushu' },
  { id: 'tesao', label: '特扫', labelZh: '特扫', icon: 'search', dir: 'tesao' },
  { id: 'kehu', label: '客户', labelZh: '客户案例', icon: 'users', dir: 'kehu' },
]

function scanSection(dir: string): NavItem[] {
  const contentDir = path.join(process.cwd(), 'src', 'content', 'kb', dir)
  if (!fs.existsSync(contentDir)) return []
  
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx')).sort()
  
  return files.map(file => {
    const filePath = path.join(contentDir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const slug = dir + '/' + file.replace('.mdx', '')
    return {
      slug,
      title: data.title || file.replace('.mdx', '').replace(/-/g, ' '),
    }
  })
}

function buildNavStructure(): NavCategory[] {
  return SECTION_CONFIG
    .map(sec => ({
      id: sec.id,
      label: sec.label,
      labelZh: sec.labelZh,
      icon: sec.icon,
      items: scanSection(sec.dir),
    }))
    .filter(cat => cat.items.length > 0)
}

export const NAV_STRUCTURE: NavCategory[] = buildNavStructure()

export function getCategoryById(id: string): NavCategory | undefined {
  return NAV_STRUCTURE.find(cat => cat.id === id)
}

export function getArticleBySlug(slug: string): { category: NavCategory; item: NavItem } | undefined {
  for (const category of NAV_STRUCTURE) {
    const item = category.items.find(i => i.slug === slug)
    if (item) return { category, item }
  }
  return undefined
}
