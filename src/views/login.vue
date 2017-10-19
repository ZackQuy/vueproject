<template lang="html">
  <div class="page_login">

    <div class="login_earth" id="login_3d_scene">
    </div>

    <div class="login_msg_tip">

      <div class="msg_tip_box">
        <div class="login_tip">{{$t('客服电话')}}: 4008-881-881</div>
        <div class="login_tip">{{$t('客服邮箱')}}: Service@bangcle.com</div>
        <div class="login_tip">{{$t('技术支持')}}: Support@bangcle.com</div>
      </div>
      <!-- <div class="msg_tip_btn">
        <div class="msg_tip_btn_tip">
          呼叫QQ在线客服:
        </div>
        <div class="msg_tip_btn_fn" @click="query_online">
          在线咨询
        </div>
      </div> -->
    </div>

    <div class="login_form">
      <div class="login_form_row">
        <input
          class="login_input"
          v-model="login_info.email"
          :placeholder="$t('用户名')">
        </input>
      </div>

      <div class="login_form_row">
        <input
          class="login_input"
          v-model="login_info.password"
          type="password"
          :placeholder="$t('密码')">
        </input>
      </div>


      <div class="login_form_row" v-if="false">
        <div class="login_authcode_input">
          <input
            class="login_input login_input_1"
            v-model="login_info.authcode"
            :placeholder="$t('请输入验证码')">
          </input>
          <img class="login_auth_pic" src="~assets/images/login_star_light.jpg" width="128" height="32">
        </div>

        <div class="login_authcode_pic">
          <!-- zs -->
          <!-- <img src="" alt=""> -->
        </div>

      </div>

      <div class="login_form_row">
        <div class="login_button" @click="login">
          {{$t('登  录')}}
        </div>
      </div>

    </div>

    <div class="login_everisk">
      <div class="login_everisk_logo"></div>
      <div class="login_everisk_star"></div>
    </div>
  </div>
</template>


<script>

import { note, valid } from 'assets/js/tool'
// import { loginScene } from 'assets/js/3dscene'

export default {
  data () {
    return {
      login_info: {
        email: '',
        password: '',
        authcode: '****'
      }
    }
  },
  methods: {
    login () {
      this.$valid([
        {valid: this.login_info.email, msg: this.$t('请输入用户名')},
        {valid: this.login_info.password, msg: this.$t('请输入密码')},
        {valid: this.login_info.authcode, msg: this.$t('请输入验证码')}
      ])
        .then(
          () => {
            this.$store.dispatch('userconfig/UserLogin', this.login_info)
          }
        )
    },

    query_online () {
      note({
        message: this.$t('在线咨询功能暂未开通')
      })
    }
  },

  mounted () {
    window.localStorage.removeItem('__login__')
    // loginScene()
  }
}
</script>

<style lang="scss">

.page_login {

  height: calc(100vh - 50px);
  position: relative;
  background: #e8eff4;


  .login_msg_tip {
    position: absolute;
    z-index: 40;
    width: 260px;
    height: 140px;
    right: 66%;
    top: 40%;


    .msg_tip_box {
      height: 122px;
      background: #ffffff;
      border: 1px solid #aeb7c9;
      padding: 14px;
      box-sizing: border-box;
      .login_tip {
        height: 34px;
        font-size: 14px;
        line-height: 24px;
        color: #757575;
      }

    }


    .msg_tip_btn {
      margin-top: 8px;

      .msg_tip_btn_tip {
        width: 136px;
        float: left;
        background: #fff;
        height: 32px;
        box-sizing: border-box;
        border: 1px solid #aeb7c9;
        color: #757575;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
      }

      .msg_tip_btn_fn {
        background: #fff;
        float: right;
        width: 110px;
        height: 32px;
        box-sizing: border-box;
        font-size: 14px;
        background: linear-gradient(70deg, #3988ff, #00ddd9);
        color: #fff;
        line-height: 32px;
        text-align: center;
        cursor: pointer;

      }

    }




  }

  .login_form {
    position: absolute;
    left: 66%;
    top: 40%;
    height: 180px;
    z-index: 44;

    .login_form_row {
      margin-bottom: 16px;
    }

    .login_input {
      line-height: 32px;
      height: 32px;
      width: 266px;
      outline: none;
      font-size: 14px;
      text-indent: 10px;
      transition: .3s;
      box-sizing: border-box;
      border: 1px solid #aeb7c9;
      color: #757575;

      &:hover {
        border-color: #3988ff;
      }

      &.login_input_1 {
        width: 162px;
        float: left;
      }
    }


    .login_authcode_input {
      height: 32px;

      .login_auth_pic {
        height: 32px;
        float: right;
      }
    }



    .login_button {
      background: #fff;
      height: 32px;
      letter-spacing: 10px;
      box-sizing: border-box;
      font-size: 14px;
      background: linear-gradient(70deg, #3988ff, #00ddd9);
      color: #fff;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
    }



  }

  .login_earth {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 100%;
    // background: red url(~assets/images/login_earth.png);
    // background-size: 100% 100%;
    z-index: 4;
  }


  .login_everisk {
    position: absolute;
    top: 10%;
    width: 460px;
    height: 520px;
    left: calc(50% - 230px);




    .login_everisk_logo {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(~assets/images/login_everisk.png);
      background-size: 100% 100%;
      z-index: 3;
    }


    .login_everisk_star {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(~assets/images/login_star_light.jpg) bottom center;
      z-index: 2;
    }
  }


  @media (max-width: 1500px) {
    .login_everisk {
      width: 360px;
      height: 410px;
      left: calc(50% - 180px);
    }
  }
}




</style>
