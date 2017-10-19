<template lang="html">

  <div class="cpn_globalfilter">

    <el-dialog
      title="搜索"
      :lock-scroll="false"
      custom-class="global_dialog"
      :visible.sync="global_filter_show"
      :before-close="global_filter_close">


      <!-- 必选搜索项 -->
      <div class="query_must">
        <div class="query_must_wrap">
          <div class="query_must_item">
            <div class="query_must_radio">
              <el-radio
                v-model="query_must_radio_active"
                label="udid">
                设备ID
              </el-radio>
            </div>
            <div class="query_must_input">
              <el-input
                size="small"
                v-model="query_info.must.udid"
                :placeholder="query_must_radio_active === 'udid' ? '当前项为必选筛选条件': ''"
                :disabled ="query_must_radio_active !== 'udid'">
              </el-input>
            </div>

          </div>
          <div class="query_must_item">
            <div class="query_must_radio">
              <el-radio
                v-model="query_must_radio_active"
                label="user_data">
                手机号
              </el-radio>
            </div>
            <div class="query_must_input">
              <el-input
                size="small"
                v-model="query_info.must.user_data"
                :placeholder="query_must_radio_active === 'user_data' ? '当前项为必选筛选条件': ''"
                :disabled ="query_must_radio_active !== 'user_data'">
              </el-input>
            </div>
          </div>
          <div class="query_must_item">
            <div class="query_must_radio">
              <el-radio
                v-model="query_must_radio_active"
                label="mac">
                MAC
              </el-radio>
            </div>
            <div class="query_must_input">

              <el-input
                size="small"
                v-model="query_info.must.mac"
                :placeholder="query_must_radio_active === 'mac' ? '当前项为必选筛选条件': ''"
                :disabled ="query_must_radio_active !== 'mac'">
              </el-input>

            </div>
          </div>
          <div class="query_must_item">
            <div class="query_must_radio">
              <el-radio
                v-model="query_must_radio_active"
                label="imei">
                IMEI
              </el-radio>
            </div>
            <div class="query_must_input">
              <el-input
                size="small"
                v-model="query_info.must.imei"
                :placeholder="query_must_radio_active === 'imei' ? '当前项为必选筛选条件': ''"
                :disabled ="query_must_radio_active !== 'imei'">
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <!-- 可选搜索项 -->

      <div class="query_may">
        <div class="query_may_wrap">
          <div class="query_may_item">
            <el-input
              size="small"
              placeholder="IP"
              v-model="query_info.may.client_ip">

            </el-input>
          </div>


          <div class="query_may_item">
            <el-select
              size="small"
              placeholder="地理位置"
              v-model="query_info.may.location">
              <el-option
                v-for="loca in global_filter_opt.location_datalist"
                :key="loca"
                :label="loca"
                :value="loca">
              </el-option>
            </el-select>
          </div>

          <div class="query_may_item">


            <el-select
              size="small"
              placeholder="事件类型"
              v-model="query_info.may.event_type">
              <el-option
                v-for="e_ev in global_event_reflect"
                :key="e_ev"
                :label="e_ev.label"
                :value="e_ev.value">
              </el-option>
            </el-select>
          </div>

          <div class="query_may_item">
            <el-select
              size="small"
              v-model="query_info.may.manufacturer"
              placeholder="设备机型">
              <el-option
                v-for="manu in global_filter_opt.manufacturer_datalist"
                :key="manu"
                :label="manu"
                :value="manu">
              </el-option>

            </el-select>
          </div>

          <div class="query_may_item">
            <el-select
              size="small"
              placeholder="系统版本"
              v-model="query_info.may.os_version">
              <el-option
                v-for="os_ver in global_filter_opt.os_version_datalist"
                :key="os_ver"
                :label="os_ver"
                :value="os_ver">
              </el-option>

            </el-select>
          </div>

          <div class="query_may_item">
            <el-select
              size="small"
              placeholder="应用版本"
              v-model="query_info.may.app_version">
              <el-option
                v-for="app_ver in global_filter_opt.app_version_datalist"
                :key="app_ver"
                :label="app_ver"
                :value="app_ver">
              </el-option>
            </el-select>
          </div>

          <div class="query_may_item">
            <el-select
              size="small"
              placeholder="root"
              v-model="query_info.may.is_root">
              <el-option
                :value="1"
                label="root">
              </el-option>
              <el-option
                label="非root"
                :value="0">
              </el-option>

            </el-select>
          </div>



        </div>
      </div>

      <div class="query_time">
        <el-date-picker
          v-model="start_time"
          type="date"
          size="small"
          :clearable="false"
          :editable="false"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          :picker-options="pick_opt_start">
        </el-date-picker>

        <el-date-picker
          v-model="end_time"
          type="date"
          size="small"
          :clearable="false"
          :editable="false"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          :picker-options="pick_opt_end">
        </el-date-picker>

        <el-button size="small" type="primary" @click="query_submit">
          查询
        </el-button>

      </div>


      <div class="query_result" v-if="global_filter_data.length">

        <el-table
          :data="global_filter_data_native"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="time"
            width="150"
            align="center"
            label="日期">
            <template scope="scope">
              <div
                class="s_l_e"
                v-text="scope.row.time"
                :title="scope.row.time"
                ></div>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            label="设备ID">
            <template scope="scope">
                <template v-if="scope.row.udid">
                  <span>{{ String(scope.row.udid).substring(0, 8) || '-' }}</span>
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
            <template scope="scope">
              <div
                class="s_l_e"
                v-text="scope.row.app_name"
                :title="scope.row.app_name"
                ></div>
            </template>
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
            width="100"
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
            width="60"
            label="设备">
            <template scope="scope">
              <div
                class="s_l_e"
                v-text="scope.row.manufacturer"
                :title="scope.row.manufacturer"
                ></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="os_version"
            align="center"
            width="80"
            label="操作系统">
            <template scope="scope">
              <div
                class="s_l_e"
                v-text="scope.row.os_version"
                :title="scope.row.os_version"
                ></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="location"
            align="center"
            width="70"
            label="位置">
            <template scope="scope">
              <div
                class="s_l_e"
                v-text="scope.row.location"
                :title="scope.row.location"
                ></div>
            </template>

          </el-table-column>


        </el-table>
      </div>

      <div
        class="query_pagination"
        v-if="global_filter_data.length">
        <el-pagination
          layout="prev, pager, next"
          :current-page="page_info"
          @current-change="page_change"
          :page-size="5"
          :total="global_filter_data.length">
        </el-pagination>
      </div>

    </el-dialog>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data () {
    return {
      query_info: {
        // 必选参数
        must: {
          udid: '',
          user_data: '',
          mac: '',
          imei: ''
        },
        // 可选参数
        may: {
          client_ip: '',
          location: '',
          event_type: '',
          manufacturer: '',
          os_version: '',
          app_version: '',
          is_root: ''
        }
      },
      query_must_radio_active: 'udid',
      start_time: '',
      end_time: '',
      // 向后台提交的时间
      axios_date_start: '',
      axios_date_end: '',
      pick_opt_start: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pick_opt_end: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      page_info: 1,
      global_filter_data_native: []
    }
  },
  computed: {
    ...mapState('userconfig', [
      'global_event_reflect',
      'global_filter_show',
      'global_filter_opt',
      'global_filter_data',
      'global_root'
    ])
  },
  watch: {
    start_time (val) {
      this.axios_date_start = new Date(val).format('yyyy-MM-dd')
      this.pick_opt_end.disabledDate = (time) => {
        return time.getTime() > Date.now() || time.getTime() < new Date(val).getTime()
      }
    },

    end_time (val) {
      this.axios_date_end = new Date(val).format('yyyy-MM-dd')
      this.pick_opt_start.disabledDate = (time) => {
        return time.getTime() > Date.now() || time.getTime() > new Date(val).getTime()
      }
    },

    global_filter_data (val) {
    // 数据发生变化之后
    // 页面发生一些
      this.global_filter_data_native = val.filter(
        (e, i) => {
          return (this.page_info - 1) * 5 <= i && i < this.page_info * 5
        }
      )
      this.global_filter_data_native.push(...Array(5 - this.global_filter_data_native.length).fill({}))
    },
    page_info (val) {
      this.global_filter_data_native = this.global_filter_data.filter(
        (e, i) => {
          return (this.page_info - 1) * 5 <= i && i < this.page_info * 5
        }
      )
      this.global_filter_data_native.push(...Array(5 - this.global_filter_data_native.length).fill({}))
    }
  },
  methods: {
    global_filter_close () {
      this.query_info = {
        must: {
          udid: '',
          user_data: '',
          mac: '',
          imei: ''
        },
        may: {
          client_ip: '',
          location: '',
          event_type: '',
          manufacturer: '',
          os_version: '',
          app_version: '',
          is_root: ''
        }
      }
      this.query_must_radio_active = 'udid'
      this.start_time = new Date()
      this.end_time = new Date()

      this.$store.commit('userconfig/USER_FILTER_DATA', {
        data: {
          datalist: []
        }
      })

      this.$store.commit('userconfig/USER_FILTER_HIDE')
    },

    query_submit () {
    // 必选参数
      let query_opt = {
        [this.query_must_radio_active]: this.query_info.must[this.query_must_radio_active],

        start_time: this.axios_date_start,
        end_time: this.axios_date_end
      }

      // 可选参数
      for (let may_opt in this.query_info.may) {
        if (this.query_info.may[may_opt] !== '') {
          query_opt[may_opt] = this.query_info.may[may_opt]
        }
      }
      let queryTip = {
        udid: '设备ID',
        mac: 'MAC',
        imei: 'IMEI',
        user_data: '手机号'
      }
      this.$valid([
        {
          valid: this.query_info.must[this.query_must_radio_active],
          msg: `请输入当前必选筛选条件: ${queryTip[this.query_must_radio_active]}`
        }
      ])
        .then(
          () => {
            this.$store.dispatch('userconfig/UserFilterQuery', query_opt)
          }
        )
    },

    page_change (val) {
      this.page_info = val
    }

  },
  mounted () {
    this.$nextTick(
      () => {
        this.start_time = new Date()
        this.end_time = new Date()
      }
    )
  }
}
</script>

<style lang="scss">
.cpn_globalfilter {
  .global_dialog {
    width: 70%;
    max-width: 1200px;
    .el-dialog__header {
      padding: 10px 20px;
      background: linear-gradient(70deg, #3988ff, #00ddd9);
    }
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
    .el-dialog__body {
      padding: 20px 0;
    }
  }
  .query_must {
    .query_must_wrap {
      overflow: hidden;
      padding: 0 40px;
    }
    .query_must_item {

      width: 45%;
      margin-bottom: 10px;

      &:nth-of-type(2n) {
        float: right;
      }
      &:nth-of-type(2n+1) {
        float: left;
      }
    }

    .query_must_radio {
      width: 24%;
      float: left;
      line-height: 28px;
    }
    .query_must_input {
      width: 76%;
      float: left;
    }
  }

  .query_may {
    padding: 10px 30px;
    background: #f5f5f5;
    .query_may_wrap {
      overflow: hidden;
    }
    .query_may_item {
      width: 25%;
      float: left;
      box-sizing: border-box;
      margin: 4px 0;
      padding: 0 10px;
    }
  }
  .query_time {
    text-align: center;
    margin-top: 15px;
    > * {
      margin-right: 6px;
    }
  }

  .query_result {
    margin-top: 20px;
    padding: 0 40px;
    .cell {
      padding: 0 4px;
    }
    td {
      height: 34px;
    }
  }
  .query_pagination {
    margin-top: 20px;
    text-align: center;
  }

}


</style>
