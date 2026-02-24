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

export const NAV_STRUCTURE: NavCategory[] = [
  {
    id: 'bangong',
    label: '办公',
    labelZh: '办公',
    icon: 'briefcase',
    items: [
      { slug: 'bangong/bangong-overview', title: '办公概览' },
    ]
  },
  {
    id: 'seg',
    label: 'SEG',
    labelZh: 'SEG',
    icon: 'mail',
    items: [
      { slug: 'seg/seg-overview', title: 'SEG概览' },
    ]
  },
  {
    id: 'cloud-ng',
    label: 'Cloud-NG',
    labelZh: 'Cloud-NG',
    icon: 'globe',
    items: [
      { slug: 'cloud-ng/cloud-ng-overview', title: 'Cloud-NG概览' },
    ]
  },
  {
    id: 'ucss',
    label: 'UCSS',
    labelZh: 'UCSS',
    icon: 'settings',
    items: [
      { slug: 'ucss/ucss-overview', title: 'UCSS概览' },
    ]
  },
  {
    id: 'shujuku',
    label: '数据库',
    labelZh: '数据库',
    icon: 'database',
    items: [
      { slug: 'shujuku/shujuku-overview', title: '数据库概览' },
    ]
  },
  {
    id: 'zhongduan-new',
    label: '终端new',
    labelZh: '终端new',
    icon: 'monitor',
    items: [
      { slug: 'zhongduan-new/zhongduan-new-overview', title: '终端new概览' },
    ]
  },
  {
    id: 'zhongduan',
    label: '终端',
    labelZh: '终端',
    icon: 'shield',
    items: [
      { slug: 'zhongduan/zhongduan-overview', title: '终端概览' },
    ]
  },
  {
    id: 'ucss-02',
    label: '02.UCSS',
    labelZh: '02.UCSS',
    icon: 'server',
    items: [
      { slug: 'ucss-02/ucss-02-overview', title: '02.UCSS概览' },
    ]
  },
  {
    id: 'app-04',
    label: '04.APP',
    labelZh: '04.APP',
    icon: 'layout',
    items: [
      { slug: 'app-04/app-04-overview', title: '04.APP概览' },
    ]
  },
  {
    id: 'spe-05',
    label: '05.SPE',
    labelZh: '05.SPE',
    icon: 'cpu',
    items: [
      { slug: 'spe-05/spe-05-overview', title: '05.SPE概览' },
    ]
  },
  {
    id: 'dsg-06',
    label: '06.DSG',
    labelZh: '06.DSG',
    icon: 'shield',
    items: [
      { slug: 'dsg-06/dsg-06-overview', title: '06.DSG概览' },
    ]
  },
  {
    id: 'seg-07',
    label: '07.SEG',
    labelZh: '07.SEG',
    icon: 'mail',
    items: [
      { slug: 'seg-07/seg-07-overview', title: '07.SEG概览' },
    ]
  },
  {
    id: 'aswg-08',
    label: '08.ASWG',
    labelZh: '08.ASWG',
    icon: 'globe',
    items: [
      { slug: 'aswg-08/aswg-08-overview', title: '08.ASWG概览' },
    ]
  },
  {
    id: 'ucwi-09',
    label: '09.UCWI',
    labelZh: '09.UCWI',
    icon: 'monitor',
    items: [
      { slug: 'ucwi-09/ucwi-09-overview', title: '09.UCWI概览' },
    ]
  },
  {
    id: 'itm-10',
    label: '10.ITM',
    labelZh: '10.ITM',
    icon: 'activity',
    items: [
      { slug: 'itm-10/itm-10-overview', title: '10.ITM概览' },
    ]
  },
  {
    id: 'mag-11',
    label: '11.MAG',
    labelZh: '11.MAG',
    icon: 'bar-chart',
    items: [
      { slug: 'mag-11/mag-11-overview', title: '11.MAG概览' },
    ]
  },
  {
    id: 'bushu-11',
    label: '11.部署',
    labelZh: '11.部署',
    icon: 'package',
    items: [
      { slug: 'bushu-11/bushu-11-overview', title: '11.部署概览' },
    ]
  },
  {
    id: 'tesao-14',
    label: '14.特扫',
    labelZh: '14.特扫',
    icon: 'search',
    items: [
      { slug: 'tesao-14/tesao-14-overview', title: '14.特扫概览' },
    ]
  },
  {
    id: 'kehu-18',
    label: '18.客户',
    labelZh: '18.客户',
    icon: 'users',
    items: [
      { slug: 'kehu-18/kehu-18-overview', title: '18.客户概览' },
    ]
  },
]

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
