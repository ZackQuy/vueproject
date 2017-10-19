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
          lnk: '/analy/realtime',
          text: '实时监测'
          // child: [
          //   {
          //     lnk: "/config/stratery",
          //     text: "策略配置",
          //   },{
          //     lnk: "/config/events",
          //     text: "自定义事件",
          //   }
          // ]
        }, {
          lnk: '/analy/calculate',
          text: '攻击统计'
        }
      ],
      SIGNS: {

      },
      default_active: '/analy/realtime'
    }
  },
  watch: {
    '$route': function (val) {
      this.default_active = this.SIGNS[this.$router.currentRoute.fullPath] || this.$router.currentRoute.fullPath
    }
  },
  mounted () {
    this.default_active = this.SIGNS[this.$router.currentRoute.fullPath] || this.$router.currentRoute.fullPath
  }
}
</script>

<style lang="scss">
</style>
