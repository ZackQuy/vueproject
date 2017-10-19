<template lang="html">
  <div class="page_inner page_strate_data_rule_new">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path:'/config/stratery'}">
          玩偶组列表
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_chg'}">
          更改玩偶组
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_new'}">
          新建玩偶组
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_new'}">
          新建玩偶
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_data'}">
          新建数据上传玩偶
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_data_rule'}">
          新建数据上传规则
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">

      <!-- 名称与按钮布局 -->
      <div class="page_update_submit_info">
        <el-row
          align="bottom"
        >
          <el-col :span="8">
            <div class="col_1">
              <el-input
                v-model="strate_datarule_info.name"
                placeholder="请输入数据上传规则名称">
              </el-input>

            </div>
          </el-col>

          <el-col :span="7" :offset="9">
            <div class="col_3">
              <el-button type="success" @click="new_strate_datarule">保存</el-button>
            </div>
          </el-col>

        </el-row>
      </div>



      <div class="strate_content">

        <div class="legend_layout">
          <div class="legend_title">上传时间</div>
          <div class="legend_body">

            <!-- 立即上传还是定时上传的选项 -->
            <el-row>
              <el-col :span="24" class="l_h_30">
                <el-radio v-model="strate_datarule_info.is_immediately" :label="1">
                  立即上传
                </el-radio>
              </el-col>

              <el-col :span="3" class="l_h_30">
                <el-radio v-model="strate_datarule_info.is_immediately" :label="0">
                  定时上传
                </el-radio>
              </el-col>
              <el-col :span="2">
                <el-input
                  size="small"
                  :maxlength="3"
                  v-model="strate_datarule_info.day" :disabled="!!strate_datarule_info.is_immediately">
                  <template slot="append">天</template>
                </el-input>
              </el-col>


              <el-col
                :span="1"
                :offset="1"
                v-show="!strate_datarule_info.is_immediately"
              >
                <div style="line-height: 26px;">
                  <el-button type="primary" icon="plus" size="small" @click="addOpter"></el-button>
                </div>

              </el-col>
            </el-row>



            <!-- 上传时间 -->
            <!-- time_opters: [{
              start: '00:00',
              end: '24:00',
              step: '00:05',
              edit: true,
              starttime: '',
              endtime: '',
              percent: 0
            }], -->

            <div class="time_option" v-if="!strate_datarule_info.is_immediately">
              <el-row class="m_g_10" :key="opter" v-for="(opter, index) in time_opters">

                <el-col :span="11">

                  <el-time-select
                    size="small"
                    :clearable="false"
                    :editable="false"
                    v-model="opter.starttime"
                    :disabled="index < time_opters.length - 1 && time_opters.length !== 1"
                    placeholder="起始时间"
                    @change="time_pickter_set(index)"
                    :picker-options="{
                      start: opter.start,
                      step: opter.step,
                      end: '23:55'
                    }">
                  </el-time-select>
                  <el-time-select
                    size="small"
                    :clearable="false"
                    :editable="false"
                    :disabled="index < time_opters.length - 1 && time_opters.length !== 1"
                    v-model="opter.endtime"
                    placeholder="结束时间"
                    :picker-options="{
                      start: opter.start,
                      step: opter.step,
                      end: opter.end,
                      minTime: opter.starttime
                    }">
                  </el-time-select>

                </el-col>


                <el-col :span="4">
                  <el-input
                    size="small"
                    v-model="opter.percent"
                    :maxlength="2"
                  >
                    <template slot="prepend">随机数</template>
                    <template slot="append">%</template>
                  </el-input>
                </el-col>

                <el-col :span="1">
                  <el-button
                    icon="delete"
                    class="delete_percent_btn"
                    @click="delectOpter"
                    :disabled="index < time_opters.length - 1 && time_opters.length !== 1 || index === 0"
                    size="small"
                  ></el-button>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>


        <div class="legend_layout">
          <div class="legend_title">上传失败处理</div>
          <div class="legend_body">
            <div class="legend_selector">
              <div class="legend_selector_item">
                <el-radio v-model="deal_with_fail" :label="true">{{""}}</el-radio>
                <span class="legend_selector_span">最近</span>
                <span class="legend_selector_span" style="display: inline-block; width: 90px;">
                  <el-input :disabled="deal_with_fail===false" size="small" v-model="strate_datarule_info.fail.num">
                    <template slot="append">条</template>
                  </el-input>
                </span>
              </div>
              <div class="legend_selector_item">
                <el-radio v-model="deal_with_fail" :label="false">{{""}}</el-radio>
                <span class="legend_selector_span">不超过</span>
                <span style="display: inline-block; width: 100px;">
                  <el-input :disabled="deal_with_fail===true"  size="small" v-model="strate_datarule_info.fail.maxsize">
                    <template slot="append">MB</template>
                  </el-input>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  // 数组项左移动 右移动通过vuex 中操作， vuex 中获得服务器返回的数据之后 给数据增加 active 属性
  // 然后 ids 是基于这个数组进行 过滤, 过滤的结果返回给 后台

  data () {
    return {
      time_opters: [{
        start: '00:00',
        end: '24:00',
        step: '00:05',
        starttime: '00:00',
        endtime: '00:05',
        percent: 5
      }],
      strate_datarule_info: {
        name: '',
        is_immediately: 1,
        day: 1,
        fail: {
          num: 100,
          maxsize: 10
        }
      },
      deal_with_fail: true
    }
  },

  methods: {
    cur_5mins (time) {
      // 随便取一个时分的时间戳用来推倒时间
      let cur_5mins_stamp = +new Date('2012-1-2 ' + time + ':00') + 60 * 5 * 1000
      let cur_5mins_date = new Date(cur_5mins_stamp)
      let cur_5mins_hours = String(cur_5mins_date.getHours()).padStart(2, '0')
      let cur_5mins_mins = String(cur_5mins_date.getMinutes()).padStart(2, '0')
      let cur_time_result = cur_5mins_hours + ':' + cur_5mins_mins
      // 整个时分的集合应当取集合 [00:00-24:00] 但是24:00 会识别为 00:00 所以这里这么写
      if (cur_time_result !== '00:00') {
        return cur_time_result
      } else {
        return '24:00'
      }
    },
    time_pickter_set (index) {
      this.time_opters[index].endtime = this.cur_5mins(this.time_opters[index].starttime)
    },
    addOpter () {
      let current_endtime = this.time_opters[this.time_opters.length - 1].endtime
      if (current_endtime == '24:00') {
        this.$valid([{
          valid: '',
          msg: '请按照先后顺序添加时间段'
        }])
        return
      }
      if (this.time_opters.length >= 20) {
        this.$valid([{
          valid: '',
          msg: '当前添加的上传时间已到达上限'
        }])
      } else {
        let current = this.time_opters[this.time_opters.length - 1].endtime
        // 获得五分钟之后的时间点
        this.time_opters.push({
          start: current,
          end: '24:00',
          step: '00:05',
          starttime: current,
          endtime: this.cur_5mins(current),
          percent: 5
        })
      }
    },
    delectOpter () {
      this.time_opters.pop()
    },
    new_strate_datarule () {
      let valid_data = [
        {valid: this.strate_datarule_info.name.length > 3, msg: '请确认数据上传规则名称长度不少于4位'},
        {valid: this.strate_datarule_info.name.length < 17, msg: '请确认数据上传规则名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.strate_datarule_info.name), msg: '请确认数据上传规则名称不包含特殊字符'}
      ]
      let form_data = {
        name: this.strate_datarule_info.name,
        rate: this.strate_datarule_info.day,
        is_immediate: this.strate_datarule_info.is_immediately
      }
      if (!this.strate_datarule_info.is_immediately) {
        valid_data.push({
          valid: this.$rules.num_rule(this.strate_datarule_info.day),
          msg: '请确认定时上传的间隔天数为正整数'
        })
      }
      if (this.deal_with_fail) {
        form_data.num = this.strate_datarule_info.fail.num
        valid_data.push({
          valid: this.$rules.num_rule(this.strate_datarule_info.fail.num),
          msg: '请确认上传失败处理条数限制为正整数'
        })
      } else {
        form_data.maxsize = this.strate_datarule_info.fail.maxsize
        valid_data.push({
          valid: this.$rules.num_rule(this.strate_datarule_info.fail.maxsize),
          msg: '请确认上传失败处理大小限制为正整数'
        })
      }
      if (this.strate_datarule_info.is_immediately) {
        form_data.is_immediate = 1
      } else {
        form_data.time = this.time_opters.map(e => {
          if ((!(this.$rules.num_rule(e.percent))) || (e.percent < 5)) {
            valid_data.push({
              valid: '',
              msg: '请确认随机数设置为不小于5的正整数'
            })
          }
          return `${e.starttime}-${e.endtime}-${e.percent}`
        })
        let percent_total = this.time_opters.map((e, i) => {
          return e.percent
        }).reduce((accu, cur) => {
          // 类型转换 从输入框中取到的是字符串数字
          return accu * 1 + cur * 1
        })
        valid_data.push({
          valid: percent_total <= 100,
          msg: '请确认随机数之和不超过100%'
        })
      }
      // 然后所有随机数的加和
      this.$valid(valid_data)
        .then(
          () => {
            this.$store.dispatch('stratery/strateDataUploadRule', form_data)
          }
        )
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">




.page_strate_data_rule_new {

  .page_update_submit_info{
    margin: 10px auto 10px;
  }
  .checkbox_config {
    margin: 20px auto 30px;
  }

  .legend_layout {
    padding: 30px;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    position: relative;
    margin: 30px 0 40px;

    .legend_title {
      position: absolute;
      background: #fff;
      color: #222;
      font-size: 16px;
      font-weight: bold;
      top: -14px;
      left: 20px;

      padding: 4px 10px;
    }

    .checkbox_item {
      margin-top: 10px;
    }
  }

  .page_body {
    position: relative;
  }
  .cell {
    padding: 0px 2px;
  }

  .tag_parnode {
    // text-align: left;
    padding: 4px;
  }
  .col_1, .col_2, .col_3 {
    height: 35px;
    line-height: 35px;
  }
  .col_1 {
    // font-size: 16px;
    // font-weight: bold;
    text-align: left;
  }
  .col_2 {
    text-align: center;
    font-size: 15px;
  }
  .col_3 {
    text-align: right;
  }
  .l_h_30 {
    line-height: 30px;
  }

  .legend_selector_span {
    line-height: 30px;
    padding: 0 4px;
  }

  .legend_selector_item {
    display: inline-block;
    width: 26%;

  }

  .m_g_10 {
    margin: 16px 0px;
  }
  .title_button_layout {
    .strate_module_title {
      line-height: 34px;
      font-size: 16px;
      font-weight: bold;
    }
    .t_a_r {
      text-align: right;
    }
  }
  .delete_percent_btn {
    margin-left: 10px;
    margin-top: 1px;
  }


}


</style>
