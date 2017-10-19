<template lang="html">
  <div class="page_inner page_realtime">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/analy/realtime' }">实时监测</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body page_body_1 ">

      <!-- 头部banner -->
      <div class="top_banner">

        <el-row :gutter="40">

          <el-col :span="6" :offset="3">
            <div class="card_layout">
              <div class="card_title" style="background: #3988ff;">
                受攻击次数
              </div>
              <div class="card_content"
                style="color: #3988ff;">
                {{real_render_data.real_top_bar.risk_count}}
              </div>
            </div>

          </el-col>

          <el-col :span="6">

            <div class="card_layout">

              <div class="card_title" style="background: #02cac7;">
                受攻击设备数
              </div>
              <div class="card_content"
                style="color: #02cac7;">
                {{real_render_data.real_top_bar.risk_dev_count}}
              </div>

            </div>

          </el-col>

          <el-col :span="6">

            <div class="card_layout">
              <div class="card_title" style="background: #70ba68;">
                设备受攻击率
              </div>
              <div class="card_content" style="color: #70ba68;">
                {{real_render_data.real_top_bar.risk_dev_ratio + '%'}}
              </div>

            </div>


          </el-col>

        </el-row>

      </div>

      <!-- 头部list -->
      <div class="top_list">

        <div class="list_title">
          全局监测
        </div>
        <div class="list_table">
          <el-table
            :data="real_render_data.real_top_list"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="time"
              width="160"
              align="center"
              label="日期">
            </el-table-column>
            <el-table-column
              width="200"
              align="center"
              label="设备ID">
              <template scope="scope">
                  <template v-if="scope.row.udid">
                    <span>{{ String(scope.row.udid).substring(0, 20) || '-' }}</span>
                    <el-popover placement="right" width="280" trigger="hover">
                      <div class="basic_popover">
                        <span style="font-size: 14px; text-indent: 20px;">{{ scope.row.udid }}</span>
                      </div>
                      <el-button type="text" icon="more" slot="reference">
                      </el-button>
                    </el-popover>
                  </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="app_name"
              align="center"
              label="应用">
            </el-table-column>
            <el-table-column
              align="center"
              label="应用版本">
              <template scope="scope">
                <div
                  class="s_l_e"
                  v-text="scope.row.app_version"
                  :title="scope.row.app_version"
                  ></div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="事件类型">
              <template scope="scope">
                <div
                  class="s_l_e"
                  v-text="scope.row.event_type"
                  :title="scope.row.event_type"
                  ></div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="120"
              label="具体事件">
              <template scope="scope">
                <div
                  class="s_l_e"
                  v-text="scope.row.risk_type"
                  :title="scope.row.risk_type"
                  ></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="manufacturer"
              align="center"
              label="设备">
              </el-table-column>
            <el-table-column
              prop="os_version"
              align="center"
              label="操作系统">
            </el-table-column>
            <el-table-column
              prop="location"
              align="center"
              label="位置">
            </el-table-column>


          </el-table>

        </div>

      </div>

    </div>


    <div class="page_head page_head_2">

      <el-row :gutter="10">

        <el-col :span="2">
          <el-select
            size="small"
            v-model="real_select_opt.location_attention"
            placeholder="请选择">
            <el-option
              v-for="item in real_select_opt.location_data_list"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

        </el-col>

        <el-col :span="2">

          <el-select
            size="small"
            v-model="real_select_opt.manufacturer_attention"
            placeholder="请选择">
            <el-option
              v-for="item in real_select_opt.manufacturer_datalist"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

        </el-col>

        <el-col :span="1">
          <div style="margin-top: 1px;">
            <el-button type="primary" size="small" @click="selectChange">筛选</el-button>
          </div>
        </el-col>

      </el-row>


    </div>


    <div class="page_body page_body_1 page_body_2">

      <!-- 头部banner -->
      <div class="top_banner">

        <el-row :gutter="40">

          <el-col :span="6" :offset="3">
            <div class="card_layout">
              <div class="card_title" style="background: #3988ff;">
                受攻击次数
              </div>
              <div class="card_content"
                style="color: #3988ff;">
                {{real_render_data.real_bot_bar.risk_count}}
              </div>

            </div>

          </el-col>

          <el-col :span="6">

            <div class="card_layout">

              <div class="card_title" style="background: #02cac7;">
                受攻击设备数
              </div>
              <div class="card_content"
                style="color: #02cac7;">
                {{real_render_data.real_bot_bar.risk_dev_count}}
              </div>

            </div>

          </el-col>

          <el-col :span="6">

            <div class="card_layout">
              <div class="card_title" style="background: #70ba68;">
                设备受攻击率
              </div>
              <div class="card_content" style="color: #70ba68;">
                {{real_render_data.real_bot_bar.risk_dev_ratio + '%'}}
              </div>

            </div>


          </el-col>

        </el-row>

      </div>

      <!-- 头部list -->
      <div class="top_list top_list_2">


        <div class="list_table">
          <el-table
            :data="real_render_data.real_bot_list"
            border
            stripe
            style="width: 100%">
            <el-table-column
              prop="time"
              width="160"
              align="center"
              label="日期">
            </el-table-column>
            <el-table-column
              width="200"
              align="center"
              label="设备ID">
              <template scope="scope">
                  <template v-if="scope.row.udid">
                    <span>{{ String(scope.row.udid).substring(0, 20) || '-' }}</span>
                    <el-popover placement="right" width="280" trigger="hover">
                      <div class="basic_popover">
                        <span style="font-size: 14px; text-indent: 20px;">{{ scope.row.udid }}</span>
                      </div>
                      <el-button type="text" icon="more" slot="reference">
                      </el-button>
                    </el-popover>
                  </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="app_name"
              align="center"
              label="应用">
            </el-table-column>
            <el-table-column
              align="center"
              label="应用版本">
              <template scope="scope">
                <div
                  class="s_l_e"
                  v-text="scope.row.app_version"
                  :title="scope.row.app_version"
                  ></div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="事件类型">
              <template scope="scope">
                <div
                  class="s_l_e"
                  v-text="scope.row.event_type"
                  :title="scope.row.event_type"
                  ></div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="120"
              label="具体事件">
              <template scope="scope">
                <div
                  class="s_l_e"
                  v-text="scope.row.risk_type"
                  :title="scope.row.risk_type"
                  ></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="manufacturer"
              align="center"
              label="设备">
              </el-table-column>
            <el-table-column
              prop="os_version"
              align="center"
              label="操作系统">
            </el-table-column>
            <el-table-column
              prop="location"
              align="center"
              label="位置">
            </el-table-column>


          </el-table>

        </div>

      </div>



    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      timer: null,
      filterOpt: {
        l_name: '',
        m_name: ''
      },
      loading_1: null,
      loading_2: null
    }
  },
  computed: {
    ...mapState('realtime', [
      'real_render_data',
      'real_select_opt'
    ])
  },
  watch: {
    real_render_data () {
      this.loading_1.close()
      this.loading_2.close()
    }
  },
  methods: {
    selectChange () {
      if (this.filterOpt.l_name === this.real_select_opt.location_attention && this.filterOpt.m_name === this.real_select_opt.manufacturer_attention) {
        return
      }
      this.filterOpt = {
        l_name: this.real_select_opt.location_attention,
        m_name: this.real_select_opt.manufacturer_attention
      }
      this.$store.dispatch('realtime/RealSelectChange', this.filterOpt)
      this.loading_2.close()
      this.loading_2 = this.$loading({
        target: '.page_body_2',
        text: '数据加载中'
      })
    }
  },
  mounted () {
    this.loading_1 = this.$loading({
      target: '.page_body_1',
      text: '数据加载中'
    })
    this.loading_2 = this.$loading({
      target: '.page_body_2',
      text: '数据加载中'
    })
    this.$store.dispatch('realtime/RealSelectOpt')
    this.$store.dispatch('realtime/RealMainRender')
    this.timer = setInterval(
      () => this.$store.dispatch('realtime/RealMainRender'),
      5e3
    )
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">




.page_realtime {

  .page_body_1 {
    height: auto;
    min-height: auto;
    padding-bottom: 20px;
    border-radius: 0px;
    margin-bottom: 10px;
  }
  .el-table th {
    height: 34px;
  }
  .el-table td {
    height: 30px;
  }
  .top_banner {
    margin-top: 30px;
  }
  .cell {
    padding: 0px 6px;
  }
  .bot_banner {
    margin-top: 30px;
  }

  .list_title {
    font-size: 16px;
    line-height: 40px;
    color: #222;
  }



  .page_head_2 {
    padding-bottom: 4px;
    margin-top: 20px;

  }


  .top_list_2 {
    margin-top: 40px;
    margin-bottom: 10px;
  }

  .page_body_2 {
    margin-bottom: 20px;
    border-radius: 0 0 12px 12px;
  }
}


</style>
