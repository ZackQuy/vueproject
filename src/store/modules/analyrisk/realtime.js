import * as types from 'store/mutation-types'
import router from 'router/router'
import { axios, fetch } from 'api/config'
import { note, valid } from 'assets/js/tool'

const state = {
  real_render_data: {
    real_top_bar: {
      risk_count: 0,
      risk_dev_count: 0,
      risk_dev_ratio: '0.00'
    },
    real_bot_bar: {
      risk_count: 0,
      risk_dev_count: 0,
      risk_dev_ratio: '0.00'
    },
    real_top_list: Array(10).fill({}),
    real_bot_list: Array(10).fill({})
  },

  real_select_opt: {

    manufacturer_datalist: [],
    location_data_list: [],
    location_attention: '',
    manufacturer_attention: ''
  }
}

const getters = {
}

const actions = {

  // RealA

  RealSelectOpt ({dispatch, commit}, params) {
    fetch('/ccb/risk/event/select/list')
      .then(res => {
        commit(types.REAL_SELECT_OPT, res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  RealSelectChange ({dispatch, commit}, params) {
    fetch('/ccb/risk/event/select/update', params)
      .then(res => {
        dispatch('RealMainRender')
      })
      .catch(err => {
        console.log(err)
      })
  },

  RealMainRender ({dispatch, commit}, params) {
    axios.all([
      fetch('/ccb/risk/event/all/count'),
      fetch('/ccb/risk/event/list'),
      fetch('/ccb/risk/event/attention/count'),
      fetch('/ccb/risk/event/attention/list')
    ])

      .then(axios.spread((real_top_bar, real_top_list, real_bot_bar, real_bot_list) => {
        const real_top_list_10 = Array(10).fill({}).map((e, i) => {
          return real_top_list.data.datalist[i] ? real_top_list.data.datalist[i] : {}
        })

        const real_bot_list_10 = Array(10).fill({}).map((e, i) => {
          return real_bot_list.data.datalist[i] ? real_bot_list.data.datalist[i] : {}
        })

        commit(types.REAL_MAIN_RENDER, {
          real_top_bar: real_top_bar.data,
          real_top_list: real_top_list_10,
          real_bot_bar: real_bot_bar.data,
          real_bot_list: real_bot_list_10
        })
      }))
      .catch(err => {
        console.log(err)
      })
  }

}

const mutations = {

  [types.REAL_MAIN_RENDER] (state, props) {
    state.real_render_data = props
  },

  [types.REAL_SELECT_OPT] (state, props) {
    state.real_select_opt = props.data
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
