<template lang="html">
  <div class="page_inner page_strate_data">
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
              <el-input v-model="strate_data_info.name" placeholder="请输入数据上传玩偶名称"></el-input>
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
          <div class="legend_title">事件类型</div>
          <div class="legend_body">


            <el-row class="checkbox_all">
              <el-col :span="3">
                <el-checkbox @change="handleCheckAll()" v-model="strate_data_info.checkall" >
                  全部
                </el-checkbox>
              </el-col>
            </el-row>

            <el-row class="checkbox_item">
              <el-checkbox-group v-model="strate_data_info.event_checked" @change="handleCheckItem()">
                <el-col :span="3" :key="item" v-for="item in strate_data_info.event_all">
                  <el-checkbox :label="item">
                    <span :title="item">{{item}}</span>
                  </el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </div>
        </div>
      </div>

      <div class="title_table_layout">
        <div class="title_button_layout">
          <el-row>
            <el-col :span="5">
              <div class="strate_module_title">数据上传规则</div>
            </el-col>
            <el-col :span="4" :offset="15">
              <div class="t_a_r">
                <el-button size="small" type="primary" @click="data_rule_new">新建</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="table_box">
          <el-table
            :stripe="true"
            border
            :highlight-current-row="false"
            :data="strate_data_upload_raw.rulelist"
            style="width: 100%">
            <el-table-column
              width="70"
              align="center"
              label="选择"
              >
              <template scope="scope">

                <el-radio class="radio" v-model="strate_data_info.upload_rule_id" :label="scope.row.id">
                  {{""}}
                </el-radio>

              </template>
            </el-table-column>

            <el-table-column
              label="序号"
              width="80"
              align="center"
              prop="_order"
            >
            </el-table-column>

            <el-table-column
              label="名称"
              width="200"
              align="center"
              prop="name">
            </el-table-column>

            <el-table-column
              label="时间/比率控制"
              width="250"
              align="center">

              <template scope="scope" v-if="false">

                <template v-if="scope.row.is_immediate">
                  <el-tag type="primary" style="color: #000;">立即上传</el-tag>
                </template>

                <template v-else>

                  <template v-if="scope.row.time.length == 1">

                    <el-tag type="primary" >
                      <span v-text="`${scope.row.time[0].start_time}~${scope.row.time[0].end_time}`" style="color: #000;"></span>
                      &nbsp;
                      <span v-text="`${scope.row.time[0].ratio.padStart(2, '0')}%`"></span>
                    </el-tag>

                    <span class="opacity_0">
                      <el-button type="text" icon="more"></el-button>
                    </span>
                  </template>
                  <template v-if="scope.row.time.length > 1">
                    <el-tag type="primary">
                      <span v-text="`${scope.row.time[0].start_time}~${scope.row.time[0].end_time}`" style="color: #000;">
                      </span>
                      &nbsp;
                      <span v-text="`${scope.row.time[0].ratio.padStart(2, '0')}%`">
                      </span>
                    </el-tag>
                    <el-popover placement="right" width="260" trigger="hover">
                      <div class="popover_r_t">
                        <el-tag type="primary" v-for="t_r in scope.row.time" :key="t_r">
                          <span v-text="`${t_r.start_time}~${t_r.end_time}`" style="color: #000;"></span>
                          &nbsp;
                          <span v-text="`${t_r.ratio.padStart(2, '0')}%`"></span>
                        </el-tag>
                      </div>
                      <el-button type="text" icon="more" slot="reference">
                      </el-button>
                    </el-popover>
                  </template>
                </template>
              </template>
            </el-table-column>



            <el-table-column
              label="上传失败存储在本地"
              align="center">
              <template scope="scope">
                <span>
                  {{`最近${scope.row.num}条, 不超过${scope.row.maxsize}MB`}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
              align="center">
              <template scope="scope">
                <i class="icon_edit iconfont icon-laji" @click="delete_strate_datarule(scope.row.id)"></i>
              </template>
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

  // 数组项左移动 右移动通过vuex 中操作， vuex 中获得服务器返回的数据之后 给数据增加 active 属性
  // 然后 ids 是基于这个数组进行 过滤, 过滤的结果返回给 后台

  data () {
    return {

      strate_data_info: {
        name: '',
        checkall: false,
        event_id: null,
        event_checked: [],
        event_all: [],
        upload_rule_id: null
      }

    }
  },

  methods: {

    new_strate_datarule () {
      const form_data = {
        name: this.strate_data_info.name,
        risk_types: this.strate_data_info.event_checked,
        event_id: this.strate_data_info.event_id,
        u_id: this.strate_data_info.upload_rule_id
      }
      this.$valid([
        {valid: this.strate_data_info.name.length > 3, msg: '请确认数据上传玩偶名称长度不少于4位'},
        {valid: this.strate_data_info.name.length < 17, msg: '请确认数据上传玩偶名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.strate_data_info.name), msg: '请确认数据上传玩偶名称不包含特殊字符'},
        {valid: this.strate_data_info.event_checked.length, msg: '请选择至少一种事件类型'},
        {valid: this.strate_data_info.upload_rule_id, msg: '请选择数据上传规则'}
      ])
        .then(
          () => {
            this.$store.dispatch('stratery/strateDataCreate', form_data)
          }
        )
    },

    delete_strate_datarule (id) {
      this.$confirm('请确认是否删除该条数据上传规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('stratery/strateDataUploadRuleDelete', {
          id: id
        })
      })
    },

    handleCheckAll () {
      this.strate_data_info.event_checked = this.strate_data_info.checkall ? this.strate_data_info.event_all : []
    },

    handleCheckItem () {
      this.strate_data_info.checkall = this.strate_data_info.event_all.length === this.strate_data_info.event_checked.length
    },
    data_rule_new () {
      this.$router.push({
        path: '/config/strate_datarule_new'
      })
    }

  },
  computed: {

    ...mapState('stratery', [
      'strate_data_upload_raw'
    ])

  },

  // 拿到数据之后放到本地来
  watch: {
    strate_data_upload_raw (val) {
      this.strate_data_info.event_all = val.eventlist
      this.strate_data_info.event_id = val.event_id
      this.strate_data_info.upload_rule_id = val.rulelist[0].id
    }
  },

  mounted () {
    this.$store.dispatch('stratery/strateDataRender')
  }
}
</script>

<style lang="scss">




.page_strate_data {

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

      .el-checkbox__label {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 80px;
        display: inline-block;
        transform: translateY(4px);
      }
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
}

.popover_r_t {
  .el-tag {
    margin-right: 10px;
  }
}


</style>
