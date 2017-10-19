<template lang="html">
  <!-- <div class="head_nav">

  </div> -->


  <div class="head_link">
    <el-row justify="center" align="middle" :gutter="20">
      <el-col :span="4" :offset="4">
        <router-link to="/home" tag="div" class="nav_item">首页</router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/analy" tag="div" class="nav_item">威胁分析</router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/config" tag="div" class="nav_item">系统配置</router-link>
      </el-col>
    </el-row>
  </div>


</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
