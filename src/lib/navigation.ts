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
      { slug: 'seg/jiami-waifa-huizong', title: 'KB-加密外发汇总' },
      { slug: 'seg/seg-celue-lanjie', title: 'KB-SEG策略拦截相关' },
      { slug: 'seg/seg-renzheng', title: 'SEG认证' },
    ]
  },
  {
    id: 'cloud-ng',
    label: 'Cloud-NG',
    labelZh: 'Cloud-NG',
    icon: 'globe',
    items: [
      { slug: 'cloud-ng/cloud-ng-overview', title: 'Cloud-NG概览' },
      { slug: 'cloud-ng/cloud-ng-mta', title: 'Cloud-NG MTA配置' },
    ]
  },
  {
    id: 'ucss',
    label: 'UCSS',
    labelZh: 'UCSS',
    icon: 'settings',
    items: [
      { slug: 'ucss/ucss-overview', title: 'UCSS概览' },
      { slug: 'ucss/ucss-shenhe-shenpi', title: '审核-审批-邮件工作流区别' },
      { slug: 'ucss/ucss-shenpi-tongzhi', title: 'UCSS审批通知排查' },
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
      { slug: 'ucss-02/ucss-02-yemian-denglu', title: 'UCSS页面登录与验证码' },
      { slug: 'ucss-02/ucss-02-xitong-jiankang', title: '系统健康状态' },
      { slug: 'ucss-02/ucss-02-denglu-renzheng', title: '登录认证相关' },
      { slug: 'ucss-02/ucss-02-zifu-xianshi', title: '字符限制相关' },
      { slug: 'ucss-02/ucss-02-yemian-502', title: '页面502' },
      { slug: 'ucss-02/ucss-02-nginx-yichang', title: 'nginx异常相关' },
      { slug: 'ucss-02/ucss-02-shouquan-license', title: 'license基础知识' },
      { slug: 'ucss-02/ucss-02-license-guoqi', title: 'license许可到期/过期' },
      { slug: 'ucss-02/ucss-02-hexinshu-chaoxian', title: '核心数超限案例' },
      { slug: 'ucss-02/ucss-02-chushihua-baocuo', title: '初始化特别久或者初始化报错' },
      { slug: 'ucss-02/ucss-02-deviceid-zhuce', title: 'deviceid显示正常但注册不上' },
      { slug: 'ucss-02/ucss-02-daoru-shouquan-shibai', title: 'KB6-导入授权文件失败(Appliance)' },
      { slug: 'ucss-02/ucss-02-shouquan-shebei-bupipei', title: 'KB7-授权设备类型不匹配' },
      { slug: 'ucss-02/ucss-02-shouquan-zhengshu-wuxiao', title: 'KB8-授权证书未找到/无效' },
      { slug: 'ucss-02/ucss-02-hexinshu-bupipei', title: 'KB9-核心数不匹配' },
      { slug: 'ucss-02/ucss-02-deviceid-yichang', title: 'KB10-device-id异常/不可设置' },
      { slug: 'ucss-02/ucss-02-shouquanchi-shibai', title: 'KB11-授权池文件导入失败' },
      { slug: 'ucss-02/ucss-02-license-xinghao-buconsistent', title: 'KB12-license型号不一致' },
      { slug: 'ucss-02/ucss-02-ucwi-shouquan-queshi', title: 'KB13-ucwi授权文件缺失' },
            { slug: 'ucss-02/ucss-02-wangye-404-oom', title: '网页404(OOM)' },
            { slug: 'ucss-02/ucss-02-baogao-tupian-baocun-shibai', title: '报告图片保存失败' },
            { slug: 'ucss-02/ucss-02-rizhi-shouji-shibai', title: '日志收集失败' },
            { slug: 'ucss-02/ucss-02-hotfix-buding-anzhuang', title: 'hotfix补丁安装相关' },
            { slug: 'ucss-02/ucss-02-mingzhong-celue-guanjianzi', title: '命中策略关键字显示' },
            { slug: 'ucss-02/ucss-02-laiyuan-mubiao-zidian-guoduo', title: '来源目标字典过多' },
            { slug: 'ucss-02/ucss-02-qkact-api', title: 'API-快速操作接口' },
      { slug: 'ucss-02/ucss-02-api-zhongduan-zhuangtai', title: 'API-终端状态查询' },
      { slug: 'ucss-02/ucss-02-zhongduan-jiankong-api', title: 'API-终端监控列表' },
      { slug: 'ucss-02/ucss-02-youjian-toudi-api', title: 'API-邮件投递查询' },
      { slug: 'ucss-02/ucss-02-zhengju-xiazai-api', title: 'API-证据下载接口' },
      { slug: 'ucss-02/ucss-02-aswg-shenpi-api', title: 'API-ASWG审批接口' },
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
      { slug: 'bushu-11/bushu-11-anzhuang-zhinan', title: '部署安装指南' },
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
      { slug: 'kehu-18/kehu-18-anli', title: '客户案例' },
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
