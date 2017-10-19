<template lang="html">
  <div class="page_inner page_strates_details">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path:'/config/stratery'}">策略组列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_chg'}">更改策略组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_details'}">策略组详情</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="page_body">

      <div class="page_stratery_info">
        <el-row
          align="bottom"
        >
          <el-col :span="6">
            <div class="col_1">{{strates_details.strate_info.name}}</div>
          </el-col>

        </el-row>
      </div>

      <el-table
        :stripe="true"
        border
        :highlight-current-row="false"
        :data="strates_details.strate_list"
        style="width: 100%">
        <el-table-column
          prop="_order"
          width="50"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          width="140"
          align="center"
          label="策略名称">
        </el-table-column>
        <el-table-column
          label="启动探针"
          width="100"
          align="center"
          >
          <template scope="scope">
            <span>
              {{scope.row.is_start_client?'是':'否'}}
            </span>
          </template>
        </el-table-column>


        <el-table-column
          label="事件/时间/比率控制"
          width="250"
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
                    <div v-for="e_t_r in scope.row.risk_body">
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
          align="center"
          width="70">
          <template scope="scope">
            <span>
              {{scope.row.is_root?'是':'否'}}
            </span>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {

  },
  computed: {
    ...mapState('stratery', [
      'strates_details'
    ])
  },
  mounted () {
    this.$store.dispatch('stratery/stratesDetail', {
      id: this.$router.currentRoute.query.id
    })
  }
}
</script>

<style lang="scss">

.page_strates_details {

  .cell {
    padding: 0px 6px;
  }
  .page_stratery_info {
    margin: 10px auto 10px;
  }

  .tag_parnode {
    padding: 4px;
  }

  .col_1, .col_2, .col_3 {
    height: 35px;
    line-height: 35px;
  }
  .col_1 {
    font-size: 16px;
    font-weight: bold;
  }
  .col_2 {
    text-align: center;
    font-size: 15px;
  }
  .col_3 {
    text-align: right;
  }

}


</style>
