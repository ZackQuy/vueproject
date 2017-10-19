<template lang="html">
  <div class="page_index">
    <div class="view_map" id="map_layer" v-bind:class="{paned_left: sidebar_open}">

    </div>
    <div class="view_aside" v-bind:class="{close: sidebar_open}">
      <div class="view_aside_arrow" @click="sidebar_open = !sidebar_open">
      </div>
      <div class="dash_box dash_box_1">
        <div class="side_top_bar">
          <div class="side_top_bar_title active">
            事件分布趋势
          </div>
        </div>
        <div class="side_inner">

          <transition name="dash-box">
            <div
              class="side_inner_box"
              v-if="sidebar_dash_1"
              id="count_render_box">
            </div>
          </transition>

        </div>
      </div>
      <div class="dash_box dash_box_2">
        <div class="side_top_bar">
          <div
            class="side_top_bar_title"
            v-bind:class="{active: sidebar_dash_2}"
            @click="sidebar_dash_2 = true">
            每日启动趋势
          </div>
          <!-- <div class='side_top_bar_trans' @click="sidebar_dash_2 = !sidebar_dash_2">
          </div>
          <div
            class="side_top_bar_title"
            v-bind:class="{active: !sidebar_dash_2}"
            @click="sidebar_dash_2 = false">
            活跃异常设备
          </div> -->
        </div>
        <div class="side_inner">

          <transition name='dash-box'>
            <div
              class="side_inner_box"
              v-show="sidebar_dash_2"
              id="start_render_box">
            </div>
          </transition>

          <transition name="dash-box">
            <div
              class="side_inner_box"
              v-show="!sidebar_dash_2"
              id="abnor_render_box">

              <table class="table_board">

                <tr class="table_head">
                  <th style="width: 34%;">IP</th>
                  <th style="width: 21%;">品牌</th>
                  <th style="width: 21%;">地域</th>
                  <th style="width: 21%;">事件数量</th>
                </tr>

                <tr v-for="ab in abnor">
                  <td v-text="ab.ip"></td>
                  <td v-text="ab.manufacturer"></td>
                  <td v-text="ab.location"></td>
                  <td v-text="ab.num"></td>
                </tr>


              </table>

            </div>
          </transition>

        </div>


      </div>
      <div class="dash_box dash_box_3">
        <div class="side_top_bar">

          <div
            class="side_top_bar_title"
            v-bind:class="{active: !sidebar_dash_3}"
            @click="sidebar_dash_3 = false">
            威胁态势地域分布
          </div>
          <!-- <div class='side_top_bar_trans'
            @click="sidebar_dash_3 = !sidebar_dash_3">
          </div>
          <div
            class="side_top_bar_title"
            v-bind:class="{active: sidebar_dash_3}"
            @click="sidebar_dash_3 = true">
            实时运行监测
          </div> -->

        </div>
        <div class="side_inner">
          <transition name="dash-box">
            <div
              class="side_inner_box"
              v-show="sidebar_dash_3"
              id="real_render_box">

              <table class="table_board table_board_1">

                <tr>
                  <th style="width: 34%;">时间</th>
                  <th style="width: 21%;">应用版本</th>
                  <th style="width: 21%;">设备型号</th>
                  <th style="width: 21%;">地域</th>
                </tr>

                <tr v-for="re in real">
                  <td v-text="re.time"></td>
                  <td v-text="re.version"></td>
                  <td v-text="re.manufacturer"></td>
                  <td v-text="re.location"></td>
                </tr>


              </table>


            </div>
          </transition>

          <transition name="dash-box">
            <div
              class="side_inner_box"
              v-show="!sidebar_dash_3"
              id="local_render_box">

            </div>
          </transition>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
import { getmap } from 'api/config'
import { scatter } from 'assets/js/scatter'
import * as chart from 'assets/js/echarts_config'

export default {
  data () {
    return {

      sidebar_open: false,
      sidebar_dash_1: true,
      sidebar_dash_2: true,
      sidebar_dash_3: false

    }
  },
  methods: {

    map_render () {
      let et = echarts.init(document.querySelector('#map_layer'))
      et.setOption(scatter(this.map))
    },
    chart_render_1 () {
      let et = echarts.init(document.querySelector('#count_render_box'))
      if (this.count.pie_inner.length) {
        et.setOption(chart.c_opt_1(this.count))
      } else {
        et.setOption(chart.c_opt_empty)
      }
    },
    chart_render_2 () {
      let et = echarts.init(document.querySelector('#start_render_box'))
      if (this.start.numList.length) {
        et.setOption(chart.c_opt_2(this.start))
      } else {
        et.setOption(chart.c_opt_empty)
      }
    },
    chart_render_3 () {
      let et = echarts.init(document.querySelector('#local_render_box'))
      if (this.local.numList.length) {
        et.setOption(chart.c_opt_3(this.local))
      } else {
        et.setOption(chart.c_opt_empty)
      }
    }

  },
  computed: {
    ...mapState('home', [
      'map',
      'count',
      'start',
      'abnor',
      'real',
      'local'
    ])
  },
  mounted () {
    this.$nextTick(
      () => {
        getmap()
          .then(
            () => {
              this.$store.dispatch('home/HomeChartRender')
            }
          )
          .catch(
            (err) => {
              console.log(err)
            }
          )
      }
    )
  },
  watch: {

    map () {
      this.sidebar_open = true
      this.map_render()
      this.chart_render_1()
      this.chart_render_2()
      this.chart_render_3()
    },

    sidebar_dash_2 (val) {
      // console.log(val);
      // if (val) {
      //   this.chart_render_2();
      // }
    },
    sidebar_dash_3 (val) {
      // if (!val) {
      //   this.chart_render_3();
      // }
    }

  }
}
</script>

<style lang="scss">

.page_index {

  $aside_width: 440px;
  $show_duration: 1.2s;

  height: calc(100vh - 84px);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;

  .view_map {
    position: absolute;
    width: 120%;
    left: 0%;
    min-height: 600px;
    height: 100%;
    transition: $show_duration;

    &.paned_left {
      left: -20%;
    }
    // width: 240%;
    // height: 200%;
    // transform: scale(0.5);
    // transform-origin: left top;
  }

  .view_aside {
    min-height: 600px;
    box-sizing: border-box;
    position: absolute;
    border-left: 4px solid #3988ff;
    right: - $aside_width;
    width: $aside_width;
    height: 100%;
    transition: $show_duration;

    .view_aside_arrow {
      position: absolute;
      cursor: pointer;
      top: -3px;
      left: -34px;
      width: 36px;
      height: 44px;
      background: url(~assets/images/home_sprite.png) -36px 0 no-repeat;
    }
    &.close {
      right: 0px;
      .view_aside_arrow {
        background-position: 0 0;
      }
    }

  }

  .dash_box {

    $side_bar_transition: .4s;
    background-color: rgba(37, 49, 92, 0.5);;

    &.dash_box_2 {
      margin-top: 10px;
    }
    &.dash_box_3 {
      margin-top: 10px;
    }

    .side_top_bar {
      height: 30px;
      font-size: 16px;
      background-color: #25315c;
      line-height: 30px;
    }
    .side_top_bar_title {
      margin: 0 16px;
      height: 30px;
      color: #c0cbde;
      float: left;
      transition: $side_bar_transition;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
      max-width: 40%;
      text-align: center;

      &.active {
        color: #3399ff;
      }

    }

    .side_top_bar_trans {
      width: 18px;
      height: 20px;
      margin: 5px 0px;
      cursor: pointer;
      float: left;
      background: url(~assets/images/home_sprite.png) no-repeat;
      background-position: -0px -44px;
      transition: $side_bar_transition;

      &:hover {
        background-position: -18px -44px;
      }


    }

    .side_inner {

      position: relative;
      .side_inner_box {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }

  .dash_box_1 {
    .side_inner {
      height: calc((100vh - 194px) * 0.4);
      min-height: calc((600px - 110px) * 0.4);
    }
  }

  .dash_box_2, .dash_box_3{
    .side_inner {
      height: calc((100vh - 194px) * 0.3);
      min-height: calc((600px - 110px) * 0.3);
    }
  }



  .side_inner_box {

    overflow: hidden;
    .table_board {
      width: 100%;
      height: 100%;
      border-spacing: 0px;
      color: #ddd;
      text-align: center;

      &.table_board_1 {
        height: 100.3%;
      }

      tr {

        td {
          font-size: 14px;
          line-height: 1;
        }

        &:nth-of-type(2n + 1){
          background-color: rgba(37, 49, 92, 0.5);
        }
      }

    }
    .table_head {
      height: 16%;
      line-height: 100%;
      width: 100%;


      th {
        width: 25%;
        border: none;
      }
    }
  }

  // 百度地图的版权声明
  .BMap_cpyCtrl {
  	display: none;
  }

  .anchorBL {
  	display: none;
  }

}


@media (min-width: 1500px) {
  .page_index {
    $aside_width: 500px;
    .view_aside {
      right: - $aside_width;
      width: $aside_width;
    }
  }
}

</style>
