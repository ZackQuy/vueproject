<template lang="html">
  <div class="page_inner page_strate_new">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path:'/config/stratery'}">策略组列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_chg'}">更改策略组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_new'}">新建策略组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_new'}">新建策略</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">

      <!-- 名称与按钮布局 -->
      <div class="page_strate_info">
        <el-row
          align="bottom"
        >
          <el-col :span="8">
            <div class="col_1">
              <el-input v-model="strate_info.name" placeholder="请输入策略名称"></el-input>

            </div>
          </el-col>

          <el-col :span="4" :offset="1" class="l_h_30">
            <el-checkbox
              v-model="strate_info.is_start_client"
              :true-label="1"
              :false-label="0">启动探针
            </el-checkbox>
          </el-col>

          <el-col :span="4" class="l_h_30">
            <el-checkbox
              v-model="strate_info.is_ask_server"
              :true-label="1"
              :false-label="0">上传数据前询问服务器
            </el-checkbox>
          </el-col>

          <el-col :span="7">
            <div class="col_3">
              <el-button type="success" @click="strate_new">生成策略</el-button>
            </div>
          </el-col>

        </el-row>
      </div>




      <!-- 名称与按钮布局 -->
      <div class="strate_content">

        <div class="strate_device">
          <div class="title_button_layout">
            <el-row>
              <el-col :span="5">
                <div class="strate_module_title">1.划定设备</div>
              </el-col>
              <el-col :span="4" :offset="15">
                <div class="t_a_r">
                  <el-button size="small" @click="new_strate_device" type="primary">新建</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table_box">

            <el-table
              :stripe="true"
              border
              :highlight-current-row="false"
              :data="strate_device_list"
              style="width: 100%">
              <el-table-column
                width="60"
                align="center"
                label="选择"
                >
                <template scope="scope">

                  <el-radio v-model="strate_info.m_rule_id" :label="scope.row.id">
                    {{""}}
                  </el-radio>

                </template>
              </el-table-column>

              <el-table-column
                label="序号"
                width="60"
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
                prop="location"
                label="地域"
                align="center">
                <template scope="scope" v-if="scope.row.location">

                  <template v-if="scope.row.location.includes(',')">

                    <el-tag type="primary" v-text="scope.row.location.split(',')[0]"></el-tag>

                    <el-popover placement="left" width="160" trigger="hover">

                      <div class="basic_popover">
                        <template v-for="manu in scope.row.location.split(',')">
                          <el-tag type="primary" v-text="manu"></el-tag>
                        </template>
                      </div>

                      <el-button type="text" icon="more" slot="reference">
                      </el-button>

                    </el-popover>

                  </template>

                  <template v-else>

                    <el-tag type="primary" v-text="scope.row.location.split(',')[0]"></el-tag>

                    <span class="opacity_0">
                      <el-button type="text" icon="more"></el-button>
                    </span>

                  </template>

                </template>

              </el-table-column>


              <el-table-column
                prop="manufacturer"
                label="设备品牌"
                align="center">
                <template scope="scope" v-if="scope.row.manufacturer">



                  <template v-if="scope.row.manufacturer.includes(',')">


                    <el-tag type="primary" v-text="scope.row.manufacturer.split(',')[0]"></el-tag>

                    <el-popover placement="right" width="160" trigger="hover">

                      <div class="basic_popover">
                        <template v-for="manu in scope.row.manufacturer.split(',')">
                          <el-tag type="primary" v-text="manu"></el-tag>
                        </template>
                      </div>

                      <el-button type="text" icon="more" slot="reference">
                      </el-button>

                    </el-popover>

                  </template>


                  <template v-else>


                    <el-tag type="primary" v-text="scope.row.manufacturer.split(',')[0]"></el-tag>


                    <span class="opacity_0">
                      <el-button type="text" icon="more"></el-button>
                    </span>


                  </template>
                </template>
              </el-table-column>
              <el-table-column
                label="系统"
                align="center"
                >
                <template scope="scope" v-if="scope.row.os_version">
                  <template v-if="scope.row.os_version.includes(',')">
                    <el-tag type="primary" v-text="scope.row.os_version.split(',')[0]"></el-tag>

                    <el-popover placement="right" width="160" trigger="hover">

                      <div class="basic_popover">
                        <template v-for="manu in scope.row.os_version.split(',')">
                          <el-tag type="primary" v-text="manu"></el-tag>
                        </template>
                      </div>

                      <el-button type="text" icon="more" slot="reference">
                      </el-button>

                    </el-popover>

                  </template>


                  <template v-else>


                    <el-tag type="primary" v-text="scope.row.os_version.split(',')[0]"></el-tag>


                    <span class="opacity_0">
                      <el-button type="text" icon="more"></el-button>
                    </span>


                  </template>



                </template>
              </el-table-column>

              <el-table-column
                label="APP版本"
                align="center"
                >
                <template scope="scope" v-if="scope.row.app_version">

                  <template v-if="scope.row.app_version.includes(',')">

                    <el-tag type="primary" v-text="scope.row.app_version.split(',')[0]"></el-tag>

                    <el-popover placement="right" width="160" trigger="hover">

                      <div class="basic_popover">
                        <template v-for="manu in scope.row.app_version.split(',')">
                          <el-tag type="primary" v-text="manu"></el-tag>
                        </template>
                      </div>

                      <el-button type="text" icon="more" slot="reference">
                      </el-button>

                    </el-popover>

                  </template>

                  <template v-else>

                    <el-tag type="primary" v-text="scope.row.app_version.split(',')[0]"></el-tag>

                    <span class="opacity_0">
                      <el-button type="text" icon="more"></el-button>
                    </span>

                  </template>

                </template>
              </el-table-column>

              <el-table-column
                label="ROOT"
                align="center">
                <template scope="scope">
                  <span>
                    {{scope.row.is_root?'是':'否'}}
                  </span>
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                width="100"
                align="center">
                <template scope="scope">
                  <i class="icon_edit iconfont icon-laji" @click="strate_device_del(scope.row.id)"></i>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>

        <div class="strate_newrule">
          <div class="title_button_layout">
            <el-row>
              <el-col :span="5">
                <div class="strate_module_title">2.策略更新规则</div>
              </el-col>
              <el-col :span="4" :offset="15">
                <div class="t_a_r">
                  <el-button size="small" @click="new_strate_rule" type="primary">新建</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table_box">
            <el-table
              :stripe="true"
              border
              :highlight-current-row="false"
              :data="strate_rule_list"
              style="width: 100%">
              <el-table-column
                width="60"
                align="center"
                label="选择"
                >
                <template scope="scope">

                  <el-radio v-model="strate_info.t_rule_id" :label="scope.row.id">
                    {{""}}
                  </el-radio>

                </template>
              </el-table-column>

              <el-table-column
                label="序号"
                width="60"
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
                label="更新频率"
                align="center">
                <template scope="scope">
                  <span v-if="!(scope.row.r_hours % (30 * 24))">
                    {{`${scope.row.r_hours / 30 / 24} 月`}}
                  </span>
                  <span v-else-if="!(scope.row.r_hours % (7 * 24))">
                    {{`${scope.row.r_hours / 7 / 24} 周`}}
                  </span>
                  <span v-else-if="!(scope.row.r_hours % 24)">
                    {{`${scope.row.r_hours / 24} 天`}}
                  </span>
                  <span v-else>
                    {{`${scope.row.r_hours} 时`}}
                  </span>

                </template>
              </el-table-column>

              <el-table-column
                label="更新失败处理"
                align="center">
                <template scope="scope">
                  <span v-if="scope.row.is_try">
                    {{`尝试${scope.row.try_count}次/${scope.row.hours}小时`}}
                  </span>
                  <span v-else>
                    放弃
                  </span>
                </template>
              </el-table-column>



              <el-table-column
                label="操作"
                width="100"
                align="center">
                <template scope="scope">

                  <i
                    class="icon_edit iconfont icon-laji"
                    @click="strate_rule_del(scope.row.id)"
                  ></i>
                </template>
              </el-table-column>


            </el-table>



          </div>
        </div>

        <div class="strate_datarule">
          <div class="title_button_layout">
            <el-row>
              <el-col :span="5">
                <div class="strate_module_title">3.数据上传策略</div>
              </el-col>
              <el-col :span="4" :offset="15">
                <div class="t_a_r">
                  <el-button size="small" @click="new_strate_data" type="primary">新建</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table_box">
            <el-table
              :stripe="true"
              border
              :highlight-current-row="false"
              :data="strate_datarule_list"
              style="width: 100%">
              <el-table-column
                width="60"
                align="center"
                label="选择"
                >
                <template scope="scope">
                  <el-checkbox v-model="scope.row.status" :true-label="1" :false-label="0">
                    <!-- {{""}} -->
                  </el-checkbox>

                </template>
              </el-table-column>

              <el-table-column
                label="序号"
                width="60"
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
                label="事件类型"
                align="center"
                width="200">
                <template scope="scope">

                  <div v-text="scope.row.names.join('/')"></div>
                </template>
              </el-table-column>

              <el-table-column
                label="数据上传规则"
                align="center">
                <template scope="scope">
                  <span v-if="scope.row.is_immediate">
                    {{`${scope.row.name} (立即/最近${scope.row.num}条/不超过${scope.row.maxsize}MB)`}}
                  </span>
                  <span v-else>
                    {{`${scope.row.name} (定时/最近${scope.row.num}条/不超过${scope.row.maxsize}MB)`}}
                  </span>
                </template>
              </el-table-column>



              <el-table-column
                label="操作"
                width="100"
                align="center">
                <template scope="scope">
                  <i
                    class="icon_edit iconfont icon-laji" @click="strate_data_del(scope.row.id)"></i>
                </template>
              </el-table-column>


            </el-table>
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
      strate_info: {
        is_start_client: 0,
        is_ask_server: 0,
        m_rule_id: 0,
        t_rule_id: 0,
        u_rule_ids: [],
        name: ''
      }
    }
  },
  methods: {

    strate_new () {
      this.strate_info.u_rule_ids = this.strate_datarule_list.filter(e => e.status === 1).map(e => e.id)

      this.$valid([
        {valid: this.strate_info.name.length > 3, msg: '请确认策略名称长度不少于4位'},
        {valid: this.strate_info.name.length < 17, msg: '请确认策略名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.strate_info.name), msg: '请确认策略名称不包含特殊字符'},
        {valid: this.strate_info.u_rule_ids.length, msg: '请至少选择一组数据上传策略'}
      ])
        .then(() => {
          this.$store.dispatch('stratery/strateCreate', this.strate_info)
        })
    },

    new_strate_device () {
      this.$router.push({
        path: '/config/strate_device'
      })
    },

    new_strate_rule () {
      this.$router.push({
        path: '/config/strate_rule'
      })
    },

    new_strate_data () {
      this.$router.push({
        path: '/config/strate_data'
      })
    },

    strate_device_del (id) {
      this.$confirm('请确认是否删除该条划定设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('stratery/strateDeviceDelele', {
          id: id
        })
      })
    },

    strate_rule_del (id) {
      this.$confirm('请确认是否删除该条策略更新规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('stratery/strateUpdateDelele', {
          id: id
        })
      })
    },

    strate_data_del (id) {
      this.$confirm('请确认是否删除该条数据上传策略?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('stratery/strateDataDelele', {
          id: id
        })
      })
    }

  },
  computed: {
    ...mapState('stratery', [
      'strate_device_list',
      'strate_rule_list',
      'strate_datarule_list'
    ])
  },
  watch: {
    strate_device_list (val) {
      if (val[0]) {
        this.strate_info.m_rule_id = val[0].id
      }
    },
    strate_rule_list (val) {
      if (val[0]) {
        this.strate_info.t_rule_id = val[0].id
      }
    }

  },
  created () {
    this.$store.dispatch('stratery/strateDeviceList')
    this.$store.dispatch('stratery/strateRuleList')
    this.$store.dispatch('stratery/strateDataruleList')
  }
}
</script>

<style lang="scss">




.page_strate_new {

  .page_strate_info{
    margin: 10px auto 10px;
  }
  .checkbox_config {
    margin: 20px auto 30px;
  }

  .table_box {
    margin-bottom: 40px;
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

  .strate_content {
    margin-top: 30px;
  }


  .l_h_30 {
    line-height: 30px;
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


</style>
