<template lang="html">
  <div class="page_inner page_strates_new">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/config/stratery' }">策略组列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/config/strates_chg' }">更改策略组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/config/strates_new' }">新建策略组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">
      <div class="page_strates_info">
        <el-row
          align="bottom"
        >
          <el-col :span="8">
            <div class="col_1">
              <el-input v-model="strates_info.name" placeholder="请输入策略组名称"></el-input>

            </div>
          </el-col>
          <el-col :span="7" :offset="2">
            <div class="col_2">
              <div>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="col_3">
              <el-button type="primary" @click="strate_new">新建策略</el-button>
              <el-button type="success" @click="strates_save">保存</el-button>
            </div>
          </el-col>

        </el-row>
      </div>

      <div class="strates_pool">
        <el-table
          :stripe="true"
          border
          :highlight-current-row="false"
          :data="strates_pool_native"
          style="width: 100%">
          <el-table-column
            width="60"
            align="center"
            label="选择">
            <template scope="scope">
              <span>
                <el-checkbox v-model="scope.row.is_active"></el-checkbox>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            width="60"
            prop="_order"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            width="90"
            label="策略名称">
          </el-table-column>
          <el-table-column
            label="启动探针"
            align="center"
            width="80">
            <template scope="scope">
              <span>
                {{scope.row.is_start_client?'是':'否'}}
              </span>
            </template>
          </el-table-column>


          <el-table-column
            label="事件/时间/比率控制"
            width="230"
            align="center">
            <template scope="scope">


              <div>
                <span v-text="scope.row.risk_body[0].risk_name"></span>
                &nbsp;
                <template v-if="scope.row.risk_body[0].is_immediate">
                  <span class="tag_inner_w_144">
                    <el-tag type="primary">- -</el-tag>
                  </span>
                </template>
                <template v-else>
                  <el-tag type="primary">
                    <span v-text="`${scope.row.risk_body[0].time[0].start_time}~${scope.row.risk_body[0].time[0].end_time}`" style="color: #000;"></span>
                    &nbsp;
                    <span v-text="`${scope.row.risk_body[0].time[0].ratio.padStart(2, '0')}%`"></span>
                  </el-tag>

                  <el-popover placement="right" width="420" trigger="hover">

                    <div class="event_popover">
                      <div v-for="e_t_r in scope.row.risk_body" style="overflow: hidden;">
                        <!-- {{scope.row.risk_body}} -->
                        <div class="l_e_t_r">
                          <span v-text="e_t_r.risk_name"></span>
                        </div>
                        <div class="r_e_t_r">
                          <template v-if="e_t_r.is_immediate">
                            <el-tag type="primary">--</el-tag>
                          </template>
                          <template v-else>
                            <el-tag type="primary" v-for="t_r in e_t_r.time" :key="t_r">
                              <span v-text="`${t_r.start_time}~${t_r.end_time}`" style="color: #000;"></span>
                              &nbsp;
                              <span v-text="`${t_r.ratio.padStart(2, '0')}%`"></span>
                            </el-tag>
                          </template>
                        </div>
                      </div>
                    </div>

                    <el-button type="text" icon="more" slot="reference">
                    </el-button>

                  </el-popover>


                </template>
              </div>



            </template>
          </el-table-column>


          <el-table-column
            prop="manufacturer"
            label="品牌控制"
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
            prop="location"
            label="区域控制"
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
            label="ROOT"
            width="70"
            align="center">
            <template scope="scope">
              <span>
                {{scope.row.is_root?'是':'否'}}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="70"
            align="center">
            <template scope="scope">
              <span>
                <el-button-group>

                  <el-button size="mini" @click="arraw_up(Number(scope.row._order))" :disabled="scope.row == strates_pool_native[0]">
                    <i class='el-icon-arrow-up'></i>
                  </el-button>

                  <el-button size="mini" @click="arraw_down(Number(scope.row._order))" :disabled="scope.row == strates_pool_native[strates_pool_native.length - 1]">
                    <i class='el-icon-arrow-down'></i>
                  </el-button>

                </el-button-group>

              </span>
            </template>
          </el-table-column>

        </el-table>
      </div>


      <div class="strates_new_tip">
        <el-row>
          <el-col>
            <div>
              提示：策略依照列表排序顺序执行，如互斥只执行优先级高的
            </div>
          </el-col>
        </el-row>

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
      strates_info: {
        name: '',
        ids: []
      },
      strates_pool_native: []
    }
  },
  methods: {

    strate_new () {
      this.$router.push({
        path: '/config/strate_new'
      })
    },

    strates_save () {
      this.strates_info.ids = this.strates_pool_native.filter(e => e.is_active).map(e => e.id)
      //

      this.$valid([
        {valid: this.strates_info.name.length > 3, msg: '请确认策略组名称长度不少于4位'},
        {valid: this.strates_info.name.length < 17, msg: '请确认策略组名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.strates_info.name), msg: '请确认策略组名称不包含特殊字符'},
        {valid: this.strates_info.ids.length, msg: '请至少选择一组策略'}
      ])
        .then(() => {
          this.$store.dispatch('stratery/stratesCreate', this.strates_info)
        })
    },

    arraw_up (props) {
      // 结构赋值对数组进行顺序的调换是有问题的  所以这里的话 不能够 对数组进行解构赋值， 因为 DOM 监测 不到 VUE数据的变化 所以 这里通过 splice 进行这一问题的解决
      [this.strates_pool_native[props - 1], this.strates_pool_native[props - 2]] = [this.strates_pool_native[props - 2], this.strates_pool_native[props - 1]]
      this.strates_pool_native.map((e, i) => {
        e._order = String(i + 1).padStart(2, '0')
        return e
      })
      // 这一段代码是为了触发视图的响应
      this.strates_pool_native = [...this.strates_pool_native]
    },

    arraw_down (props) {
      [this.strates_pool_native[props - 1], this.strates_pool_native[props]] = [this.strates_pool_native[props], this.strates_pool_native[props - 1]]
      this.strates_pool_native = [...this.strates_pool_native].map((e, i) => {
        e._order = String(i + 1).padStart(2, '0')
        return e
      })
      this.strates_pool_native = [...this.strates_pool_native]
    }

  },
  computed: {
    ...mapState('stratery', [
      'strates_pool'
    ])
  },
  watch: {
    strates_pool (val) {
      this.strates_pool_native.push(...val)
    }
  },
  mounted () {
    this.$store.dispatch('stratery/stratesPool')
  }
}
</script>

<style lang="scss">




.page_strates_new {

  .page_strates_info{
    margin: 10px auto 10px;
  }
  .page_body {
    position: relative;
  }
  .cell {
    padding: 0px 2px;
  }
  .strates_pool {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .tag_parnode {
    text-align: left;
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

  .strates_new_tip {
    font-size: 14px;
    position: absolute;
    bottom: 20px;
    margin-top: 14px;
  }

}


</style>
