<template lang="html">
  <div class="page_inner page_strate_device">
    <div class="page_head">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path:'/config/stratery'}">玩偶组列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_chg'}">更改玩偶组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strates_new'}">新建玩偶组</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_new'}">新建玩偶</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/config/strate_device'}">新建划定设备</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page_body">

      <!-- 名称与按钮布局 -->
      <div class="page_device_submit_info">
        <el-row
          align="bottom"
        >
          <el-col :span="8">
            <div class="col_1">
              <el-input v-model="device_info_status.name" placeholder="请输入划定设备名称"></el-input>

            </div>
          </el-col>

          <el-col :span="7" :offset="9">
            <div class="col_3">
              <el-button @click="device_new" type="success">保存</el-button>
            </div>
          </el-col>

        </el-row>
      </div>



      <div class="strate_content">

        <div class="legend_layout">
          <div class="legend_title">地域</div>
          <div class="legend_body">
            <el-row class="checkbox_all">
              <el-col :span="3">
                <el-checkbox @change="handleCheckAll('location')" v-model="device_check_all.location" >
                  全部
                </el-checkbox>
              </el-col>
            </el-row>

            <el-row class="checkbox_item">
              <el-checkbox-group v-model="device_info_status.location" @change="handleCheckItem('location')">
                <el-col :span="3" :key="item" v-for="item in device_render_data.location">
                  <el-checkbox :label="item.id">
                    {{item.location}}
                  </el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>






          </div>
        </div>

        <div class="legend_layout">
          <div class="legend_title">设备品牌</div>
          <div class="legend_body">

            <el-row class="checkbox_all">
              <el-col :span="3">
                <el-checkbox @change="handleCheckAll('manufacturer')" v-model="device_check_all.manufacturer" >
                  全部
                </el-checkbox>
              </el-col>
            </el-row>

            <el-row class="checkbox_item">
              <el-checkbox-group v-model="device_info_status.manufacturer" @change="handleCheckItem('manufacturer')">
                <el-col :span="3" :key="item" v-for="item in device_render_data.manufacturer">
                  <el-checkbox :label="item.id">
                    {{item.manufacturer}}
                  </el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>

          </div>
        </div>

        <div class="legend_layout">
          <div class="legend_title">系统</div>
          <div class="legend_body">

            <el-row class="checkbox_all">
              <el-col :span="3">
                <el-checkbox @change="handleCheckAll('os_version')" v-model="device_check_all.os_version" >
                  全部
                </el-checkbox>
              </el-col>
            </el-row>

            <el-row class="checkbox_item">
              <el-checkbox-group v-model="device_info_status.os_version" @change="handleCheckItem('os_version')">
                <el-col :span="3" :key="item" v-for="item in device_render_data.os_version">
                  <el-checkbox :label="item.id">
                    {{item.os_version}}
                  </el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>

          </div>
        </div>

        <div class="legend_layout">
          <div class="legend_title">APP版本</div>
          <div class="legend_body">

            <el-row class="checkbox_all">
              <el-col :span="3">
                <el-checkbox @change="handleCheckAll('app_version')" v-model="device_check_all.app_version" >
                  全部
                </el-checkbox>
              </el-col>
            </el-row>

            <el-row class="checkbox_item">
              <el-checkbox-group v-model="device_info_status.app_version" @change="handleCheckItem('app_version')">
                <el-col :span="3" :key="item" v-for="item in device_render_data.app_version">
                  <el-checkbox :label="item.id">
                    {{item.app_version}}
                  </el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>

          </div>
        </div>

        <div class="legend_layout">
          <div class="legend_title">ROOT</div>
          <div class="legend_body">



            <el-row class="radio_item">
              <el-col :span="3">
                <el-radio :label="1" v-model="device_info_status.is_root">是</el-radio>
              </el-col>
              <el-col :span="3">
                <el-radio :label="0" v-model="device_info_status.is_root">否</el-radio>
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

      // 页面渲染层
      device_render_data: {
        location: [],
        os_version: [],
        app_version: [],
        manufacturer: []
      },

      // 页面全选按钮的状态管理
      device_check_all: {
        location: false,
        os_version: false,
        app_version: false,
        manufacturer: false
      },

      // 页面分项选中情况
      device_info_status: {
        name: '',
        location: [],
        os_version: [],
        app_version: [],
        manufacturer: [],
        is_root: 1
      }
    }
  },

  methods: {

    device_new () {
      const device_info_submit = {
        name: this.device_info_status.name,
        l_ids: this.device_check_all.location ? [0] : this.device_info_status.location,
        o_ids: this.device_check_all.os_version ? [0] : this.device_info_status.os_version,
        a_ids: this.device_check_all.app_version ? [0] : this.device_info_status.app_version,
        m_ids: this.device_check_all.manufacturer ? [0] : this.device_info_status.manufacturer,
        is_root: this.device_info_status.is_root
      }

      this.$valid([
        {valid: this.device_info_status.name.length > 3, msg: '请确认划定设备名称长度不少于4位'},
        {valid: this.device_info_status.name.length < 17, msg: '请确认划定设备名称长度不超过16位'},
        {valid: this.$rules.name_rule(this.device_info_status.name), msg: '请确认划定设备名称不包含特殊字符'},
        {valid: this.device_info_status.location.length, msg: '请选择地域'},
        {valid: this.device_info_status.manufacturer.length, msg: '请选择设备品牌'},
        {valid: this.device_info_status.os_version.length, msg: '请选择系统'},
        {valid: this.device_info_status.app_version.length, msg: '请选择APP版本'}
      ])
        .then(() => {
          this.$store.dispatch('stratery/strateDeviceCreate', device_info_submit)
        })
    },

    handleCheckAll (props) {
      this.device_info_status[props] = this.device_check_all[props] ? this.device_render_all[props] : []
    },

    handleCheckItem (props) {
      this.device_check_all[props] = this.device_info_status[props].length === this.device_render_all[props].length
    }

  },
  computed: {

    ...mapState('stratery', [
      'strate_device_create'
    ]),

    // 全选的时候对应的数组列表
    device_render_all: function () {
      let device_render_all = {}
      for (var attr in this.device_render_data) {
        device_render_all[attr] = this.device_render_data[attr].map(e => e.id)
      }
      return device_render_all
    }

  },

  // 拿到数据之后放到本地来
  watch: {
    strate_device_create (val) {
      this.device_render_data = val
    }
  },

  mounted () {
    this.$store.dispatch('stratery/strateDeviceRender')
  }
}
</script>

<style lang="scss">




.page_strate_device {

  .page_device_submit_info{
    margin: 10px auto 10px;
  }
  .checkbox_config {
    margin: 20px auto 30px;
  }

  .legend_layout {
    padding: 20px 30px 14px;
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


    .radio_item {
      margin: 6px auto;
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
