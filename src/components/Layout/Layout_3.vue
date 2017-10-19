<template lang="html">

  <main>

    <!-- 自定义的组件统一用小写 中划线的方式  和 ElementUI 相统一 -->

    <nav-bar-login>

    </nav-bar-login>

    <div class="content content_login">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </main>

</template>

<script>
import NavBarLogin from 'components/NavBar/navbar_login.vue'

export default {
  data () {
    return {}
  },
  components: {
    NavBarLogin
  }
}
</script>

<style lang="scss">
</style>
