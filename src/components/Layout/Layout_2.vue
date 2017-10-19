<template lang="html">

  <main>
    <!-- 自定义的组件统一用小写 中划线的方式  和 ElementUI 相统一 -->
    <nav-bar>
    </nav-bar>

    <nav-link>
    </nav-link>

    <global-filter>
    </global-filter>


    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </main>

</template>

<script>
import NavBar from 'components/NavBar/navbar'
import NavLink from 'components/NavBar/navlink'
import GlobalFilter from 'components/NavBar/globalfilter.vue'

export default {
  data () {
    return {}
  },
  components: {
    NavBar,
    NavLink,
    GlobalFilter
  }
}
</script>

<style lang="scss">
</style>
