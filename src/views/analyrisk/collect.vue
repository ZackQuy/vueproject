<template lang="html">
  <div class="page_collect">
    <div class="tabs_title">{{cal_info.title}}</div>
    <div class="tabs_layout">
      <el-row class="tabs_top">
        <el-col
          :span="12"  :class="{'tab_link':true,'tab_link_1':true,'active':data_show_info.tab_active}" style="cursor:pointer;">
          <div @click="reset_sort_page(true)">受攻击次数
          </div>
        </el-col>

        <el-col
          :span="12" :class="{'tab_link':true,'tab_link_2':true,'active':!data_show_info.tab_active}" style="cursor:pointer;">
          <div  @click="reset_sort_page(false)">受攻击设备数
          </div>
        </el-col>
      </el-row>
      <div
        class="tabs_content" :class="{'col_color_type1':data_show_info.tab_active,'col_color_type2':!data_show_info.tab_active}">

        <el-row class="row_top">
          <el-col :span="4">
            <span class="location_label">{{cal_info.subtitle}}</span>
          </el-col>
          <el-col :span="3" :offset="17">
            <span class="sort_label">次数</span>
            <span class="sort_wrapper">
              <i
                :class="{'el-icon-caret-top':true, 'active':!data_show_info.sort_method}" @click="reset_page(false)">
              </i>
              <i
                :class="{'el-icon-caret-bottom':true, 'active':data_show_info.sort_method}" @click="reset_page(true)">
              </i>
            </span>
          </el-col>
        </el-row>
        <el-row class="row_list" v-for="(data,index) in data_pool_gro" :key="data" :class="'col_custom_' + index">
          <el-col :span="4">
            <div class="card_inner_label">{{data.name || ''}}</div>
          </el-col>
          <el-col :span="16">
            <el-progress
              :class="{label_progress_indent: Number(data.ratio) < 12}"
              :text-inside="true"
              :stroke-width="18"
              :percentage="Number(data.ratio)">
            </el-progress>
          </el-col>
          <el-col :span="4">
            <div class="card_inner_label">{{data.count}}</div>
          </el-col>
        </el-row>

        <div class="pagination_box">
          <el-pagination
          layout="prev, pager, next"
          :total="data_show_info.total"
          :current-page="data_show_info.current_page"
          @current-change ="set_data_show_info_page"
          :page-size="5">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-collect',
  props: {
    //
    cal_info: {
      type: Object,
      defailt: {}
    },
    // 数据池  这里的数据经过 三层工艺 填充在视图中
    data_pool_group: {
      type: Object,
      defailt: {}
    }
  },

  data () {
    return {
      data_show_info: {
        total: 0, // 总数据数
        current_page: 0, // 当前页数
        tab_active: true, // active状态
        sort_method: true, // 数据排序
        render: 0
      },
      data_pool_gro: []
    }
  },

  methods: {
    reset_sort_page (bool) {
      if (this.data_show_info.tab_active === bool) {
        return null
      } else {
        this.data_show_info.tab_active = bool
        this.data_show_info.current_page = 1
        this.data_show_info.sort_method = true
      }
    },
    reset_page (bool) {
      if (this.data_show_info.sort_method === bool) {
        return
      } else {
        this.data_show_info.current_page = 1
        this.data_show_info.sort_method = bool
      }
    },
    set_data_show_info_page (currentPage, groups) {
      this.data_show_info.current_page = currentPage
    }
  },
  watch: {
    data_show_info: {
      handler: function (val) {
        let array = this.data_pool_group[val.tab_active ? 'count_list' : 'dev_count_list'].slice()
        this.data_show_info.total = array.length
        array = array.sort((a, b) => {
          if (!val.sort_method) {
            return a.count - b.count
          } else {
            return b.count - a.count
          }
        })
        array = array.filter((e, i) => {
          return (val.current_page - 1) * 5 <= i && i < val.current_page * 5
        })
        array.push(...Array(5 - array.length).fill({
          name: '-',
          ratio: 0,
          count: 0
        }))
        this.data_pool_gro = array
      },
      deep: true
    },
    data_pool_group: {
      handler: function (val) {
        this.data_show_info.tab_active = true
        this.data_show_info.current_page = 1
        this.data_show_info.sort_method = true
        // render ++ 用来强制视图渲染
        this.data_show_info.render ++
      },
      deep: true
    }
  },
  mounted () {
    this.data_pool_gro = this.data_pool_group.count_list
  }
}
</script>

<style lang="scss">
.page_collect{

  display:inline-block;
	width: 47%;
	margin-top:34px;



	.el-progress-bar__inner{
		min-width: 18px;

	}

  .label_progress_indent {
    .el-progress-bar__innerText {
      transform: translateX(24px);
      color: #595c5c;
    }
  }
	.col_color_type1{
		.col_custom_0 {
			.el-progress-bar__inner {
				background:#8266ef;
			}
		}
		.col_custom_1 {
			.el-progress-bar__inner {
				background:#6574f0
			}
		}
		.col_custom_2 {
			.el-progress-bar__inner {
				background:#3988ff
			}
		}
		.col_custom_3 {
			.el-progress-bar__inner {
				background:#05aeec
			}
		}
		.col_custom_4 {
			.el-progress-bar__inner {
				background:#10b9da
			}
		}
	}
	.col_color_type2{
		.col_custom_0 {
			.el-progress-bar__inner {
				background:#00b9da
			}
		}
		.col_custom_1 {
			.el-progress-bar__inner {
				background:#01cbc6
			}
		}
		.col_custom_2 {
			.el-progress-bar__inner {
				background:#02ca96
			}
		}
		.col_custom_3 {
			.el-progress-bar__inner {
				background:#70cd55
			}
		}
		.col_custom_4 {
			.el-progress-bar__inner {
				background:#9acd55
			}
		}
	}


	&:nth-child(odd){
		margin-right:29px;
		margin-left:10px;
	}

	.tabs_title{
		font-size: 16px;
		margin-bottom:6px;
		padding-left: 0px;
		font-weight: 100;

	}

	.tabs_layout {
		border: 1px solid #c9c9c9;
		border-radius: 4px;
		overflow: hidden;
		.tabs_top {
			height: 30px;
			line-height: 30px;
			.tab_link {
				background: #e8eff4;
				text-align: center;
				color: #595c5c;
				font-size: 14px;
			}
			.tab_link_1 {
				border-right: 1px solid #c9c9c9;
				&.active {
					background: #3988ff;
					color: #fff;
				}
			}
			.tab_link_2 {
				&.active {
					background: #01cbc6;
					color: #fff;
				}
			}
		}

		.tabs_content {
			border-top: 1px solid #c9c9c9;
      height:300px;
  		position: relative;
			.location_label{
				font-size: 14px;
			}
			.card_inner_label {
				font-size: 12px;
				text-align: center;
        line-height: 20px;
			}
			.sort_label {
				float: left;
				text-align: right;
				font-size: 14px;
			}
			.sort_wrapper {
				float: right;
				width: 15px;
				height: 30px;
				overflow: hidden;
				transform-origin: top;
				transform: scale(0.5) translateY(-2px);
				color: #e8eff4;
				.active {
					color: #595c5c;
				}
			}
		}
	}


	.pagination_box{
		position: absolute;
		bottom: 10px;
    text-align: center;
    width: 100%;
	}
	.el-icon-caret-top{
		color:#ccc;
		cursor: pointer;
	}
	.el-icon-caret-bottom{
		color:#ccc;
		cursor: pointer;
	}
}
</style>
