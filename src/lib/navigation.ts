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
      { slug: 'web-gateway/cloud-ng-configuration', title: 'Cloud-NG云网关配置' },
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
      { slug: 'email-gateway/seg-policy-and-authentication', title: 'SEG策略拦截与认证' },
      { slug: 'email-gateway/email-encryption-overview', title: '邮件加密外发汇总' },
      { slug: 'email-gateway/api-encrypted-release', title: '隔离后API加密释放记录' },
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
      { slug: 'dlp/endpoint-installation-guides', title: '终端安装包定制指南' },
      { slug: 'dlp/custom-endpoint-package', title: '定制终端包' },
      { slug: 'dlp/endpoint-hidden-msi-package', title: 'WIN终端全隐MSI安装包制作' },
      { slug: 'dlp/endpoint-labels', title: '终端标签管理指南' },
      { slug: 'dlp/endpoint-client-customization', title: '终端客户端标识自定义配置' },
      { slug: 'dlp/endpoint-win-reference', title: 'Windows终端参考手册' },
      { slug: 'dlp/endpoint-app-specific', title: '终端应用程序DLP配置' },
      { slug: 'dlp/endpoint-approval', title: '终端审批功能' },
      { slug: 'dlp/endpoint-binding', title: '终端绑定' },
      { slug: 'dlp/endpoint-browser-plugins', title: '终端浏览器插件' },
      { slug: 'dlp/endpoint-port-conflict', title: '解决与天擎或亿赛通端口冲突' },
      { slug: 'dlp/port-conflict-resolution', title: '解决与天擎或亿赛通端口冲突' },
      { slug: 'dlp/endpoint-usb-control', title: '终端USB管控与唯一U盘' },
      { slug: 'dlp/endpoint-offline-troubleshooting', title: '终端离线问题定位' },
      { slug: 'dlp/endpoint-process-properties', title: '终端进程属性配置' },
      { slug: 'dlp/endpoint-url-classification', title: '终端URL分类' },
      { slug: 'dlp/endpoint-lag-troubleshooting', title: '终端卡顿问题排查' },
      { slug: 'dlp/endpoint-advanced-troubleshooting', title: '终端高级故障排查' },
      { slug: 'dlp/endpoint-linux', title: 'Linux终端' },
      { slug: 'dlp/endpoint-mac', title: 'Mac终端部署与管理指南' },
      { slug: 'dlp/endpoint-ocr-testing', title: '终端OCR功能测试指南' },
      { slug: 'dlp/endpoint-misc-troubleshooting', title: '终端杂项故障排查指南' },
      { slug: 'dlp/endpoint-uuid-issues', title: '终端UUID问题排查' },
      { slug: 'dlp/endpoint-screenshot-troubleshooting', title: '终端截屏保存不生效排查' },
      { slug: 'dlp/endpoint-print-troubleshooting', title: '终端打印相关排查' },
      { slug: 'dlp/endpoint-watermark-config', title: '终端水印去秒方法並生成安装包' },
      { slug: 'dlp/endpoint-whitelist-troubleshooting', title: '终端白名单与策略解密' },
      { slug: 'dlp/screenshot-save-troubleshooting', title: '截屏保存不生效' },
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
      { slug: 'ucss/approval-workflow', title: '审核审批与邮件工作流' },
      { slug: 'ucss/traffic-logs', title: 'UCSS流量日志' },
      { slug: 'ucss/user-behavior-logs', title: 'UCSS用户行为日志' },
      { slug: 'ucss/email-logs-troubleshooting', title: 'UCSS邮件日志故障排查' },
      { slug: 'ucss/event-evidence', title: 'UCSS事件证据管理' },
      { slug: 'ucss/evidence-troubleshooting', title: 'UCSS证据故障排查' },
      { slug: 'ucss/troubleshooting', title: 'Troubleshooting' },
    ]
  },
  {
    id: 'database',
    label: 'Database',
    labelZh: '數據庫',
    icon: 'database',
    items: [
      { slug: 'database/postgresql-overview', title: '01.PG数据库' },
      { slug: 'database/gaussdb-overview', title: '01.Gauss数据库' },
      { slug: 'database/important-tables', title: '02.重要的表' },
      { slug: 'database/sqlite-overview', title: '03.SQLite/自定义组织架构表' },
      { slug: 'database/pg-es-backup-restore', title: '04.PG/ES手动备份恢复' },
      { slug: 'database/case-ucss-remote-storage-error', title: '案例2-UCSS保存远程存储报错' },
      { slug: 'database/case-query-terminal-info', title: '案例3-读取后台数据库查询终端信息' },
      { slug: 'database/case-ucss-terminal-monitoring-db-access', title: '案例4-UCSS终端监控列表开放PG数据' },
      { slug: 'database/case-pg-create-account-permissions', title: '案例5-PG数据库创建账号开放权限' },
      { slug: 'database/case-org-sender-policy-no-approval', title: '案例6-组织机构发件人命中策略无审批' },
      { slug: 'database/case-ucss-wrong-auth-ip', title: '案例7-UCSS加错授信IP修改方法' },
      { slug: 'database/case-ucss-public-network-communication', title: '案例8-UCSS公网通信' },
      { slug: 'database/case-modify-fingerprint-threshold', title: '案例9-修改指纹相似度阈值' },
      { slug: 'database/kb-weak-password', title: 'KB-数据库弱密码修改方法' },
      { slug: 'database/db-connection-error', title: '数据库连接异常' },
      { slug: 'database/elasticsearch-overview', title: '02.ES数据库' },
      { slug: 'database/kb-es-readonly-solution', title: 'KB-ES只读解决办法' },
      { slug: 'database/kb-es-entity-too-large', title: 'KB-ES报Entity Too Large解决办法' },
      { slug: 'database/es-endpoint-event-fields-query', title: '终端事件字段详情及ES查询' },
      { slug: 'database/kb-es-external-access', title: 'KB-开放ES对外访问' },
      { slug: 'database/kb-aseg-device-replace-email', title: 'KB-ASEG设备替换后无法获取邮件原文' },
      { slug: 'database/kb-log-network-events-unavailable', title: 'KB-日志和网络事件无法查看' },
      { slug: 'database/kb-ucss-manual-write-events-to-es', title: 'KB-UCSS手动写入事件到ES' },
      { slug: 'database/kb-es-health-yellow-red', title: 'KB-ES健康度Yellow/Red解决' },
      { slug: 'database/case-es-log-network-events-unavailable', title: '15-日志和网络事件无法查看' },
      { slug: 'database/es-api-query', title: '08-Elasticsearch接口查询' },
      { slug: 'database/es-lock-table-troubleshooting', title: '36-ES多次锁表原因定位' },
      { slug: 'database/kb-pg-es-external-access-permission', title: 'KB-开启PG/ES外部访问权限' },
      { slug: 'database/es-head-visualization', title: '28-ES-Head可视化查看' },
      { slug: 'database/encryption-storage', title: '加解密及存储方式' },
      { slug: 'database/kb-visualization-service', title: 'KB-可视化服务' },
      { slug: 'database/kb-backup-progress-stuck-spe', title: 'KB-备份进度条卡在SPE环节' },
      { slug: 'database/bulk-email-log-export', title: '01-海量邮件日志导出方法' },
      { slug: 'database/redis-overview', title: '03.REDIS数据库' },
      { slug: 'database/redis-common-commands', title: 'Redis常用命令' },
      { slug: 'database/kb-redis-queue-query', title: 'KB-Redis堆积查询汇总' },
      { slug: 'database/kb-redis-clear-cache', title: 'KB-手动清除缓存方法' },
      { slug: 'database/mysql-overview', title: '04.MYSQL' },
      { slug: 'database/kb-mysql-restart-deploy', title: 'KB-MYSQL无法启动重启部署' },
      { slug: 'database/kb-mysql-scan-connection-fail', title: 'KB-MySQL扫描连接数据源失败' },
      { slug: 'database/case-mysql-change-password', title: '案例-修改MySQL密码方法' },
      { slug: 'database/kb-mysql-container-restart', title: '03-MySQL容器不断重启' },
      { slug: 'database/kafka-overview', title: '05.Kafka' },
      { slug: 'database/dameng-overview', title: '06.达梦数据库' },
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
