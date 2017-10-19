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
      <aside class="leftside">
        <transition name="fade_1" mode="out-in">
          <router-view name="sidebar"></router-view>
        </transition>
      </aside>
      <div class="dashboard">
        <div class="dashboard_bg" id="dashboard_bg"></div>
        <transition name="fade" mode="out-in">
          <router-view name="dashboard"></router-view>
        </transition>
      </div>


    </div>

  </main>


</template>

<script>
import NavBar from 'components/NavBar/navbar.vue'

import NavLink from 'components/NavBar/navlink.vue'

import GlobalFilter from 'components/NavBar/globalfilter.vue'

// import 'assets/js/particles'
//
// import particle_config from 'assets/json/particle_config.json'

export default {
  data () {
    return {}
  },
  components: {
    NavBar,
    NavLink,
    GlobalFilter
  },
  mounted () {
    // eslint-disable-next-line
    // particlesJS.load('dashboard_bg', particle_config)
  }
}
</script>

<style lang="scss">

.fade-leave-active {

  transition: .2s;

  transform: translateX(10px);
  opacity: 0;

}
.fade-leave /* .fade-leave-active in below version 2.1.8 */ {
  transition: .2s;
  transform: translateX(0px);
  opacity: 1;
}


.fade-enter {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-enter-active {
  transition: .2s;
}

.dashboard_bg {
  position: fixed;
  z-index: -1;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
}
</style>
