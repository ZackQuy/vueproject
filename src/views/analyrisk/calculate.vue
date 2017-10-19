<template lang="html">
	<div class="page_inner page_calculate page_inners">

		<div class="page_head page_head1">
			<el-breadcrumb
				separator=">"
				style="display:inline-block;">
				<el-breadcrumb-item :to="{ path: '/analy/calculate'}">
					攻击统计
				</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="tab_topsa" style="display:inline-block">
				<!--头部导航-->

				<el-button
					size="mini"
					class="nav_tabs_btn"
					v-for="(tab_item, tab_index) in tabs_info.tabs_list"
					:key="tab_item"
					:type="tab_index == tabs_info.tabs_active ? 'primary': ''"
					@click="tabs_active(tab_index)">
					{{tab_item}}
				</el-button>


			</div>
		</div>
		<div class="page_body">
			<!-- 头部banner -->
			<div class="top_banner" v-if="cal_main_type.cal_count">
				<el-row :gutter="40">
					<el-col :span="6" :offset="3">
						<div class="card_layout">
							<div class="card_title" style="background: #3988ff;">受攻击次数</div>
							<div class="card_content" style="color: #3988ff;">
								{{cal_main_type.cal_count.risk_count}}
							</div>
						</div>
					</el-col>

					<el-col :span="6">
						<div class="card_layout">
							<div class="card_title" style="background: #02cac7;">受攻击设备数</div>
							<div class="card_content" style="color: #02cac7;">
								{{cal_main_type.cal_count.risk_dev_count}}
							</div>
						</div>
					</el-col>

					<el-col :span="6">
						<div class="card_layout">
							<div class="card_title" style="background: #70ba68;">设备受攻击率</div>
							<div class="card_content" style="color: #70ba68;">
								{{cal_main_type.cal_count.risk_dev_ratio +'%'}}
							</div>
						</div>
					</el-col>
				</el-row>
			</div>

			<div id="echarts_dom_trend" style="width:100%; height:300px;"></div>
		<!--收集攻击信息列表-->
			<v-collect
				:cal_info="{
					title: '地域分布',
					subtitle: '直辖市/省'
				}"
				:data_pool_group="data_pool.group1">
			</v-collect>

			<v-collect
				:cal_info="{
					title: '应用版本分布',
					subtitle: '版本号'
				}"
				:data_pool_group="data_pool.group2">
			</v-collect>

			<v-collect
				:cal_info="{
					title: '系统版本分布',
					subtitle: '版本号'
				}"
				:data_pool_group="data_pool.group3">
			</v-collect>

			<v-collect
				:cal_info="{
					title: '设备分布',
					subtitle: '设备型号'
				}"
				:data_pool_group="data_pool.group4">
			</v-collect>
    	</div>
	</div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
import * as chart from 'assets/js/echarts_config'
// 收集攻击信息列表组件
import Collect from './collect'

export default {

  data () {
    return {
      data_pool: {
        group1: {},
        group2: {},
        group3: {},
        group4: {}
      },
      tabs_info: {
        tabs_list: ['今天', '昨天', '上周', '上半月', '上个月', '上季度', '上半年', '去年'],
        tabs_active: 0
      },
      echarts_dom_trend: null
    }
  },
  components: {
    'v-collect': Collect
  },
  computed: {
    ...mapState('calculate', [
      'cal_main_type',
      'cal_main_trend'
    ])
  },
  methods: {
    // 头部切换时间获取数据
    tabs_active (tab_index) {
      if (tab_index === this.tabs_info.tabs_active) {
        return
      }
      this.tabs_info.tabs_active = tab_index
      this.$store.dispatch('calculate/CalMainRender', {
        time: tab_index
      })
    }

  },
  watch: {
    cal_main_type: {
      // 监听总信息变化 获取收集攻击列表信息数据
      handler: function (val) {
        this.data_pool.group1 = val.cal_location
        this.data_pool.group2 = val.cal_app_version
        this.data_pool.group3 = val.cal_os_version
        this.data_pool.group4 = val.cal_device
      },
      deep: true
    },
    // 监听 并获取Echarts数据
    cal_main_trend: {
      handler (val) {
        this.echarts_dom_trend.hideLoading()
        this.echarts_dom_trend.setOption(chart.c_opt_4(val), true)
      },
      deep: true
    }
  },
  mounted () {
    this.$store.dispatch('calculate/CalMainRender', {
      time: this.tabs_info.tabs_active
    })
    // echarts_dom初始化 只能初始化一次
    this.echarts_dom_trend = echarts.init(document.querySelector('#echarts_dom_trend'))
    this.echarts_dom_trend.setOption(chart.c_opt_4({
      datalist: [
        {
          value: [0],
          type: 'risk'
        },
        {
          value: [0],
          type: 'risk_dev'
        },
        {
          value: [0],
          type: 'risk_dev_ratio'
        }
      ],
      xAxis: ['1970-01-01']
    }))
    this.echarts_dom_trend.showLoading({
      text: '数据加载中',
      textColor: '#3988ff',
      color: '#3988ff',
      maskColor: 'rgba(255, 255, 255, 0.8)'
    })
  }
}
</script>

<style lang="scss">

.page_calculate{
	.page_head1{
		position: relative;
		font-size: 0px;
	}
	.tab_topsa{
		position: absolute;
		left:70px;
		bottom:5px;
	}
	.top_banner {
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.el_br_item {
		.el-breadcrumb-item{
			display:inline-block;
			margin-top:20px;
		}
	}
	.el-pagination{
		text-align: center;
	}
	.el-row {
		margin-bottom: 20px;
		&:first-child {
			margin-bottom: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}
	}
	.row_top{
		padding:15px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.nav_tabs_btn {
		cursor: pointer;
		border-radius: 5px;
		width: 60px;
	}
}

</style>
