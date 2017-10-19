import Vue from 'vue'
import Vuex from 'vuex'

// 配置
import userconfig from './modules/common/userconfig'

// 威胁分析 攻击统计
import calculate from './modules/analyrisk/calculate'

// 威胁分析 实时监测
import realtime from './modules/analyrisk/realtime'

// 威胁感知 TODO 这个模块得拆
import everisk from './modules/everisk/everisk'

// 首页
import home from './modules/home/home'

// 配置 策略
import events from './modules/config/events'

// 配置 自定义事件
import stratery from './modules/config/stratery'

Vue.use(Vuex)


/**
 * Store
 * @type {object}
 * 使用 vuex-router-sync 将路由信息注册到 store 的根节点
 * 用户公共信息 储存在 userconfig 模块中
 */
export default new Vuex.Store({
  modules: {
    userconfig,
    calculate,
    realtime,
    everisk,
    home,
    events,
    stratery
  }
})
