<template lang="html">
  <el-menu :unique-opened="true" :default-active="default_active" class="sidenav_forms" :router="true" theme="dark">
    <template v-for="(link, index) in LINKS">
      <template v-if="link.child">
        <el-submenu :index="link.lnk" class="sub_nav">
          <template slot="title">{{link.text}}</template>
          <template v-for="item in link.child">

            <el-menu-item :index="item.lnk">
              <span class="sidenav_dot"></span>
              {{item.text}}
            </el-menu-item>
          </template>
        </el-submenu>

      </template>
      <template v-else>
        <el-menu-item :index="link.lnk">{{link.text}}</el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      LINKS: [
        {
          lnk: '/config',
          text: '上行流量控制',
          child: [
            {
              lnk: '/config/stratery',
              text: '策略组列表'
            }, {
              lnk: '/config/events',
              text: '自定义事件'
            }
          ]
        }
      ],
      SIGNS: {
        '/config/strates_chg': '/config/stratery',
        '/config/strates_new': '/config/stratery',
        '/config/strate_new': '/config/stratery',
        '/config/strate_device': '/config/stratery',
        '/config/strate_rule': '/config/stratery',
        '/config/strate_data': '/config/stratery',
        '/config/strates_edit': '/config/stratery',
        '/config/strates_details': '/config/stratery',
        '/config/strate_datarule_new': '/config/stratery',
        '/config/events_create': '/config/events'
      },
      default_active: '/config/stratery'
    }
  },
  watch: {
    '$route': function (val) {
      this.default_active = this.SIGNS[this.$router.currentRoute.path] || this.$router.currentRoute.path
    }
  },
  mounted () {
    this.default_active = this.SIGNS[this.$router.currentRoute.path] || this.$router.currentRoute.path
  }
}
</script>

<style lang="scss">
</style>
