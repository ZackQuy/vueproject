import axios from 'axios'
import qs from 'qs'
import { note, valid } from 'assets/js/tool'
import i18n from 'i18n'
import router from 'router/router'

axios.defaults.baseURL = '/everisk/api/v3'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 拦截请求
 *    POST传参序列化
 */
axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data, {indices: false})
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


/**
 * 拦截返回
 *    1. 状态判断
 *        2 未登录
 *    2. 字段替换
 *        将后台传来的 all 字段替换为 全部
 *    3. 给 datalist 字段增加 _order 作为序号
 */
axios.interceptors.response.use(
  (res) => {
    if (res.data.code === 2) {
      note({
        message: i18n.t('用户未登录'),
        type: 'error'
      })
      router.push({
        path: '/user/login'
      })
      return Promise.reject(res)
    } else if (res.data.code !== 0) {
      note({
        message: i18n.t(res.data.msg),
        type: 'error'
      })
      return Promise.reject(res)
    } else {
      res = JSON.parse(JSON.stringify(res).replace(/all/g, '全部'))
      if (res.data && res.data.data && res.data.data.datalist) {
        res.data.data.datalist.map((e, i) => {
          if (typeof e === 'object') {
            e._order = String(i + 1).padStart(2, '0')
          }
          return e
        })
      }
      return res
    }
  },
  (error) => {
    note({
      message: '服务器响应失败',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

/**
 * [fetch description]
 * @param  {string} url    访问地址
 * @param  {object} params 访问参数
 * @return {Promise}        外部.then调用
 */
const fetch = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        // 替换 all 字段 为全部
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * [getmap description]
 * 访问百度地图API
 */
const getmap = () => {
  window.BMap_loadScriptTime = (new Date()).getTime()

  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=PHHWxBrD0tiFBrWZGfuoKmWksPfGhtka&services=&t=20170705114645'

    document.head.appendChild(script)

    script.onload = function () {
      // eslint-disable-next-line
      resolve(BMap)
    }
    script.onerror = reject
  })
}
// 输出ajax方法
export {
  fetch,
  axios,
  getmap
}

//
