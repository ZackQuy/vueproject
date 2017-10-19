import * as types from 'store/mutation-types'
import router from 'router/router'
import { axios, fetch } from 'api/config'
import { note, valid } from 'assets/js/tool'

const state = {

  // 攻击趋势
  cal_main_trend: {
    datalist: [],
    xAxis: []
  },
  cal_main_type: {
    // 攻击统计
    cal_count: {
      risk_dev_count: 0,
      risk_count: 0,
      risk_dev_ratio: '0.00'
    },
    cal_location: null,
    cal_app_version: null,
    cal_os_version: null,
    cal_device: null
  }
}

const getters = {

}

const actions = {

  CalMainRender ({dispatch, commit}, params) {
    axios.all([
      fetch('/ccb/risk/event/attack/count', params),
      fetch('/ccb/risk/event/location/stat', params),
      fetch('/ccb/risk/event/app_version/stat', params),
      fetch('/ccb/risk/event/os_version/stat', params),
      fetch('/ccb/risk/event/manufacturer/stat', params),
      fetch('/ccb/risk/event/attack/trend', params)
    ])
      .then(axios.spread(
        (cal_count, cal_location, cal_app_version, cal_os_version, cal_device, cal_trend) => {
          commit(types.CAL_MAIN_TYPE, {
            cal_count: cal_count.data,
            cal_location: cal_location.data,
            cal_app_version: cal_app_version.data,
            cal_os_version: cal_os_version.data,
            cal_device: cal_device.data
          })
          commit(types.CAL_TREND, cal_trend.data)
        })
      )
      .catch((err) => {
        console.log(err)
      }
    )
  }

}

const mutations = {
  [types.CAL_TREND] (state, props) {
    state.cal_main_trend = props
  },
  [types.CAL_MAIN_TYPE] (state, props) {
    state.cal_main_type = props
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
