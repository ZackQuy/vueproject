import { Message } from 'element-ui'

/**
 * [Note description]
 * @param {object} prop [这个参数为Message的配置项目, 可直接传入需要提示的信息] 
 */
const note = (prop) => {
  Message.closeAll()
  Message(prop)
}

// 数据的校验规则 传入数据
// this.$valid([
//   {valid: this.strates_info.name, msg: '请输入策略组名称'},
//   {valid: this.strates_info.ids.length, msg: '请至少选择一组策略'}
// ])
const valid = (props) => {
  return new Promise((resolve, reject) => {
    let valid_item = props.find(e => !e.valid)

    if (valid_item) {
      note({
        message: valid_item.msg,
        type: 'warning'
      })
    } else {
      resolve()
    }
  })
}

const rules = {
  // 各类数字字母下划线汉字的校验
  name_rule: (str) => {
    return new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$", "g").test(str)
  },
  // 纯数字的校验
  num_rule: (str) => {
    return new RegExp("^[0-9]*[1-9][0-9]*$", "g").test(Number(str))
  },
  // 邮箱的校验
  main_rule: (str) => {
    // return new RegExp("\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}")
  }
}


// format 日期格式化
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
const format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export {
  note,
  valid,
  rules,
  format
}
