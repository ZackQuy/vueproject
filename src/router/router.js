// .
// ├── analyrisk
// │   ├── calculate.vue
// │   └── realtime.vue
// ├── config
// │   └── upstream_manage
//
// │       ├── event.vue
// │       └── stratery.vue
// ├── everisk
// │   └── index.vue
// ├── home
// │   ├── index.vue
// │   └── modules
// │       ├── baidumap.vue
// │       └── sideboard.vue
// └── login.vue
import VueRouter from 'vue-router'

// Layout 和 SideBar 直接加载， 剩余部分懒加载
// 引入 Layout
import Layout_1 from 'components/Layout/Layout_1'
import Layout_2 from 'components/Layout/Layout_2'
import Layout_3 from 'components/Layout/Layout_3'

// 引入 SideBar
import Config_side from 'components/SideBar/config'
import Analyrisk_side from 'components/SideBar/analyrisk'
// import Everisk_side from 'components/SideBar/everisk'

// 引入不同页面

// 登陆模块
const Login = resolve => require(['views/login'], resolve)

// 首页
const Home = resolve => require(['views/home/index'], resolve)

// 威胁感知
// const Everisk = resolve => require(['views/Everisk/index'], resolve)

// 威胁分析
const Calculate = resolve => require(['views/analyrisk/calculate'], resolve)
const Realtime = resolve => require(['views/analyrisk/realtime'], resolve)

// 系统配置
// 系统配置_上行流量控制
const Events = resolve => require(['views/config/upstream_manage/events'], resolve)
const EventsCreate = resolve => require(['views/config/upstream_manage/events/events_create'], resolve)

const Stratery = resolve => require(['views/config/upstream_manage/stratery'], resolve)
const Strates_chg = resolve => require(['views/config/upstream_manage/stratery/strates_chg'], resolve)
const Strates_new = resolve => require(['views/config/upstream_manage/stratery/strates_new'], resolve)
const Strate_new = resolve => require(['views/config/upstream_manage/stratery/strate_new'], resolve)

const Strates_details = resolve => require(['views/config/upstream_manage/stratery/strates_details'], resolve)
const Strates_edit = resolve => require(['views/config/upstream_manage/stratery/strates_edit'], resolve)
const Strate_device = resolve => require(['views/config/upstream_manage/stratery/strate_device'], resolve)
const Strate_rule = resolve => require(['views/config/upstream_manage/stratery/strate_rule'], resolve)
const Strate_data = resolve => require(['views/config/upstream_manage/stratery/strate_data'], resolve)
const Strate_datarule_new = resolve => require(['views/config/upstream_manage/stratery/strate_data_rule_new'], resolve)

const routers = [

  {
    path: '/', redirect: '/home'
  },
  {
    path: '/home',
    component: Layout_2,
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        component: Home,
        name: '威胁概况'

      }
    ]

  },
  {
    path: '/analy',
    component: Layout_1,
    children: [
      {
        path: '', redirect: 'realtime'
      },
      {
        path: 'realtime',
        components: { dashboard: Realtime, sidebar: Analyrisk_side },
        name: '实时监测'
      },
      {
        path: 'calculate',
        components: { dashboard: Calculate, sidebar: Analyrisk_side },
        name: '攻击统计'
      }
    ]
  },

  {
    path: '/config',
    component: Layout_1,
    children: [
      {
        path: '', redirect: 'stratery'
      },
      {
        path: 'stratery',
        components: { dashboard: Stratery, sidebar: Config_side },
        name: '当前运行策略组'
      },
      {
        path: 'strates_chg',
        components: { dashboard: Strates_chg, sidebar: Config_side },
        name: '更改策略组'
      },
      {
        path: 'strates_new',
        components: { dashboard: Strates_new, sidebar: Config_side },
        name: '新建策略组'
      },
      {
        path: 'strates_details',
        components: { dashboard: Strates_details, sidebar: Config_side },
        name: '策略组详情'
      },
      {
        path: 'strates_edit',
        components: { dashboard: Strates_edit, sidebar: Config_side },
        name: '策略组编辑'
      },
      {
        path: 'strate_new',
        components: { dashboard: Strate_new, sidebar: Config_side },
        name: '新建策略'
      },
      {
        path: 'strate_device',
        components: { dashboard: Strate_device, sidebar: Config_side },
        name: '新建划定设备'
      },
      {
        path: 'strate_rule',
        components: { dashboard: Strate_rule, sidebar: Config_side },
        name: '新建策略更新规则'
      },
      {
        path: 'strate_data',
        components: { dashboard: Strate_data, sidebar: Config_side },
        name: '新建数据上传策略'
      },
      {
        path: 'strate_datarule_new',
        components: { dashboard: Strate_datarule_new, sidebar: Config_side },
        name: '新建数据上传规则'
      },
      {
        path: 'events',
        components: { dashboard: Events, sidebar: Config_side },
        name: '自定义事件'
      },
      {
        path: 'events_create',
        components: { dashboard: EventsCreate, sidebar: Config_side },
        name: '自定义事件创建'
      }
    ]
  },

  {
    path: '/user',
    component: Layout_3,
    children: [
      {
        path: '', redirect: 'login'
      },
      {
        path: 'login',
        component: Login,
        name: '登陆'
      }
    ]
  },
  {
    path: '/*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: routers
})

// 这部分是做登录验证的js
// 当后期引入复杂的权限控制之后， 这一部分可以作为一个模块单独引入

router.beforeEach((to, from, next) => {
  let login_status = window.localStorage.getItem('__login__')

  if (to.fullPath !== '/user/login') {
    if (login_status === 'ok') {
      next()
    } else {
      next({
        path: '/user/login'
      })
    }
  } else {
    next()
  }
})

export default router

//
