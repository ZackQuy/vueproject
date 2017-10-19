<template lang="html">
  <div class="page_inner page_events_create">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/config/events' }">自定义事件</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/config/events_create'}">新建自定义事件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">

      <!-- 头部标题 -->

      <div class="page_strates_info">
        <el-row
          align="bottom"
        >
          <el-col :span="8">
            <div class="col_1">
              <el-input v-model="eventinfo.name" placeholder="请输入自定义事件名称">
              </el-input>
            </div>
          </el-col>
          <el-col :span="7" :offset="9">
            <div class="col_3">
              <el-button type="success" @click="eventCreate">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </div>


      <!-- 事件等级定义 -->
      <div class="event_level_more">
        <el-row>
          <el-col :span="3">
            <div class="l_h_30">事件等级定义</div>
          </el-col>
          <el-col :span="2">
            <div class="l_h_30">
              <el-button type="primary" icon="plus" size="small" @click="addClass"></el-button>
            </div>
          </el-col>
        </el-row>
      </div>



      <div class="legend_layout" v-for="(risk_class, risk_index) in renderData">
        <div class="legend_title edit_box">
          <div class="edit_box_1">
            <el-input
              size="small"
              placeholder="请输入事件等级名称"
              v-model="risk_class.name"
            >
            </el-input>
          </div>

        <div class="edit_box_2" v-if="risk_index > 3">
          <el-button type="primary" icon="delete" size="small" @click="removeClass(risk_index)">
          </el-button>
        </div>

        </div>
        <div class="legend_body">
          <el-row  class="l_h_30">
            <el-col :span="1">
              <span class="font_small_title">仿真</span>
            </el-col>
            <template v-for="ri in risk_1">
              <!-- <el-col :span="3"> -->
                <el-checkbox v-model="risk_class.risk_types[ri]" @change="handleChange(risk_index, ri)">
                  {{event_reflect[ri]}}
                </el-checkbox>
              <!-- </el-col> -->
            </template>

          </el-row>
          <el-row  class="l_h_30">

            <el-col :span="1">
              <span class="font_small_title">卡通</span>
            </el-col>

            <template v-for="ri in risk_2">
              <!-- <el-col :span="3"> -->
                <el-checkbox v-model="risk_class.risk_types[ri]" @change="handleChange(risk_index, ri)">
                  {{event_reflect[ri]}}
                </el-checkbox>
              <!-- </el-col> -->
            </template>

          </el-row>

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
      eventinfo: {
        name: ''
      },
      risk_1: ['emulator', 'modify', 'javahook', 'soana', 'mockdev'],
      risk_2: ['attframe', 'chook', 'inject', 'scandex', 'root', 'cheatdns'],
      renderData: [
        {
          name: '高危信息',
          risk_level: 'high',
          risk_types: {
            'emulator': false,
            'modify': false,
            'javahook': false,
            'soana': false,
            'mockdev': false,

            'attframe': false,
            'chook': false,
            'inject': false,
            'scandex': false,
            'root': false,
            'cheatdns': false
          }
        },
        {
          name: '中危信息',
          risk_level: 'middle',
          risk_types: {
            'emulator': false,
            'modify': false,
            'javahook': false,
            'soana': false,
            'mockdev': false,

            'attframe': false,
            'chook': false,
            'inject': false,
            'scandex': false,
            'root': false,
            'cheatdns': false
          }
        },
        {
          name: '低危信息',
          risk_level: 'low',
          risk_types: {
            'emulator': false,
            'modify': false,
            'javahook': false,
            'soana': false,
            'mockdev': false,

            'attframe': false,
            'chook': false,
            'inject': false,
            'scandex': false,
            'root': false,
            'cheatdns': false
          }
        },
        {
          name: '其他信息',
          risk_types: {
            'emulator': false,
            'modify': false,
            'javahook': false,
            'soana': false,
            'mockdev': false,

            'attframe': false,
            'chook': false,
            'inject': false,
            'scandex': false,
            'root': false,
            'cheatdns': false
          }
        }
      ]
    }
  },
  methods: {

    eventCreate () {
      let eventClass = this.renderData.map(e => {
        let risk_types = []

        for (var ri in e.risk_types) {
          if (e.risk_types[ri]) {
            risk_types.push(ri)
          }
        }
        let event_item = {
          name: e.name,
          risk_level: e.risk_level,
          risk_types: risk_types
        }

        return event_item
      }).filter(e => {
        return e.risk_types.length
      })

      let eventInfo = {
        name: this.eventinfo.name,
        data: JSON.stringify(eventClass)
      }

      let valid_data = [
        {valid: this.eventinfo.name.length > 3, msg: '请确认自定义事件名称长度不少于4位'},
        {valid: this.eventinfo.name.length < 17, msg: '请确认自定义事件名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.eventinfo.name), msg: '请确认自定义事件名称不包含特殊字符'},
        {valid: eventClass.length, msg: '当前自定义事件未包含任何仿真或卡通'}
      ]
      // 验证空名称
      // let illness_item = this.renderData.find(e => {
      //   console.log(e)
      //   return !e.name
      // })
      // if (illness_item && !illness_item.name) {
      //   valid_data.splice(1, 0, {
      //     valid: '',
      //     msg: '请输入事件等级名称'
      //   })
      // }
      let illegal_null = this.renderData.find(e => {
        return !e.name
      })

      let illegal_short_length = this.renderData.find(e => {
        return e.name.length < 3
      })

      let illegal_long_length = this.renderData.find(e => {
        return e.name.length > 16
      })

      let illegal_symbol = this.renderData.find(e => {
        return !this.$rules.name_rule(e.name)
      })

      illegal_null && valid_data.splice(1, 0, {
        valid: '',
        msg: `请输入事件等级名称, 长度应不少于4位且不多于16位`
      })

      illegal_short_length && valid_data.splice(2, 0, {
        valid: '',
        msg: `当前设置的事件等级名称'${illegal_short_length.name}'长度少于4位`
      })

      illegal_long_length && valid_data.splice(3, 0, {
        valid: '',
        msg: `当前设置的事件等级名称'${illegal_long_length.name}'长度多于16位`
      })

      illegal_symbol && valid_data.splice(4, 0, {
        valid: '',
        msg: `当前设置的事件等级名称'${illegal_symbol.name}'包含特殊字符`
      })

      this.$valid(valid_data)
        .then(
          () => {
            this.$store.dispatch('events/EventCreate', eventInfo)
          }
        )
    },

    addClass () {
      this.renderData.push(
        {
          name: '',
          risk_types: {
            'emulator': false,
            'modify': false,
            'javahook': false,
            'soana': false,
            'mockdev': false,

            'attframe': false,
            'chook': false,
            'inject': false,
            'scandex': false,
            'root': false,
            'cheatdns': false
          }
        }
      )
    },
    removeClass (index) {
      this.renderData.splice(index, 1)
    },

    handleChange (index, ri) {
      this.renderData.forEach((e, i) => {
        if (i !== index) {
          e.risk_types[ri] = false
        }
      })
    }

  },
  computed: {
    ...mapState('events', [
      'event_reflect'
    ])
  },
  mounted () {
  }
}
</script>

<style lang="scss">

.page_events_create{

  .page_strates_info{
    margin: 10px auto 10px;
  }

  .event_level_more {

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
  .l_h_30 {
    line-height: 30px;
  }
  .font_small_title {
    font-size: 14px;
    color: #333;
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
      // font-size: 16px;
      // font-weight: bold;
      top: -20px;
      left: 20px;
      padding: 4px 4px;
    }
    .el-checkbox {
      min-width: 130px;
      width: 14%;
    }

  }

  .edit_box {
    .edit_box_1 {
      display: inline-block;
      width: 150px;

    }
    .edit_box_2 {
      display: inline-block;
      margin-left: 10px;
      width: 34px;
    }
  }

}
</style>
