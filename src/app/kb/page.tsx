import { NAV_STRUCTURE } from '@/lib/navigation'
import KBHomeContent from './KBHomeContent'

export default function KBHomePage() {
  const categories = NAV_STRUCTURE.map(cat => ({
    id: cat.id,
    label: cat.label,
    labelZh: cat.labelZh,
    itemCount: cat.items.length,
  }))
  const totalArticles = NAV_STRUCTURE.reduce((sum, cat) => sum + cat.items.length, 0)

  return <KBHomeContent categories={categories} totalArticles={totalArticles} />
}
