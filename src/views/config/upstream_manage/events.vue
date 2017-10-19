<template lang="html">
  <div class="page_inner page_events">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/config/events' }">自定义事件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">

      <div class="page_strates_info">

        <el-col :span="14" :offset="5">
          <div class="col_2">
            <div class="note_info">
              <span>
                <i class="iconfont icon-dengpao"></i>
                <span class="">备注:</span>
              </span>
              <span class="note_info_right">仅从未启用过的自定义事件才可以删除</span>
            </div>
          </div>
        </el-col>

        <el-row
          align="bottom"
        >

          <el-col :span="5">
            <div class="col_3">
              <el-button type="primary" @click="eventCreate">新建</el-button>
              <el-button type="success" @click="eventStart">启用</el-button>
            </div>
          </el-col>

        </el-row>
      </div>


      <el-table
        border
        :stripe="true"
        :highlight-current-row="false"
        :data="events_list"
        style="width: 100%">
        <el-table-column
          width="60"
          label="选择"
          align="center"
          >
          <template scope="scope">

            <el-radio class="radio" v-model="event_id" :label="scope.row.id">
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
            <span v-if="scope.row.event_status == 0">未启用</span>
            <span v-if="scope.row.event_status == 1">启用中</span>
            <span v-if="scope.row.event_status == 2">启用过</span>
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
          label="自定义事件名称"
          width="200"
          align="center"
          prop="name">
        </el-table-column>
        <el-table-column
          label="具体内容"
          align="center">
          <template scope="scope">
            <div class="cont_details">

              <div class="cont_det" v-for="cont in scope.row.content">

                <div class="cont_det_c1 s_l_e" v-text="cont.name + ':'" :title="cont.name"></div>
                <div class="cont_det_c2">
                  <el-tag v-for="co in cont.risk_types" v-text="event_reflect[co]" type="primary" :key="co"></el-tag>

                </div>
                <div class="cont_det_c3" v-if="cont.risk_types.length > 3">




                  <el-popover placement="left" width="200" trigger="hover">

                    <div class="basic_popover">
                      <template v-for="co in cont.risk_types" >
                        <el-tag type="primary" v-text="event_reflect[co]"></el-tag>
                      </template>
                    </div>

                    <el-button type="text" icon="more" slot="reference">
                    </el-button>

                  </el-popover>

                </div>
              </div>

            </div>


          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template scope="scope">

            <template v-if="scope.row.event_status == 0">

              <i
                class="icon_edit iconfont icon-laji"
                @click="eventDelete(scope.row.id)">
              </i>



            </template>
            <template v-else>
              <i class="icon_edit iconfont icon-laji cursor_na"></i>
            </template>


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
    return {
      event_id: 0
    }
  },
  methods: {
    eventCreate () {
      this.$router.push({
        path: '/config/events_create'
      })
    },

    eventStart () {
      let params = {
        id: this.event_id
      }
      this.$store.dispatch('events/EventsStart', params)
    },

    eventEdit () {
    },
    eventDelete (props) {
      this.$confirm('自定义事件被删除后无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('events/EventDelete', {
          id: props
        })
      }).catch(() => {
      })
    }
  },
  computed: {
    ...mapState('events', [
      'events_list',
      'event_reflect'
    ])
  },

  watch: {
    events_list (val) {
      if (val.length) {
        this.event_id = val[0].id
      }
    }
  },

  mounted () {
    this.$store.dispatch('events/EventsList')
  }
}
</script>

<style lang="scss">

.page_events{

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
  .l_h_30 {
    line-height: 30px;
  }

  .cont_details {
    box-sizing: border-box;
    padding: 6px 10px;

    .cont_det {
      line-height: 30px;
      height: 30px;
      width: 100%;
      position: relative;
      $col_1: 70px;
      $col_3: 40px;

      .cont_det_c1 {
        position: absolute;
        width: $col_1;
        text-align: right;
        left: 0px;
        top: 0px;
      }
      .cont_det_c2 {
        position: absolute;
        height: 30px;
        overflow: hidden;
        left: 80px;
        text-align: left;
        top: 0px;
        width: calc(100% - $col_1 - $col_3);
        .el-tag {
          margin-right: 20px;
          display: inline-block;
          min-width: 100px;
          text-align: center;
        }


      }
      .cont_det_c3 {
        position: absolute;
        width: $col_3;
        right: 0px;
        top: 0px;

      }

    }
  }

}
</style>
