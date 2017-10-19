import * as types from 'store/mutation-types'
import router from 'router/router'
import { axios, fetch } from 'api/config'
import { note, valid } from 'assets/js/tool'

const state = {
  // 玩偶组列表
  results_groups: [],
  active_group: 0,
  info_groups: {
    // 然而这里需要分页岂不尴尬
    page_cur: 0,
    page_total: 0,
    data_total: 0,
    data_perpage: 0
  },

  // 当前玩偶组信息
  cur_strateInfo: {
    name: '',
    start_time: ''
  },
  results_curgroups: [],
  info_curgroups: {
    // 然而这里不需要分页岂不尴尬
    page_cur: 0,
    page_total: 0,
    data_total: 0,
    data_perpage: 0
  },

  strates_pool: [],
  strates_edit: [],
  strates_edit_name: '',

  strates_pool_info: {
    // 然而这里需要分页岂不尴尬
    page_cur: 0,
    page_total: 0,
    data_total: 0,
    data_perpage: 0
  },

  // 新建玩偶部分
  strate_device_list: [],
  strate_rule_list: [],
  strate_datarule_list: [],

  // 新建划定设备
  strate_device_create: {
    location: [],
    os_version: [],
    app_version: [],
    manufacturer: []
  },

  // 新建数据上传 玩偶
  strate_data_upload_raw: {
    eventlist: [],
    rulelist: [],
    event_id: null
  },

  // 玩偶组详情
  strates_details: {
    strate_list: [],
    strate_info: {
      name: ''
    }
  }

}

const getters = {
}

const actions = {
  // addCustomerGroup ({dispatch, commit}, {params}) {
  //   permissionManager.addCustomerGroup({params})
  //     .then(successMsg => {
  //       const fileds = {
  //         page: state.currPage,
  //         name: state.keywords
  //       }
  //       commit(types.SUCCESS_PERMISSION, {successMsg})
  //       dispatch('getCustomerGroup', fileds)
  //       dispatch('electUpdate')
  //     })
  //     .catch(errorMsg => {
  //       commit(types.ERROR_PERMISSION, {errorMsg})
  //     })
  // },

  // 获取当前运行玩偶组列表
  stratesCur ({dispatch, commit}) {
    fetch('/ccb/tactics_group/current')
      .then(res => {
        commit(types.STRATES_CUR_DATA, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 获取玩偶组列表
  stratesList ({dispatch, commit}) {
    fetch('/ccb/tactics_group')
      .then(res => {
        commit(types.STRATES_LIST_DATA, res)
        commit(types.STRATES_ACTIVE_ID, res.data.datalist[0] && res.data.datalist[0].id)
      })
  },

  // 获取玩偶池列表
  stratesPool ({dispatch, commit}, params) {
    fetch('/ccb/tactics/list')
      .then(res => {
        commit(types.STRARES_POOL_LIST, res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 新建玩偶组
  stratesCreate ({dispatch, commit}, params) {

    fetch('/ccb/tactics_group/create', params)
      .then(res => {
        // 新建成功之后弹窗提示并且跳转到玩偶组列表
        note({
          message: '新建玩偶组成功',
          type: 'success'
        })
        router.push({
          path: '/config/strates_chg'
        })
      })
      .catch(err => {
        // 提示新建失败
        console.log(err)
      })
  },

  // 启动玩偶组
  stratesStart ({dispatch, commit}, params) {
    if (state.results_groups.length === 0) {
      note({
        message: '暂无可用的玩偶组',
        type: 'info'
      })
    } else if (params.id === state.results_groups[0].id) {
      note({
        message: '当前玩偶组正在启用中',
        type: 'info'
      })
    } else {
      fetch('/ccb/tactics_group/start', params)
        .then(res => {
          note({
            message: '启用玩偶组成功',
            type: 'success'
          })
          dispatch('stratesList')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  // 玩偶组详情
  stratesDetail ({dispatch, commit}, params) {
    fetch('/ccb/tactics_group/detail', params)
      .then(res => {
        // 赋值
        commit(types.STRATES_DETAILS, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 玩偶组编辑__获得玩偶列表
  stratesEdit ({dispatch, commit}, params) {
    fetch('/ccb/tactics_group/detail', params)
      .then(res => {
        // 赋值
        commit(types.STRATES_EDIT, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 玩偶组编辑__玩偶列表保存

  stratesEditSave ({dispatch, commit}, params) {
    fetch('/ccb/tactics_group/edit', params)
      .then(res => {
        // 赋值
        note({
          message: '编辑玩偶组成功',
          type: 'success'
        })
        router.push({
          path: '/config/strates_chg'
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 删除玩偶组
  stratesDelete ({dispatch, commit}, params) {
    fetch('/ccb/tactics_group/del', params)
      .then(res => {
        note({
          message: '删除玩偶组成功',
          type: 'success'
        })
        dispatch('stratesList')
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_划定设备列表
  strateDeviceList ({dispatch, commit}, params) {
    fetch('/ccb/tactics/manufacturer_rule/list')
      .then(res => {
        commit(types.STRATES_DEVICE_LIST, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_玩偶更新规则
  strateRuleList ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_update_rule/list')
      .then(res => {
        commit(types.STRATE_RULE_LIST, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_数据上传玩偶
  strateDataruleList ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_upload_data_rule/list')
      .then(res => {
        commit(types.STRATE_DATARULE_LIST, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_玩偶生成接口
  strateCreate ({dispatch, commit}, params) {
    fetch('/ccb/tactics/create', params)
      .then(res => {
        // 新建成功之后弹窗提示并且跳转到玩偶组列表
        note({
          message: '新建玩偶成功',
          type: 'success'
        })
        router.push({
          path: '/config/strates_new'
        })
      })
      .catch(err => {
        // 提示新建失败
        console.log(err)
      })
  },

  // strate_device_create: {
  //   location: [],
  //   os_version: [],
  //   app_version: [],
  //   manufacturer: []
  // }

  strateDeviceRender ({dispatch, commit}, params) {
    // 新建玩偶_划定设备列表_地域列表
    // 新建玩偶_划定设备列表_品牌列表
    // 新建玩偶_划定设备列表_系统列表
    // 新建玩偶_划定设备列表_版本列表
    axios.all([
      fetch('/ccb/tactics/manufacturer/list'),
      fetch('/ccb/tactics/os_version/list'),
      fetch('/ccb/tactics/app_version/list'),
      fetch('/ccb/tactics/location/list')
    ])
      .then(axios.spread(function (manufacturer, os_version, app_version, location) {
        commit(types.STRATE_DEVICE_CREATE, {
          location: location.data.datalist,
          os_version: os_version.data.datalist,
          app_version: app_version.data.datalist,
          manufacturer: manufacturer.data.datalist
        })
      }))
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_划定设备列表_创建
  strateDeviceCreate ({dispatch, commit}, params) {
    fetch('/ccb/tactics/manufacturer_rule/create', params)
      .then(res => {
        note({
          message: '新建划定设备成功',
          type: 'success'
        })
        router.push({
          path: '/config/strate_new'
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_划定设备列表_删除
  strateDeviceDelele ({dispatch, commit}, params) {
    fetch('/ccb/tactics/manufacturer_rule/delete', params)
      .then(res => {
        note({
          message: '删除划定设备成功',
          type: 'success'
        })
        dispatch('strateDeviceList')
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_新建玩偶更新规则
  strateUpdateCreate ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_update_rule/create', params)
      .then(res => {
        note({
          message: '新建玩偶更新规则成功',
          type: 'success'
        })
        router.push({
          path: '/config/strate_new'
        })
      })
  },

  // 新建玩偶_玩偶更新规则_删除
  strateUpdateDelele ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_update_rule/delete', params)
      .then(res => {
        note({
          message: '删除玩偶更新规则成功',
          type: 'success'
        })
        dispatch('strateRuleList')
      })
      .catch(err => {
        console.log(err)
      })
  },

  strateDataRender ({dispatch, commit}, params) {
    // 新建玩偶_数据上传玩偶_事件类型列表
    // 新建玩偶_数据上传玩偶_数据上传规则列表

    axios.all([
      fetch('/ccb/tactics/tactics_upload_data/risk_types/list'),
      fetch('/ccb/tactics/tactics_upload_data/list')
    ])
      .then(axios.spread(function (eventlist, rulelist) {
        commit(types.STRATE_DATA_UPLOAD_RAW, {
          eventlist: eventlist.data.datalist,
          rulelist: rulelist.data.datalist,
          event_id: eventlist.data.event_id
        })
      }))
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_新建数据上传玩偶的保存
  strateDataCreate ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_upload_data_rule/create', params)
      .then(res => {
        note({
          message: '新建数据上传玩偶成功',
          type: 'success'
        })
        router.push({
          path: '/config/strate_new'
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_数据上传玩偶_删除
  strateDataDelele ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_upload_data_rule/delete', params)
      .then(res => {
        note({
          message: '删除数据上传玩偶成功',
          type: 'success'
        })
        dispatch('strateDataruleList')
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 新建玩偶_新建数据上传玩偶_玩偶下数据上传规则创建
  strateDataUploadRule ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_upload_data/create', params)
      .then(res => {
        note({
          message: '新建数据上传规则成功',
          type: 'success'
        })
        router.push({
          path: '/config/strate_data'
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  strateDataUploadRuleDelete ({dispatch, commit}, params) {
    fetch('/ccb/tactics/tactics_upload_data/delete', params)
      .then(res => {
        note({
          message: '删除数据上传规则成功',
          type: 'success'
        })
        dispatch('strateDataRender')
      })
      .catch(err => {
        console.log(err)
      })
  }

}

const mutations = {

  [types.STRATES_CUR_DATA] (state, props) {
    state.results_curgroups = props.data.datalist
    state.cur_strateInfo.name = props.data.name
    state.cur_strateInfo.start_time = props.data.start_time
  },

  [types.STRATES_LIST_DATA] (state, props) {
    state.results_groups = [...props.data.datalist]
  },

  [types.STRATES_ACTIVE_ID] (state, props) {
    state.active_group = props
  },

  [types.STRATES_DETAILS] (state, props) {
    state.strates_details.strate_list = props.data.datalist
    state.strates_details.strate_info.name = props.data.name
  },

  [types.STRARES_POOL_LIST] (state, props) {
    state.strates_pool = props.data.datalist.map((e, i) => {
      e.is_active = false
      return e
    })
  },

  [types.STRATES_EDIT] (state, props) {
    state.strates_edit = props.data.datalist.map((e, i) => {
      e.is_active = false
      return e
    })
    state.strates_edit_name = props.data.name
  },

  [types.STRATES_DEVICE_LIST] (state, props) {
    state.strate_device_list = props.data.datalist
  },

  [types.STRATE_RULE_LIST] (state, props) {
    state.strate_rule_list = props.data.datalist
  },

  [types.STRATE_DATARULE_LIST] (state, props) {
    state.strate_datarule_list = props.data.datalist.map((e, i) => {
      e.status = 0
      return e
    })
  },

  [types.STRATE_DEVICE_CREATE] (state, props) {
    state.strate_device_create = props
  },

  [types.STRATE_DATA_UPLOAD_RAW] (state, props) {
    state.strate_data_upload_raw = props
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
