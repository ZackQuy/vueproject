<template lang="html">

<div class="head_bar">


  <div class="logo">
    <img src="~assets/images/ccb_logo.png">
  </div>


  <div class="select_app">
    <el-select v-model="current_app" placeholder="请选择" size="small">
      <el-option
        v-for="item in applist"
        :key="item.value"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>


  <div class="global_search" @click="filter_query">
    <i class="head_icon iconfont icon-sousuo-sousuo"></i>
    <span class="head_font">搜索</span>
  </div>


  <div class="user_info">
    <i class="head_icon iconfont icon-iconfontyonghu"></i>
    <span class="head_font">{{userinfo.username}}</span>
  </div>



  <div class="logout">
    <i class="head_icon iconfont icon-exit" @click="logout"></i>
  </div>

</div>


</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {

  },
  computed: {
    ...mapGetters('userconfig', [
      'userinfo',
      'current_app',
      'applist'
    ])
  },
  methods: {
    logout () {
      // 这里是登出的逻辑 点击登出按钮的时候 通过confirm弹窗来确认用户的操作
      this.$confirm('请确认是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false,
        type: 'info'
      }).then(() => {
        this.$store.dispatch('userconfig/UserLogOut')
          .then(
            () => {
              window.localStorage.removeItem('__login__')
              this.$router.push({
                path: '/user/login'
              })
            }
          )
      }).catch(() => {
      })
    },

    filter_query () {
      this.$store.dispatch('userconfig/UserFilterReset')
    }
  }
}
</script>

<style lang="scss">



</style>
