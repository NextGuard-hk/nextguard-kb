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
    id: 'getting-started',
    label: 'Getting Started',
    labelZh: '快速入門',
    icon: 'rocket',
    items: [
      { slug: 'getting-started/what-is-nextguard', title: 'What is Nextguard?' },
      { slug: 'getting-started/product-list', title: 'Product Overview' },
      { slug: 'getting-started/quick-start', title: 'Quick Start Guide' },
    ]
  },
  {
    id: 'web-gateway',
    label: 'Web Security Gateway',
    labelZh: 'Web 安全閘道',
    icon: 'globe',
    items: [
      { slug: 'web-gateway/overview', title: 'Overview & Architecture' },
      { slug: 'web-gateway/deployment-inline', title: 'Inline Deployment' },
      { slug: 'web-gateway/deployment-explicit-proxy', title: 'Explicit Proxy Deployment' },
      { slug: 'web-gateway/deployment-transparent', title: 'Transparent Proxy Deployment' },
      { slug: 'web-gateway/deployment-reverse-proxy', title: 'Reverse Proxy Deployment' },
      { slug: 'web-gateway/ad-ldap-integration', title: 'AD / LDAP Integration' },
      { slug: 'web-gateway/policy-url-category', title: 'URL Category Policy' },
      { slug: 'web-gateway/policy-cloud-app', title: 'Cloud App Management' },
      { slug: 'web-gateway/logs-and-monitoring', title: 'Logs & User Monitoring' },
      { slug: 'web-gateway/troubleshooting', title: 'Troubleshooting' },
    ]
  },
  {
    id: 'email-gateway',
    label: 'Email Security Gateway',
    labelZh: 'Email 安全閘道',
    icon: 'mail',
    items: [
      { slug: 'email-gateway/overview', title: 'Overview & Architecture' },
      { slug: 'email-gateway/deployment-mta', title: 'MTA / MX Deployment' },
      { slug: 'email-gateway/policy-antivirus', title: 'Anti-Virus Policy' },
      { slug: 'email-gateway/policy-antispam', title: 'Anti-Spam Policy' },
      { slug: 'email-gateway/policy-antispoofing', title: 'Anti-Spoofing Policy' },
      { slug: 'email-gateway/quarantine-mail-trace', title: 'Quarantine & Mail Trace' },
      { slug: 'email-gateway/logs-reporting', title: 'Logs & Reporting' },
      { slug: 'email-gateway/troubleshooting', title: 'Troubleshooting' },
    ]
  },
  {
    id: 'dlp',
    label: 'DLP / MDLP',
    labelZh: '資料防洩漏',
    icon: 'shield',
    items: [
      { slug: 'dlp/overview', title: 'MDLP Overview — 5 DLP Channels' },
      { slug: 'dlp/network-dlp', title: 'Network DLP' },
      { slug: 'dlp/endpoint-dlp', title: 'Endpoint DLP' },
      { slug: 'dlp/email-dlp', title: 'Email DLP' },
      { slug: 'dlp/application-dlp', title: 'Application DLP' },
      { slug: 'dlp/mobile-dlp', title: 'Mobile DLP' },
      { slug: 'dlp/discovery', title: 'Data Discovery' },
      { slug: 'dlp/fingerprint-nlp-ocr', title: 'Detection Technologies (Fingerprint/NLP/OCR/ML)' },
      { slug: 'dlp/industry-templates', title: 'Industry Templates' },
    ]
  },
  {
    id: 'ucss',
    label: 'UCSS Management Platform',
    labelZh: 'UCSS 管理平台',
    icon: 'settings',
    items: [
      { slug: 'ucss/overview', title: 'Platform Overview' },
      { slug: 'ucss/initial-setup', title: 'Initial Setup & Licensing' },
      { slug: 'ucss/device-management', title: 'Device Management' },
      { slug: 'ucss/account-role-management', title: 'Account & Role Management' },
      { slug: 'ucss/ha-setup', title: 'HA (High Availability) Deployment' },
      { slug: 'ucss/health-monitoring', title: 'Health Monitoring' },
      { slug: 'ucss/scheduled-reports', title: 'Scheduled Reports' },
      { slug: 'ucss/troubleshooting', title: 'Troubleshooting' },
    ]
  },
  {
    id: 'faq',
    label: 'FAQ',
    labelZh: '常見問題',
    icon: 'help-circle',
    items: [
      { slug: 'faq/web-faq', title: 'Web Gateway FAQ' },
      { slug: 'faq/email-faq', title: 'Email Gateway FAQ' },
      { slug: 'faq/dlp-faq', title: 'DLP FAQ' },
      { slug: 'faq/ucss-faq', title: 'UCSS FAQ' },
    ]
  },
  {
    id: 'release-notes',
    label: 'Release Notes',
    labelZh: '版本更新',
    icon: 'file-text',
    items: [
      { slug: 'release-notes/v3-15', title: 'v3.15 Release Notes' },
      { slug: 'release-notes/known-issues', title: 'Known Issues' },
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
