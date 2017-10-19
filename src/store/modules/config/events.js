import * as types from 'store/mutation-types'
import router from 'router/router'
import { axios, fetch } from 'api/config'
import { note, valid } from 'assets/js/tool'
const state = {

  // 卡通类型的中文映射关系
  event_reflect: {
    'emulator': '模拟器',
    'modify': '内存空间保护',
    'javahook': 'JavaHook',
    'soana': 'SO安全检测',
    'mockdev': '设备复用(篡改设备标识)',

    'attframe': '攻击框架市场',
    'chook': '系统函数Hook',
    'inject': '程序注入',
    'scandex': '位置欺诈市场',
    'root': '系统Root检测',
    'cheatdns': '域名欺诈市场'
  },
  // 自定义事件列表
  events_list: []
}

const getters = {

}

const actions = {

  // 自定义事件的列表
  EventsList ({dispatch, commit}) {
    fetch('/ccb/tactics/event/list')
      .then(res => {
        commit(types.EVENTS_LIST, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  EventsStart ({dispatch, commit}, params) {
    if (state.events_list.length === 0) {
      note({
        message: '暂无可用的自定义事件',
        type: 'info'
      })
    } else if (params.id === state.events_list[0].id) {
      note({
        message: '当前自定义事件正在启用中',
        type: 'info'
      })
    } else {
      fetch('/ccb/tactics/event/start', params)
        .then(res => {
          note({
            message: '启用自定义事件成功',
            type: 'success'
          })
          dispatch('EventsList')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  EventCreate ({dispatch, commit}, params) {
    fetch('/ccb/tactics/event/create', params)
      .then(res => {
        note({
          message: '创建自定义事件成功',
          type: 'success'
        })
        router.push({
          path: '/config/events'
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  EventDelete ({dispatch, commit}, params) {
    fetch('/ccb/tactics/event/delete', params)
      .then(res => {
        note({
          message: '删除自定义事件成功',
          type: 'success'
        })
        dispatch('EventsList')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {
  [types.EVENTS_LIST] (state, props) {
    state.events_list = props.data.datalist
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
