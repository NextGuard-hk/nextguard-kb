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
    id: 'database',
    label: 'Database',
    labelZh: '數據庫',
    icon: 'database',
    items: [
      { slug: 'database/postgresql-overview', title: '01.PG數據庫' },
      { slug: 'database/gaussdb-overview', title: '01.Gauss數據庫' },
      { slug: 'database/important-tables', title: '02.重要的表' },
      { slug: 'database/sqlite-overview', title: '03.SQLite/自定義組織架構表' },
      { slug: 'database/pg-es-backup-restore', title: '04.PG/ES手動備份恢復' },
      { slug: 'database/case-ucss-remote-storage-error', title: '案例2-UCSS保存遠程存儲報錯' },
      { slug: 'database/case-query-terminal-info', title: '案例3-讀取後台數據庫查詢終端信息' },
      { slug: 'database/case-ucss-terminal-monitoring-db-access', title: '案例4-UCSS終端監控列表開放PG數據' },
      { slug: 'database/case-pg-create-account-permissions', title: '案例5-PG數據庫創建賬號開放權限' },
      { slug: 'database/case-org-sender-policy-no-approval', title: '案例6-組織機構發件人命中策略無審批' },
      { slug: 'database/case-ucss-wrong-auth-ip', title: '案例7-UCSS加錯授信IP修改方法' },
      { slug: 'database/case-ucss-public-network-communication', title: '案例8-UCSS公網通信' },
      { slug: 'database/case-modify-fingerprint-threshold', title: '案例9-修改指紋相似度閾值' },
      { slug: 'database/kb-weak-password', title: 'KB-數據庫弱密碼修改方法' },
      { slug: 'database/db-connection-error', title: '數據庫連接異常' },
      { slug: 'database/elasticsearch-overview', title: '02.ES數據庫' },
      { slug: 'database/kb-es-readonly-solution', title: 'KB-ES只讀解決辦法' },
      { slug: 'database/kb-es-entity-too-large', title: 'KB-ES報Entity Too Large解決辦法' },
      { slug: 'database/es-endpoint-event-fields-query', title: '終端事件字段詳情及ES查詢' },
      { slug: 'database/kb-es-external-access', title: 'KB-開放ES對外訪問' },
      { slug: 'database/kb-aseg-device-replace-email', title: 'KB-ASEG設備替換後無法獲取郵件原文' },
      { slug: 'database/kb-log-network-events-unavailable', title: 'KB-日誌和網絡事件無法查看' },
      { slug: 'database/kb-ucss-manual-write-events-to-es', title: 'KB-UCSS手動寫入事件到ES' },
      { slug: 'database/kb-es-health-yellow-red', title: 'KB-ES健康度Yellow/Red解決' },
      { slug: 'database/case-es-log-network-events-unavailable', title: '15-日誌和網絡事件無法查看' },
      { slug: 'database/es-api-query', title: '08-Elasticsearch接口查詢' },
      { slug: 'database/es-lock-table-troubleshooting', title: '36-ES多次鎖表原因定位' },
      { slug: 'database/kb-pg-es-external-access-permission', title: 'KB-開啟PG/ES外部訪問權限' },
      { slug: 'database/es-head-visualization', title: '28-ES-Head可視化查看' },
      { slug: 'database/encryption-storage', title: '加解密及存儲方式' },
      { slug: 'database/kb-visualization-service', title: 'KB-可視化服務' },
      { slug: 'database/kb-backup-progress-stuck-spe', title: 'KB-備份進度條卡在SPE環節' },
      { slug: 'database/bulk-email-log-export', title: '01-海量郵件日誌導出方法' },
      { slug: 'database/redis-overview', title: '03.REDIS數據庫' },
      { slug: 'database/redis-common-commands', title: 'Redis常用命令' },
      { slug: 'database/kb-redis-queue-query', title: 'KB-Redis堆積查詢匯總' },
      { slug: 'database/kb-redis-clear-cache', title: 'KB-手動清除緩存方法' },
      { slug: 'database/mysql-overview', title: '04.MYSQL' },
      { slug: 'database/kb-mysql-restart-deploy', title: 'KB-MYSQL無法啟動重啟部署' },
      { slug: 'database/kb-mysql-scan-connection-fail', title: 'KB-MySQL掃描連接數據源失敗' },
      { slug: 'database/case-mysql-change-password', title: '案例-修改MySQL密碼方法' },
      { slug: 'database/kb-mysql-container-restart', title: '03-MySQL容器不斷重啟' },
      { slug: 'database/kafka-overview', title: '05.Kafka' },
      { slug: 'database/dameng-overview', title: '06.達夢數據庫' },
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
