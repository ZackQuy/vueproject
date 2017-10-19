import * as types from 'store/mutation-types'
// import router from 'router/router'
import {fetch, axios} from 'api/config'

const state = {
  map: [],
  count: {
    pie_inner: [],
    pie_outer: []
  },
  start: {
    timeList: [],
    numList: []
  },
  abnor: [],
  real: [],
  local: {
    locationList: [],
    numList: []
  }
}

const getters = {
}

const actions = {

  // HomeChartRender ({dispatch, commit}, params){
  //
  //   axios.all([
  //     fetch('/ccb/index/map'),
  //     fetch('/ccb/index/event/count'),
  //     fetch('/ccb/index/start_trend'),
  //     fetch('/ccb/index/active_devices'),
  //     fetch('/ccb/index/last_start/list'),
  //     fetch('/ccb/index/location/stat')
  //   ])
  //
  //     .then(axios.spread((map, count, start, abnor, real, local) => {
  //
  //       commit(types.HOME_CHART_RENDER, {
  //         map, count, start, abnor, real, local
  //       })
  //
  //     }))
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  HomeChartRender ({dispatch, commit}, params) {
    axios.all([
      fetch('/ccb/index/map'),
      fetch('/ccb/index/event/count'),
      fetch('/ccb/index/start_trend'),
      // fetch('/ccb/index/active_devices'),
      // fetch('/ccb/index/last_start/list'),
      fetch('/ccb/index/location/stat')
    ])

      .then(axios.spread((map, count, start, local) => {
        commit(types.HOME_CHART_RENDER, {
          map, count, start, local
        })
      }))
      .catch(err => {
        console.log(err)
      })
  }

}


const mutations = {
  // [types.HOME_CHART_RENDER] (state, { map, count, start, abnor, real, local }){
  //   state.map = map.data.datalist
  //   // 双扇形图的数据
  //   state.count = count.data.pie_list
  //   // 每日启动趋势
  //   state.start = start.data
  //   // 活跃异常设备
  //   state.abnor = abnor.data.datalist
  //   // 实时运行监测
  //   real.data.datalist.push({})
  //
  //   state.real = real.data.datalist
  //   // 地理分布趋势
  //   state.local = local.data
  // }

  // 这一部分是活跃异常设备 和  实时运行监测
  [types.HOME_CHART_RENDER] (state, { map, count, start, local }) {
    state.map = map.data.datalist
    // 双扇形图的数据
    state.count = count.data.pie_list
    // 每日启动趋势
    state.start = start.data
    // 活跃异常设备
    // state.abnor = abnor.data.datalist
    // 实时运行监测
    // real.data.datalist.push({})

    // state.real = real.data.datalist
    // 地理分布趋势
    state.local = local.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
