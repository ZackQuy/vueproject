<template lang="html">
  <div class="page_inner page_strate_rule">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path:'/config/stratery'}">策略组列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_chg'}">更改策略组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_new'}">新建策略组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_new'}">新建策略</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_rule'}">新建策略更新规则</el-breadcrumb-item>
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
              <el-input v-model="update_info.name" placeholder="请输入策略更新规则名称"></el-input>

            </div>
          </el-col>

          <el-col :span="7" :offset="9">
            <div class="col_3">
              <el-button type="success" @click="update_new">保存</el-button>
            </div>
          </el-col>

        </el-row>
      </div>



      <div class="strate_content">

        <div class="legend_layout">
          <div class="legend_title">更新频率</div>
          <div class="legend_body">

            <el-row>
              <el-col :span="3" class="l_h_30">
                <el-radio v-model="update_info.rate" :label="24">1 天</el-radio>
              </el-col>
              <el-col :span="3" class="l_h_30">
                <el-radio v-model="update_info.rate" :label="24 * 7">1 周</el-radio>
              </el-col>
              <el-col :span="3" class="l_h_30">
                <el-radio v-model="update_info.rate" :label="24 * 14">2 周</el-radio>
              </el-col>
              <el-col :span="3" class="l_h_30">
                <el-radio v-model="update_info.rate" :label="24 * 30">1 月</el-radio>
              </el-col>
              <el-col :span="3" class="l_h_30">
                <el-radio v-model="update_info.rate" :label="24 * 90">3 月</el-radio>
              </el-col>
              <el-col :span="2" class="l_h_30">
                <el-radio v-model="update_info.rate" :label="0">
                  自定义
                </el-radio>
              </el-col>

              <el-col :span="3">

                <el-input

                  v-model="update_info.diy.num"
                  size="small"
                  :disabled="!!update_info.rate"
                >
                  <el-select
                    v-model="update_info.diy.unit"
                    placeholder="请输入内容"
                    slot="append"
                    :disabled="!!update_info.rate"
                    :maxlength="2"
                    >
                    <el-option :value="1" label="时"></el-option>
                    <el-option :value="24" label="天"></el-option>
                    <el-option :value="24 * 7" label="周"></el-option>
                    <el-option :value="24 * 30" label="月"></el-option>
                  </el-select>
                </el-input>
              </el-col>
            </el-row>


          </div>
        </div>

        <div class="legend_layout">
          <div class="legend_title">更新失败处理</div>
          <div class="legend_body">
            <el-row>
              <el-col :span="9" class="l_h_30">
                <el-radio v-model="update_info.deal" :label="false">放 弃</el-radio>
              </el-col>
              <el-col :span="2" class="l_h_30">
                <el-radio v-model="update_info.deal" :label="true">尝 试</el-radio>
              </el-col>

              <!-- <el-col :span="1">
                <el-input v-model="update_info.deal_rule.times" size="small" :disabled="!update_info.deal">
                </el-input>
              </el-col>

              <el-col :span="1" class="l_h_30">
                <span>
                  次
                </span>
              </el-col>

              <el-col :span="1">
                <el-input v-model="update_info.deal_rule.hours" size="small" :disabled="!update_info.deal">
                </el-input>
              </el-col> -->

              <!-- <el-col :span="1" class="l_h_30">
                <span>
                  小时
                </span>
              </el-col> -->


              <el-col :span="3">
                <el-input
                  v-model="update_info.deal_rule.times"
                  size="small"
                  :disabled="!update_info.deal"
                  :maxlength="2"
                >
                  <el-select
                    v-model="update_info.deal_rule.hours"
                    placeholder="请输入内容"
                    slot="append"
                    :disabled="!update_info.deal"
                    >
                    <el-option :value="1" label="次/时"></el-option>
                    <el-option :value="24" label="次/天"></el-option>
                    <el-option :value="24 * 7" label="次/周"></el-option>
                    <el-option :value="24 * 30" label="次/月"></el-option>
                  </el-select>
                </el-input>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  // 数组项左移动 右移动通过vuex 中操作， vuex 中获得服务器返回的数据之后 给数据增加 active 属性
  // 然后 ids 是基于这个数组进行 过滤, 过滤的结果返回给 后台

  data () {
    return {

      update_info: {
        name: '',
        rate: 24,
        diy: {
          num: 1,
          unit: 1
        },
        deal: false,
        deal_rule: {
          times: 1,
          hours: 1
        }

      }
    }
  },

  methods: {

    update_new () {
      let update_info_submit = {
        name: this.update_info.name,
        r_hours: this.update_info.rate ? this.update_info.rate : this.update_info.diy.num * this.update_info.diy.unit,
        // 更新频率为多少个小时
        is_try: this.update_info.deal ? 1 : 0,
        // 是否尝试
        try_count: this.update_info.deal_rule.times,
        // 尝试多少次
        hours: this.update_info.deal_rule.hours
        // 尝试多少个小时
      }

      let valid_data = [
        {valid: this.update_info.name.length > 3, msg: '请确认策略更新规则名称长度不少于4位'},
        {valid: this.update_info.name.length < 17, msg: '请确认策略更新规则名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.update_info.name), msg: '请确认策略更新规则名称不包含特殊字符'},
        {valid: this.$rules.num_rule(update_info_submit.r_hours), msg: '请确认更新频率自定义为正整数'}
      ]
      if (update_info_submit.is_try) {
        valid_data.push({
          valid: this.$rules.num_rule(update_info_submit.try_count),
          msg: '请确认更新失败处理次数为正整数'
        })
      }
      this.$valid(valid_data)
        .then(() => {
          this.$store.dispatch('stratery/strateUpdateCreate', update_info_submit)
        })
    }

  },
  computed: {

    ...mapState('stratery', [
      'strate_device_create'
    ])

  },

  // 拿到数据之后放到本地来
  watch: {

  },

  mounted () {
    // this.$store.dispatch('stratery/strateDeviceRender')
  }
}
</script>

<style lang="scss">




.page_strate_rule {

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
  // 这是elementui 的bug
  .el-input-group__append {
    width: 56px;
  }


}


</style>
