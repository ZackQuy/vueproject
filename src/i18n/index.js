import { messages_origin } from 'i18n/message'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
/**
 * messages 中的配置不能够被 i18n 直接使用， 因此这里需要对messages对象进行遍历重新构造
 *
 */
const messages = (msgs => {
  let lang_info = {
    zh: {},
    en: {},
    zf: {}
  }
  for (let msg_item in msgs) {
    ['zh', 'en', 'zf'].forEach(e => {
      if (msgs[msg_item][e]) {
        lang_info[e][msg_item] = msgs[msg_item][e]
      } else {
        lang_info[e][msg_item] = msg_item
      }
    })
  }
  return lang_info
})(messages_origin)


const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n
