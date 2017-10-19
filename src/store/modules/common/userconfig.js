import * as types from 'store/mutation-types'
import router from 'router/router'
import { axios, fetch } from 'api/config'
import { note, valid } from 'assets/js/tool'
import i18n from 'i18n'

const state = {

  userinfo: {
    username: window.localStorage.getItem('__username__')
  },
  user_authority: {
    license: []
  },
  current_app: 13,
  applist: [{
    id: 13,
    name: '建设银行'
  }],

  // 全局弹窗是否显示
  global_filter_show: false,

  // 全局搜索筛选条件配置
  global_filter_opt: {
    os_version_datalist: [],
    manufacturer_datalist: [],
    app_version_datalist: [],
    location_datalist: []
  },

  // 全局搜索结果
  global_filter_data: [

  ],

  // 全局搜索分页
  global_filter_page: {
    current_page: 1,
    total: 12
  },

  // 全局搜索事件的映射关系
  global_event_reflect: [
    {
      value: 'e_emulator',
      label: '模拟器'
    },
    {
      value: 'e_modify',
      label: '内存空间保护'
    },
    {
      value: 'e_javahook',
      label: 'javahook'
    },
    {
      value: 'e_soana',
      label: 'SO安全检测'
    },
    {
      value: 'e_mockdev',
      label: '设备复用(篡改设备标识)'
    },
    {
      value: 'e_attframe',
      label: '攻击框架分析'
    },
    {
      value: 'e_chook',
      label: '系统函数Hook'
    },
    {
      value: 'e_inject',
      label: '程序注入'
    },
    {
      value: 'e_scandex',
      label: '位置欺诈分析'
    },
    {
      value: 'e_root',
      label: '系统Root检测'
    },
    {
      value: 'e_cheatdns',
      label: '域名欺诈分析'
    }
  ],
  global_root: ['是', '否']
}

const getters = {

  current_app: state => state.current_app,
  userinfo: state => state.userinfo,
  applist: state => state.applist,
  global_filter_show: state => state.global_filter_show
}

const actions = {

  UserLogin ({dispatch, commit}, params) {

    fetch('/ccb/users/sign_in', params)
      .then(
        res => {
          if (res.code === 0) {
            commit(types.USER_LOGIN, res)
          } else {

          }
        }
      )
      .catch(err => {
        err
      })
  },

  UserLogOut ({dispatch, commit}, params) {
    fetch('/ccb/users/sign_out')
      .then(
        res => {
          router.push({
            path: '/user/login'
          })
        }
      )
  },

  // 向后台请求筛选条件
  UserFilterReset ({dispatch, commit}, params) {
    fetch('/ccb/risk/event/search/select')
      .then(
        res => {
          commit(types.USER_FILTER_OPT, res)
          commit(types.USER_FILTER_SHOW)
        }
      )
      .catch(err => {
        console.log(err)
      })
  },
  // 向后台发送筛选请求
  UserFilterQuery ({dispatch, commit}, params) {
    fetch('/ccb/risk/event/search/list', params)
      .then(
        res => {
          commit(types.USER_FILTER_DATA, res)
          if (!res.data.datalist.length) {
            note({
              message: '搜索结果为空, 请重新搜索',
              type: 'info'
            })
          }
        }
      )
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {

  [types.USER_LOGIN] (state, props) {
    state.userinfo.username = props.data.username
    window.localStorage.setItem('__login__', 'ok')
    window.localStorage.setItem('__username__', props.data.username)
    router.push({
      path: '/'
    })
  },

  // 弹窗显示
  [types.USER_FILTER_SHOW] (state, props) {
    state.global_filter_show = true
  },
  // 弹窗隐藏
  [types.USER_FILTER_HIDE] (state, props) {
    state.global_filter_show = false
  },
  // 向后台请求完筛选条件的赋值
  [types.USER_FILTER_OPT] (state, props) {
    state.global_filter_opt = {...props.data}
  },
  // 从后台拿到筛选数据之后的赋值
  [types.USER_FILTER_DATA] (state, props) {
    state.global_filter_data = props.data.datalist
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
