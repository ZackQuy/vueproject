// Notes: 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

export const USER_LOGIN = 'USER_LOGIN'
export const USER_FILTER_SHOW = 'USER_FILTER_SHOW'
export const USER_FILTER_HIDE = 'USER_FILTER_HIDE'
export const USER_FILTER_OPT = 'USER_FILTER_OPT'
export const USER_FILTER_DATA = 'USER_FILTER_DATA'
// 系统配置－玩偶组

// 当前运行玩偶组
export const STRATES_CUR_DATA = 'STRATES_CUR_DATA'

// 修改当前玩偶组
export const STRATES_LIST_DATA = 'STRATES_LIST_DATA'
export const STRATES_ACTIVE_ID = 'STRATES_ACTIVE_ID'
export const STRARES_POOL_LIST = 'STRARES_POOL_LIST'

export const STRATES_DETAILS = 'STRATES_DETAILS'
export const STRATES_EDIT = 'STRATES_EDIT'
// 新建玩偶
export const STRATES_DEVICE_LIST = 'STRATES_DEVICE_LIST'
export const STRATE_RULE_LIST = 'STRATE_RULE_LIST'
export const STRATE_DATARULE_LIST = 'STRATE_DATARULE_LIST'

// 划定设备
export const STRATE_DEVICE_CREATE = 'STRATES_DEVICE_CREATE'
// 数据上传规则
export const STRATE_DATA_UPLOAD_RAW = 'STRATE_DATA_UPLOAD_RAW'

// 自定义事件
export const EVENTS_LIST = 'EVENTS_LIST'

// 仿真监测__实时监测
export const REAL_MAIN_RENDER = 'REAL_MAIN_RENDER'
export const REAL_SELECT_OPT = 'REAL_SELECT_OPT'

// 仿真监测__攻击统计
export const CAL_MAIN_TYPE = 'CAL_MAIN_TYPE'
export const CAL_TREND = 'CAL_TREND'

// 首页
export const HOME_CHART_RENDER = 'HOME_CHART_RENDER'
