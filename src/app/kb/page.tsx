import { NAV_STRUCTURE } from '@/lib/navigation'
import KBThreePanelLayout from '@/components/KBThreePanelLayout'

export default function KBHomePage() {
  // Serialize the navigation structure for the client component
  const categories = NAV_STRUCTURE.map(cat => ({
    id: cat.id,
    label: cat.label,
    labelZh: cat.labelZh,
    icon: cat.icon,
    items: cat.items.map(item => ({
      slug: item.slug,
      title: item.title,
    })),
  }))

  return <KBThreePanelLayout categories={categories} />
}
