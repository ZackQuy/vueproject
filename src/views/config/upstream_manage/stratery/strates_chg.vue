<template lang="html">
  <div class="page_inner page_strates_chg">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/config/stratery'}">策略组列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/config/strates_chg'}">更改策略组</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">
      <div class="page_strates_info">
        <el-row
          align="bottom"
        >


          <el-col :span="4">
            <div class="col_1">
              <!-- <el-button type="primary" @click="strate_import">导入</el-button> -->
              <el-button @click="strate_export">导出</el-button>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="col_2">
              <div class="note_info">
                <span>
                  <i class="iconfont icon-dengpao"></i>
                  <span class="">备注:</span>
                </span>
                <span class="note_info_right">仅未启用过的策略组和策略及细项才可以编辑和修改</span>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="col_3">
              <el-button type="primary" @click="strate_new">新建策略组</el-button>
              <el-button type="success" @click="strate_start">启动策略组</el-button>
            </div>
          </el-col>

        </el-row>
      </div>

      <div>

        <el-table
          :stripe="true"
          border
          :highlight-current-row="false"
          :data="results_groups"
          style="width: 100%">
          <el-table-column
            width="70"
            align="center"
            label="选择"
            >
            <template scope="scope">

              <el-radio class="radio" v-model="strates_id" :label="scope.row.id">
                {{""}}
              </el-radio>

            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="80"
            align="center"
          >
            <template scope="scope">
              <span v-if="scope.row.is_start == 0">未启用</span>
              <span v-if="scope.row.is_start == 1">启用中</span>
              <span v-if="scope.row.is_start == 2">启用过</span>
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
            width="160"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column
            label="内容"
            align="center">
            <template scope="scope">
              <span class="s_l_e" :title="scope.row.tactics_names.join(' / ')" v-text="scope.row.tactics_names.join(' / ')" v-if="scope.row.tactics_names"></span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center">
            <template scope="scope">

              <template v-if="scope.row.is_start == 0">
                <i
                  class="icon_edit iconfont icon-Sbi"
                  @click="strate_edit(scope.row.id)">
                </i>

                <i
                  class="icon_edit iconfont icon-chagang"
                  @click="strate_detail(scope.row.id)">
                </i>

                <i
                  class="icon_edit iconfont icon-laji"
                  @click="strate_delete(scope.row.id)">
                </i>


              </template>
              <template v-else>

                <i
                  class="icon_edit iconfont icon-chagang"
                  @click="strate_detail(scope.row.id)">
                </i>



              </template>


            </template>
          </el-table-column>


        </el-table>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { note, valid } from 'assets/js/tool'

export default {
  data () {
    return {
    }
  },
  methods: {

    // 新建策略组
    strate_new (props) {
      this.$router.push('/config/strates_new')
    },

    // 启动策略组
    strate_start (props) {
      // 参数在页面中进行管理
      this.$store.dispatch('stratery/stratesStart', {
        id: this.active_group
      })
    },

    // 编辑策略组
    strate_edit (props) {
      this.$router.push({
        path: 'strates_edit',
        query: {
          id: props
        }
      })
    },

    // 策略组详情
    strate_detail (props) {
      this.$router.push({
        path: 'strates_details',
        query: {
          id: props
        }
      })
    },

    // 策略组删除
    strate_delete (props) {
      this.$confirm('策略组被删除后无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('stratery/stratesDelete', {
          id: props
        })
      }).catch(() => {

      })
      //
    },

    strate_import () {
      // 导入功能
      note.$message({
        message: '功能暂未开通, 敬请期待',
        type: 'info'
      })
    },
    // 导出策略组
    strate_export (props) {
      window.open('/everisk/api/v3/ccb/tactics_group/export')
    }
  },
  computed: {
    ...mapState('stratery', [
      'results_groups',
      'active_group'
    ]),
    strates_id: {
      get () {
        return this.active_group
      },
      set (val) {
        this.$store.commit('stratery/STRATES_ACTIVE_ID', val)
      }
    }

  },
  mounted () {
    this.$store.dispatch('stratery/stratesList')
  }
}
</script>

<style lang="scss">




.page_strates_chg {

  .page_strates_info{
    margin: 10px auto 10px;
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

}


</style>
